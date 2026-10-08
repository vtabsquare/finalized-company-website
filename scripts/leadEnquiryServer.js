// Isolated lead API: loopback only. Customer data stays server-side.
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import dotenv from 'dotenv';
import fs from 'node:fs';
dotenv.config();
const host='127.0.0.1';
const port=Number(process.env.VTAB_LEAD_PORT || 4317);
const key=process.env.BREVO_API_KEY;
const sender=process.env.BREVO_SENDER_EMAIL || 'Contactsales@vtabsquare.com';
const recipient=process.env.LEAD_ENQUIRY_TO || 'Information@vtabsquare.com';
const allowedOrigins=new Set((process.env.LEAD_ALLOWED_ORIGINS || 'https://www.vtabsquare.com,https://vtabsquare.com').split(',').map(s=>s.trim()));
const hits=new Map();
const leadLogPath=process.env.VTAB_LEAD_EVENT_LOG || '/var/log/vtabsquare-lead-events.log';
// Keep this outside the public web root. Back it up securely and restrict permissions.
const recordsPath=process.env.VTAB_LEAD_RECORDS_PATH || '/var/lib/vtabsquare/leads.jsonl';
const text=(v,max)=>typeof v==='string'?v.trim().slice(0,max):'';
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function respond(res,status,obj){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(obj));}
function recordLeadEvent(interest){
 const safeInterest=text(interest,160).replace(/[\r\n|]/g,' ');
 try{fs.appendFileSync(leadLogPath,new Date().toISOString()+'|enquiry_received|'+safeInterest+'\n',{encoding:'utf8',mode:0o600});}
 catch{console.error('Lead event log write failed');}
}
function appendRecord(record){
 const dir=recordsPath.slice(0,recordsPath.lastIndexOf('/'));
 fs.mkdirSync(dir,{recursive:true,mode:0o700});
 const fd=fs.openSync(recordsPath,'a',0o600);
 try{fs.writeSync(fd,JSON.stringify(record)+'\n');fs.fsyncSync(fd);}finally{fs.closeSync(fd);}
}
async function sendEmail(payload){
 const result=await fetch('https://api.brevo.com/v3/smtp/email',{
  method:'POST',signal:AbortSignal.timeout(10000),
  headers:{'api-key':key,'Content-Type':'application/json'},
  body:JSON.stringify({sender:{email:sender,name:'VTAB Square'},...payload})
 });
 if(!result.ok) throw new Error('Brevo HTTP '+result.status);
}
const server=http.createServer(async(req,res)=>{
 if(req.url==='/health' && req.method==='GET') return respond(res,200,{ok:true});
 if(req.url!=='/api/enquiry' || req.method!=='POST') return respond(res,404,{error:'Not found'});
 if(!key) return respond(res,503,{error:'Enquiries temporarily unavailable'});
 const origin=req.headers.origin;
 if(!origin || !allowedOrigins.has(origin)) return respond(res,403,{error:'Origin not allowed'});
 if(!String(req.headers['content-type']||'').toLowerCase().startsWith('application/json')) return respond(res,415,{error:'JSON required'});
 const ip=req.socket.remoteAddress||'unknown';
 const now=Date.now(),recent=(hits.get(ip)||[]).filter(t=>now-t<3600000);
 if(recent.length>=5) return respond(res,429,{error:'Too many requests; please email our team'});
 recent.push(now);hits.set(ip,recent);
 if(hits.size>2000) for(const [k,v] of hits) if(v[v.length-1]<now-3600000) hits.delete(k);
 let raw='';
 try{
  for await(const chunk of req){raw+=chunk;if(raw.length>12000)return respond(res,413,{error:'Request too large'});}
  const body=JSON.parse(raw);
  if(text(body.website,100))return respond(res,200,{received:true});
  const name=text(body.fullName,120),email=text(body.workEmail,254),company=text(body.companyName,160),interest=text(body.interestArea,160),message=text(body.message,2500),date=text(body.preferredDate,20),team=text(body.teamSize,60),referralSource=text(body.referralSource,120).replace(/[\r\n|]/g,' ');
  if(!name||!company||!interest||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!message)return respond(res,400,{error:'Name, work email, company, interest and requirements are required'});
  const id='VTAB-'+new Date().toISOString().slice(0,10).replace(/-/g,'')+'-'+randomUUID().slice(0,8).toUpperCase();
  const fields=[['Reference',id],['Name',name],['Email',email],['Company',company],['Interest',interest],['Demo referral source',referralSource],['Team size',team],['Preferred date',date],['Requirements',message]];
  const html='<h2>VTAB Square website enquiry</h2>'+fields.map(([k,v])=>'<p><strong>'+escapeHtml(k)+':</strong> '+escapeHtml(v).replace(/\n/g,'<br>')+'</p>').join('');
  // Persist before sending so delivery errors cannot silently lose the enquiry.
  appendRecord({event:'created',id,createdAt:new Date().toISOString(),status:'New',acknowledgement:'pending',salesNotification:'pending',name,email,company,interest,message,date,team,referralSource,followUpAt:new Date(Date.now()+24*3600000).toISOString()});
  try{
   await sendEmail({to:[{email:recipient}],replyTo:{email,name},subject:'['+id+'] VTAB Square website enquiry: '+interest.replace(/[\r\n]/g,' '),htmlContent:html});
   appendRecord({event:'sales_notified',id,at:new Date().toISOString(),salesNotification:'sent'});
  }catch(e){
   console.error('Sales notification failed:',id,e.message);
   try{appendRecord({event:'sales_notification_failed',id,at:new Date().toISOString(),salesNotification:'failed'});}catch{console.error('Lead state update failed');}
   return respond(res,502,{error:'Unable to deliver enquiry; please email our team',reference:id});
  }
  // Customer acknowledgement is separate: a failure must not trigger duplicate sales submissions.
  let acknowledged=false;
  try{
   const ackHtml='<p>Hello '+escapeHtml(name)+',</p><p>Thank you for contacting VTAB Square. We have received your enquiry about <strong>'+escapeHtml(interest)+'</strong>. Our team will review it and contact you.</p><p>Your enquiry reference is <strong>'+escapeHtml(id)+'</strong>.</p><p>Regards,<br>VTAB Square Sales Team</p>';
   await sendEmail({to:[{email,name}],replyTo:{email:recipient,name:'VTAB Square Sales'},subject:'We received your VTAB Square enquiry ['+id+']',htmlContent:ackHtml});
   acknowledged=true;
   appendRecord({event:'acknowledgement_sent',id,at:new Date().toISOString(),acknowledgement:'sent'});
  }catch(e){
   console.error('Customer acknowledgement failed:',id,e.message);
   try{appendRecord({event:'acknowledgement_failed',id,at:new Date().toISOString(),acknowledgement:'failed'});}catch{console.error('Lead state update failed');}
  }
  recordLeadEvent(interest);
  console.log('Enquiry accepted:',id);
  return respond(res,200,{received:true,reference:id,acknowledgementSent:acknowledged});
 }catch(e){
  console.error('Enquiry processing failed:',e instanceof SyntaxError?'invalid JSON':'request or storage error');
  return respond(res,e instanceof SyntaxError?400:503,{error:'Unable to process enquiry; please email our team'});
 }
});
server.listen(port,host,()=>console.log('VTAB lead API listening on loopback port',port));
