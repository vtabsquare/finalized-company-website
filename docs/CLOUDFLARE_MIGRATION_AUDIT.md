# VTAB Square — controlled Cloudflare migration audit

Status: STAGING PREPARATION ONLY. No production DNS or nameserver change is authorized by this document.

## Verified from repository (main, reviewed 2026-09-26)
- `package.json` builds with Vite **and** `scripts/generate-service-seo.mjs`; do not omit the second stage.
- `render.yaml` publishes `dist` and rewrites unknown routes to `/index.html`.
- `scripts/nginxVisitorReport.js` reads DigitalOcean/Nginx logs; `scripts/sendNginxVisitorReport.js` emails aggregate reporting using Brevo.
- `.env.example` documents Supabase browser configuration and business recipient settings.
- Existing Cloudflare screenshots show `vtab-company-website-dev` as a static-assets Worker, but its workers.dev hostname returned NXDOMAIN when tested against 1.1.1.1. The screenshot does not establish why the hostname is absent.

## Staging implementation
`wrangler.jsonc` intentionally uses a **different** Worker name: `vtab-company-website-staging-audit`. It serves the complete `dist` output and falls back to the SPA for unknown paths. Existing generated service-page HTML must be checked for each canonical route before deployment approval. Do not rename or delete `vtab-company-website-dev` to resolve DNS.

Local validation (Node.js/npm required):
```sh
npm ci
npm run lint
npm run build
test -f dist/index.html
test -f dist/sql-server-to-databricks-migration/index.html
test -f dist/power-bi-consulting-services/index.html
test -f dist/ai-application-development/index.html
test -f dist/case-studies/sql-server-to-databricks-migration-factory/index.html
npx wrangler deploy --dry-run
```
On Windows PowerShell replace `test -f` with `Test-Path` checks. Do not deploy until these pass and the correct Cloudflare account is confirmed.

## Mandatory checks before any traffic cutover
1. Export or transcribe the complete currently authoritative DNS zone (A, AAAA, CNAME, MX, TXT/SPF, DKIM, DMARC, CAA, SRV, verification, subdomains, TTL). Compare each record against Cloudflare DNS, including Microsoft 365 email records. Record nameserver delegation at the registrar separately. Keep production nameservers unchanged.
2. Confirm Cloudflare zone status, assigned nameservers, Workers subdomain and Workers.dev enablement; test the staging Worker hostname via public resolvers. NXDOMAIN on both the Worker and account subdomain requires Cloudflare account/subdomain investigation; changing GoDaddy nameservers is not a fix for workers.dev.
3. Check routes: /, /solutions, /industries, /lab, /about, /careers, /contact, /architecture/<valid-product>, and all generated SEO paths. Verify HTML status, canonical, assets, refresh/deep links and navigation.
4. Test all lead/career/contact forms end-to-end, Supabase endpoint availability, authentication/permissions and business notification delivery. Never place service-role keys, Brevo secrets or other privileged credentials in `VITE_*` variables.
5. Keep DigitalOcean droplet and snapshot. Existing Nginx reporting will not observe traffic served entirely by Cloudflare. Design and validate a replacement event/report pipeline before changing traffic; do not claim reporting parity from a working frontend.
6. Compare the live DigitalOcean deployment with GitHub main; code in the repository may differ from deployed configuration and runtime secrets. Record the currently running server build and rollback method.
7. Verify SSL/TLS mode, origin certificate, www/apex redirects, email delivery, analytics and rollback before authorizing a nameserver switch.

## Explicitly not done
- No Cloudflare API deployment, custom-domain binding, DNS change, registrar change or DigitalOcean shutdown.
- No claims that the staging hostname resolves or that production traffic has migrated.
- No production environment variables or secret values copied into GitHub.
