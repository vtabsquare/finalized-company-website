import fs from 'fs';

const logPath = process.env.VTAB_NGINX_LOG || '/var/log/nginx/vtabsquare-website.access.log';
const days = Math.max(1, Number(process.env.REPORT_DAYS || 1));
const BOT = /(bot|crawler|spider|slurp|GPTBot|Googlebot|bingbot|Applebot|Bytespider|Bravebot|Amazonbot|facebookexternalhit|Meta-ExternalAgent|ClaudeBot|Claude-Web|PerplexityBot|DeepSeekBot|Kimi|Baiduspider|Yandex|curl|wget|python|Go-http-client|HeadlessChrome|jscrawler|Hunyuan)/i;
const SCAN = /(^|\/)(\.env|wp-admin|wp-login|wp-json|phpinfo|test|txets|server-status|secrets?|config|manifest|\.git|vendor\/phpunit|graphql|v1\/graphql|signup|sign-?in|login|dashboard|register|user\/login|users\/login|auth(?:\/login)?|secure|app|forgot-password|reset-password|admin|console|backoffice|panel|portal|account)(?:[\/.?]|$)/i;
const ASSET = /\.(?:js|css|png|jpe?g|gif|svg|ico|webp|avif|mp4|webm|mov|mp3|wav|woff2?|map|xml|txt|json)(?:$|\?)/i;
const cutoff = Date.now() - days * 86400000;
const rows = fs.readFileSync(logPath,'utf8').split('\n').filter(Boolean);
const counts = new Map(), refs = new Map(), bots = new Map();
let humanRequests=0, botRequests=0, scannerRequests=0, contact=0, service=0;
const inc=(m,k)=>m.set(k,(m.get(k)||0)+1);
for (const line of rows) {
  const m=line.match(/^\S+ \S+ \S+ \[([^\]]+)\] "([^"]*)" \d+ \S+ "([^"]*)" "([^"]*)"/);
  if(!m) continue;
  const dt=Date.parse(m[1].replace(/:(\d\d):/, ' $1:')); if(Number.isFinite(dt)&&dt<cutoff) continue;
  const req=m[2].split(' '), raw=req[1]||'/'; const p=raw.split('?')[0]; const ref=m[3], ua=m[4];
  if(BOT.test(ua)){botRequests++; inc(bots,(ua.match(/(Googlebot|bingbot|LinkedInBot|GPTBot|Applebot|Bytespider|Bravebot|Amazonbot|DeepSeekBot|Kimi|Baiduspider|ClaudeBot|PerplexityBot)/i)||['Other bot'])[0]); continue;}
  let decoded = p;
  try { decoded = decodeURIComponent(p); } catch {}
  if (SCAN.test(p) || SCAN.test(decoded) || SCAN.test(ref) || /(?:\.\.|%2e|%2f|proc\/self\/environ)/i.test(p)) {
    scannerRequests++;
    continue;
  }
  if(ASSET.test(p)||p.startsWith('/api/')) continue;
  humanRequests++; inc(counts,p);
  if(ref && ref!=='-' && !ref.includes('vtabsquare.com')) { try { inc(refs,new URL(ref).hostname); } catch {} }
  if(/^\/contact\/?$/i.test(p)) contact++;
  if(/power-bi|databricks|ai-application|architecture|case-stud/i.test(p)) service++;
}
const top=m=>[...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,20);
console.log(JSON.stringify({period_days:days,likely_human_page_requests:humanRequests,bot_requests:botRequests,scanner_requests:scannerRequests,contact_page_requests:contact,service_interest_requests:service,top_pages:top(counts),external_referrers:top(refs),top_bots:top(bots)},null,2));
