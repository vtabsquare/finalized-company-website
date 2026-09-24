# VTAB Square — safe daily visitor email rollout

This feature is **not enabled merely by merging this PR**. It needs an operator on the DigitalOcean host.

## Preflight
- Confirm latest `main` is deployed and the existing site works.
- Verify the dedicated log exists: `/var/log/nginx/vtabsquare-website.access.log`.
- Do not print or copy `.env` contents.
- Verify the report's timestamp filtering and event counts with `REPORT_PREVIOUS_DAY=1 npm run report:nginx`.
- Verify delivery once with `REPORT_PREVIOUS_DAY=1 npm run report:nginx:email`.
- Confirm both intended recipient addresses in `VISITOR_REPORT_TO` or `VITE_ADMIN_EMAILS` (the latter may be different); do not assume the fallback recipients will be used.

## Schedule (only after verification)
Check `timedatectl` and `command -v npm` first. On a server configured for UTC, 02:30 UTC = 08:00 IST. Add one entry to the **website deploy user's** crontab (`crontab -e`), replacing the npm path if necessary:

```cron
30 2 * * * cd /var/www/vtabsquare-company-website && REPORT_PREVIOUS_DAY=1 /usr/bin/npm run report:nginx:email >> /var/log/vtabsquare-visitor-report.log 2>&1
```

Use a user-writable log path if that user cannot write to `/var/log` (for example, `/home/<deploy-user>/vtabsquare-visitor-report.log`). Do not run as root just to write a log. Check the crontab with `crontab -l`. The cron user must be able to read the dedicated Nginx log and the project's environment file. The script sends email; do not test it repeatedly against real recipients.

The scheduled report covers **the previous complete calendar day in Asia/Kolkata**. The default interactive `REPORT_DAYS=1` command still covers a rolling day.

## Rollback
Remove only the VTAB visitor-report cron line from the deploy user's crontab. This does not require an Nginx restart or affect the website.
