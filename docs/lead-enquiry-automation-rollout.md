# Lead enquiry automation — deployment checklist

This change is **not deployed** until reviewed, tested and explicitly rolled out.

## Behaviour
- Accepts the existing POST /api/enquiry JSON schema without frontend changes.
- Appends each validated enquiry to a private, append-only JSON Lines file before email delivery.
- Creates a unique reference ID, notifies the existing sales inbox via Brevo, and sends a separate acknowledgement to the customer.
- Appends delivery outcome events to the same file. The current follow-up status starts at New, with a proposed follow-up time 24 hours later. **No automatic follow-up reminder or status-editing UI is implemented yet.**
- Does not expose lead data over HTTP.

## Before production rollout
1. Ensure adequate disk space and backups; the server was observed at 93% usage.
2. Confirm /var/lib/vtabsquare exists, is not served by Nginx, and can be written by the service account. Example (current service runs as root): sudo install -d -m 700 /var/lib/vtabsquare
3. Keep /var/lib/vtabsquare/leads.jsonl out of Git and all public folders. Back up securely, apply retention/access policies.
4. Review the new source, run node --check scripts/leadEnquiryServer.js, and test on a separate loopback port using a non-production Brevo setup.
5. Ensure sales mailbox can receive notifications and the sender domain is verified for customer acknowledgements.
6. Only then deploy with a backup and restart vtabsquare-lead-api.service. Check journalctl -u vtabsquare-lead-api.service and /health.
7. Validate one authorized test enquiry end-to-end in both mailboxes and verify the record exists. Do not paste real customer data or API keys into tickets.

## Caveats
- The JSONL file is an event log, not a sales dashboard. Follow-up tracking UI, reminder job, retry queue, and deduplication require a second phase.
- If Brevo accepts an email and a subsequent local event write fails, a retry may duplicate notifications. Do not blindly retry submissions.
- Customer acknowledgement delivery acceptance by Brevo does not guarantee inbox placement.
- The endpoint still has in-memory rate limiting. Add persistent anti-abuse controls before higher traffic.
