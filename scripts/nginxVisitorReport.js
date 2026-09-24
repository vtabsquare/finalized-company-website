import fs from 'fs';
import zlib from 'node:zlib';

const logPath = process.env.VTAB_NGINX_LOG || '/var/log/nginx/vtabsquare-website.access.log';
const days = Math.max(1, Number(process.env.REPORT_DAYS || 1));
const BOT = /(bot|crawler|spider|slurp|GPTBot|Googlebot|bingbot|Applebot|Bytespider|Bravebot|Amazonbot|facebookexternalhit|Meta-ExternalAgent|ClaudeBot|Claude-Web|PerplexityBot|DeepSeekBot|Kimi|Baiduspider|Yandex|curl|wget|python|Go-http-client|HeadlessChrome|jscrawler|Hunyuan)/i;
const SCAN = /(^|\/)(\.env|wp-admin|wp-login|wp-json|phpinfo|test|txets|server-status|secrets?|config|manifest|\.git|vendor\/phpunit|graphql|v1\/graphql|signup|sign-?in|login|dashboard|register|user\/login|users\/login|auth(?:\/login)?|secure|app|forgot-password|reset-password|admin|console|backoffice|panel|portal|account|settings|pricing|checkout)(?:[\/.?]|$)/i;
const ASSET = /\.(?:js|css|png|jpe?g|gif|svg|ico|webp|avif|mp4|webm|mov|mp3|wav|woff2?|map|xml|txt|json)(?:$|\?)/i;
// REPORT_PREVIOUS_DAY=1 selects the previous complete Asia/Kolkata calendar day.
const previousDay = process.env.REPORT_PREVIOUS_DAY === '1';
const todayIST = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Kolkata', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
const part = name => Number(todayIST.find(p => p.type === name).value);
const todayStartUTC = Date.UTC(part('year'), part('month')-1, part('day')) - 330 * 60000;
const windowStart = previousDay ? todayStartUTC - 86400000 : Date.now() - days * 86400000;
const windowEnd = previousDay ? todayStartUTC : Date.now();
// Logrotate moves yesterday's UTC entries to .1 at midnight. Include bounded
// rotation files so the previous complete IST day (18:30–18:30 UTC) is covered.
const logFiles = [logPath, ...Array.from({length:Math.max(1,Math.ceil(days)+1)},(_,i)=>logPath+'.'+(i+1)).flatMap(p=>[p,p+'.gz'])].filter(p=>fs.existsSync(p));
if (!logFiles.length) throw new Error('VTAB dedicated Nginx access log not found: '+logPath);
const rows = logFiles.flatMap(p=>{
  const data=fs.readFileSync(p);
  return (p.endsWith('.gz')?zlib.gunzipSync(data).toString('utf8'):data.toString('utf8')).split('\n').filter(Boolean);
});
const counts = new Map(), refs = new Map(), bots = new Map(), conversions = new Map();
let humanRequests=0, botRequests=0, scannerRequests=0, contact=0, service=0;
const inc=(m,k)=>m.set(k,(m.get(k)||0)+1);
// Nginx timestamps use DD/Mon/YYYY:HH:mm:ss ±HHMM, which Date.parse does not reliably accept.
const MONTHS = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
function nginxTimestamp(value) {
  const m = value.match(/^(\d{2})\/([A-Za-z]{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+-])(\d{2})(\d{2})$/);
  if (!m || MONTHS[m[2]] === undefined) return NaN;
  const offsetMinutes = (Number(m[8])*60+Number(m[9]))*(m[7] === '+' ? 1 : -1);
  return Date.UTC(Number(m[3]),MONTHS[m[2]],Number(m[1]),Number(m[4]),Number(m[5]),Number(m[6]))-offsetMinutes*60000;
}
for (const line of rows) {
  const m=line.match(/^\S+ \S+ \S+ \[([^\]]+)\] "([^"]*)" (\d{3}) \S+ "([^"]*)" "([^"]*)"/);
  if(!m) continue;
  const dt=nginxTimestamp(m[1]); if(!Number.isFinite(dt) || dt<windowStart || dt>=windowEnd) continue;
  const req=m[2].split(' '), raw=req[1]||'/'; const p=raw.split('?')[0]; const ref=m[4], ua=m[5];
  if (p.startsWith('/__vt_event/')) {
    // Only count known browser GET actions returning HTTP 200; ignore curl/manual probes.
    const event = p.slice('/__vt_event/'.length);
    const status = Number(m[3]);
    if (req[0] === 'GET' && status === 200 && !BOT.test(ua) &&
        /^(demo_open|product_view|email_click|linkedin_click|contact_click|service_email_click)$/.test(event)) inc(conversions,event);
    continue;
  }
  if(BOT.test(ua)){botRequests++; inc(bots,(ua.match(/(Googlebot|bingbot|LinkedInBot|GPTBot|Applebot|Bytespider|Bravebot|Amazonbot|DeepSeekBot|Kimi|Baiduspider|ClaudeBot|PerplexityBot)/i)||['Other bot'])[0]); continue;}
  let decoded = p;
  try { decoded = decodeURIComponent(p); } catch {}
  if (SCAN.test(p) || SCAN.test(decoded) || SCAN.test(ref) || /(?:\.\.|%2e|%2f|proc\/self\/environ|wp-includes|wp-content|\.php(?:$|\/)|(?:^|\/)dump\.sql$|(?:^|\/)backup\.sql$|(?:^|\/)db\.sql$|(?:^|\/)database\.sql$)/i.test(p)) {
    scannerRequests++;
    continue;
  }
  if(ASSET.test(p)||p.startsWith('/api/') ||
    /(?:^|\/)(?:\.DS_Store|\.aws|\.dev.vars|\.pypirc|rclone\.conf|_image|__vite_rsc_findSourceMapURL)(?:$|\/)/i.test(p)) {
    if (!ASSET.test(p) && !p.startsWith('/api/')) scannerRequests++;
    continue;
  }
  humanRequests++; inc(counts,p);
  if(ref && ref!=='-' && !ref.includes('vtabsquare.com')) { try { inc(refs,new URL(ref).hostname); } catch {} }
  if(/^\/contact\/?$/i.test(p)) contact++;
  if(/power-bi|databricks|ai-application|architecture|case-stud/i.test(p)) service++;
}
const top=m=>[...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,20);
const conversionTotal=[...conversions.values()].reduce((a,b)=>a+b,0);
const conversionRate=humanRequests ? Number(((conversionTotal/humanRequests)*100).toFixed(1)) : 0;
console.log(JSON.stringify({period_days:previousDay ? 1 : days,report_window:previousDay ? 'previous_complete_day_IST' : 'rolling',likely_human_page_requests:humanRequests,bot_requests:botRequests,scanner_requests:scannerRequests,contact_page_requests:contact,service_interest_requests:service,conversion_actions:conversionTotal,conversion_rate_per_100_page_requests:conversionRate,conversions:top(conversions),top_pages:top(counts),external_referrers:top(refs),top_bots:top(bots),next_action: conversionTotal===0 ? 'Improve CTA visibility and service-page contact prompts' : 'Review which CTA and service pages generate conversions'},null,2));
