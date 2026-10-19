# VTAB Square visitor intelligence — stage 1 (read-only)

This first stage produces a **private, aggregate** HTML/JSON daily traffic brief from
a **dedicated main-website Nginx access log**. It does not identify visitors, infer
companies, record IPs in report files, capture SPA page transitions, read Supabase,
or send email. It MUST NOT be presented as a complete lead/unique-user dashboard.

## Prerequisites / safeguards

1. The existing production website and all \`dist.*backup*\` directories must remain
   untouched. Review Nginx site config and existing access-log directives before
   adding a separate per-site log. Do not configure shared admin/API/vault logs as
   input: a shared log cannot reliably isolate main-website requests.
2. An authorized operator should arrange a dedicated log such as
   \`/var/log/nginx/vtabsquare-company.access.log\` and test Nginx syntax before reload.
   Confirm rotation, restricted log permissions, and current privacy disclosures.
3. Reports MUST live outside Nginx web roots; use a restricted folder like
   \`/var/lib/vtabsquare-reports\` (700 directory, 600 reports).
   Do not serve it publicly or commit it to Git.
4. The parser assumes the standard Nginx **combined** format. Confirm the log
   format before interpreting results. It discards raw IPs and URL query strings.
5. The log may contain visitor IPs, query strings, referrers and user agents;
   treat the raw file as personal data and manage its access/retention accordingly.
   The report only emits aggregate page paths, classified sources and HTTP groups.

## Manual report generation, after confirming the dedicated log exists

\`\`\`bash
cd /var/www/vtabsquare-company-website
python3 scripts/visitor_traffic_report.py \
  --log /var/log/nginx/vtabsquare-company.access.log \
  --date 2026-09-20 \
  --output /var/lib/vtabsquare-reports
\`\`\`

This creates \`vtabsquare-traffic-2026-09-20.html\` and \`.json\`. The output is a
local administrative dashboard/report, not yet a publicly hosted web dashboard.

## Daily India-time reporting and rotated logs

The report now defaults to the **previous calendar day in Asia/Kolkata**, even
when the Droplet clock and Nginx log timestamps are UTC. It reads the live
dedicated Nginx log plus standard rotated files matching `.1`, `.2.gz`, etc.;
`--single-log` is for diagnostics only and can produce incomplete totals.

On the VTabSquarePortal Droplet, with the copy kept OUTSIDE the live website:

```bash
sudo python3 /opt/vtabsquare-reporting/visitor_traffic_report.py \
  --log /var/log/nginx/vtabsquare-website.access.log \
  --date 2026-09-21 \
  --timezone Asia/Kolkata \
  --output /var/lib/vtabsquare-reports
```

Use `--date` to test a particular **IST** day. For a future daily 09:00 IST
schedule, omit `--date`: it automatically selects yesterday in India. At
09:00 IST the preceding IST day has ended. On a UTC-configured server, 09:00 IST
corresponds to 03:30 UTC. At that time the rotated log may contain the relevant
traffic; do not schedule a single-live-log report.

**Caution:** Dedicated logging on this Droplet began on September 20 after
18:30 UTC, i.e. after midnight September 21 IST. Thus a September 20 IST
report is expected to be empty/incomplete despite the previous UTC-day
September 20 prototype counting requests. A September 21 IST report generated
before midnight IST is also partial.

This is a **private local HTML file**, not a logged-in web dashboard. No
email sending or automated scheduling is installed by this script alone.

## Reporting limitations / next implementation phases

- Request counts are not unique people, visits or qualified leads. Browser SPA
  transitions/clicks are captured, if available, in the separate website analytics
  service, **not** this Nginx report.
- Supabase project \`doazlhotvvzmsngjbfne\` currently requires account recovery;
  verify permissions, visitor tracking, consent/retention, and data availability
  before integrating product interactions and real lead counts.
- Google Search Console/GA4 authorization is necessary for genuine search
  impressions, clicks, traffic/session figures, and channel attribution.
- To automate emailing at **9 AM IST** with **To:
  Information@vtabsquare.com** and **CC: vitabsquare@gmail.com**, implement and
  test a **server-side** scheduled mail integration using authorized Microsoft
  365/Graph or a suitable approved SMTP relay. A report generator on the server
  cannot use the ChatGPT Outlook connection automatically. Do not embed
  credentials in Vite, \`.env.example\`, GitHub or client-side JavaScript.
- Define weekly retention, proper access control, bot exclusions and consent
  handling before broader deployment. Test report delivery and failure alerts.
- Never claim the report identifies anonymous visitors by name, employer or
  work email. Only a voluntary customer enquiry can give an identified lead.

## Verification

\`\`\`bash
python3 -m unittest discover -s scripts/tests -p 'test_visitor_traffic_report.py'
\`\`\`
