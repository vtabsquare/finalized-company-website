# Secure enquiry API — staged, NOT LIVE

This is a standalone loopback-only Node.js service. Merging this PR does not start it, modify Nginx, change the website UI, or replace the working mailto demo fallback.

## Security prerequisites

- Provision a **new server-only** `BREVO_API_KEY` outside the Vite build. Do not copy a `VITE_*` secret into client code or commit it. Rotate any Brevo key previously exposed through public frontend bundles.
- Set `BREVO_SENDER_EMAIL` to an address verified in Brevo; `LEAD_ENQUIRY_TO=Information@vtabsquare.com`.
- Set `LEAD_ALLOWED_ORIGINS=https://www.vtabsquare.com,https://vtabsquare.com`.
- Protect the server environment file (root/service-user readable only); do not print its contents.
- Configure a restricted service user and systemd unit; bind is hard-coded to 127.0.0.1:4317. Add an Nginx **exact-location** reverse proxy for `/api/enquiry` only after checking the existing live Nginx config. Never expose port 4317 publicly.
- Keep the existing mailto fallback until real end-to-end form and email delivery tests pass.

## Behavior

POST JSON to `/api/enquiry` with `fullName`, `workEmail`, `companyName`, `interestArea`, `message`, optional `teamSize`, `preferredDate`, and empty honeypot `website`. The server validates required fields, limits body size and per-IP attempts, checks Origin, escapes HTML, and sends to the sales mailbox using Brevo from the server. This is a first layer of spam mitigation, not a complete anti-abuse solution; add edge rate limits/CAPTCHA if needed. It does not create a calendar booking or promise a response time.

## Validation before activation

1. Run `node --check scripts/leadEnquiryServer.js` and `npm run lint`.
2. Test invalid Origin, malformed JSON, honeypot, missing fields, oversized request and rate limit with a mock Brevo service or controlled test account.
3. Verify exact Nginx route, HTTPS, sender verification, mailbox delivery, error behavior and logs.
4. Only then wire the existing DemoModal form to this endpoint, preserving its current styling and retaining mailto as an error fallback. Do not switch the UI merely because this backend file exists.
