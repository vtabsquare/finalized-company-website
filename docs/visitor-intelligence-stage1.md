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
