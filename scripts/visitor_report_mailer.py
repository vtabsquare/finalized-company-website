#!/usr/bin/env python3
"""Send one private VTAB Square daily report through a scoped Graph app.

No email is sent unless --send-test or --send-daily is supplied. Never log keys
or access tokens. Requires pip-installed msal in a dedicated private venv.
"""
import argparse
import base64
import datetime as dt
import json
import os
from pathlib import Path
import re
import ssl
import sys
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo

SENDER = "Contactsales@vtabsquare.com"
TO = "Information@vtabsquare.com"
CC = "vitabsquare@gmail.com"
GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/users/Contactsales%40vtabsquare.com/sendMail"
IST = ZoneInfo("Asia/Kolkata")
REPORT_RE = re.compile(r"vtabsquare-traffic-(\d{4}-\d{2}-\d{2})[.]html$")


def report_date(now=None):
    return ((now or dt.datetime.now(IST)).astimezone(IST).date() - dt.timedelta(days=1)).isoformat()


def safe_report(directory: Path, date: str):
    folder = directory.resolve(strict=True)
    if str(folder).startswith("/var/www/") or "dist" in folder.parts:
        raise ValueError("Refusing to read a report from public website files")
    dt.date.fromisoformat(date)
    file = folder / ("vtabsquare-traffic-" + date + ".html")
    if not REPORT_RE.fullmatch(file.name) or not file.is_file() or file.is_symlink():
        raise ValueError("Private report is missing or is a symlink: " + str(file))
    if file.stat().st_size > 2_000_000:
        raise ValueError("Refusing attachment larger than 2 MB")
    data = file.read_bytes()
    if b"VTAB Square" not in data or b"<html" not in data:
        raise ValueError("Report HTML failed format checks")
    return file, data


def message(date: str, attachment: bytes, is_test: bool = False):
    subject = "VTAB Square | " + ("TEST | " if is_test else "") + "Daily Visitor Intelligence | " + date
    body = (
        "VTAB Square website request report for " + date + " (Asia/Kolkata).\n\n"
        "The attached private HTML summary reports qualifying page requests, not "
        "identified people, unique visitors or qualified leads. Automated scans "
        "can remain in the request totals.\n\n"
        + ("TEST MESSAGE — daily emailing is not yet enabled.\n" if is_test else "")
    )
    return {
        "message": {
            "subject": subject,
            "body": {"contentType": "Text", "content": body},
            "toRecipients": [{"emailAddress": {"address": TO}}],
            "ccRecipients": [{"emailAddress": {"address": CC}}],
            "attachments": [{
                "@odata.type": "#microsoft.graph.fileAttachment",
                "name": "vtabsquare-traffic-" + date + ".html",
                "contentType": "text/html",
                "contentBytes": base64.b64encode(attachment).decode("ascii"),
            }],
        },
        "saveToSentItems": True,
    }


def token(tenant: str, app: str, private_key_path: Path, public_cert_path: Path):
    import msal  # load only when authenticated sending is requested
    private_key = private_key_path.read_text(encoding="ascii")
    cert = public_cert_path.read_text(encoding="ascii")
    auth = msal.ConfidentialClientApplication(
        client_id=app,
        authority="https://login.microsoftonline.com/" + tenant,
        client_credential={"private_key": private_key, "public_certificate": cert},
    )
    result = auth.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])
    if "access_token" not in result:
        # Intentionally do not print full response: it can contain sensitive data.
        raise RuntimeError("Microsoft Entra app-only token request failed: " +
                           str(result.get("error", "unknown")))
    return result["access_token"]


def post_graph(payload: dict, access_token: str):
    request = urllib.request.Request(
        GRAPH_ENDPOINT,
        data=json.dumps(payload, separators=(",", ":")).encode("utf-8"),
        headers={"Authorization": "Bearer " + access_token,
                 "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30, context=ssl.create_default_context()) as response:
            if response.status != 202:
                raise RuntimeError("Graph returned unexpected HTTP status " + str(response.status))
    except urllib.error.HTTPError as err:
        # Do not print headers, body, bearer token or email content to logs.
        raise RuntimeError("Graph sendMail rejected request; HTTP " + str(err.code)) from None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--dry-run", action="store_true", help="Inspect metadata without authenticating or sending")
    mode.add_argument("--send-test", action="store_true", help="Send an explicitly marked one-off test")
    mode.add_argument("--send-daily", action="store_true", help="Send yesterday IST report, once per day")
    parser.add_argument("--reports", type=Path, default=Path("/var/lib/vtabsquare-reports"))
    parser.add_argument("--config", type=Path, default=Path("/etc/vtabsquare-reporting/graph-mailer.json"))
    args = parser.parse_args()
    date = report_date()
    file, data = safe_report(args.reports, date)
    if args.dry_run:
        print("DRY RUN: no authentication or email sent. Date:", date,
              "Report:", file, "Bytes:", len(data), "From:", SENDER,
              "To:", TO, "CC:", CC)
        return
    if args.config.is_symlink():
        raise RuntimeError("Refusing symlink configuration")
    config = json.loads(args.config.read_text("utf-8"))
    tenant, app = config["tenant_id"], config["client_id"]
    private_key = Path(config["private_key"])
    public_cert = Path(config["public_certificate"])
    if not private_key.is_file() or private_key.is_symlink():
        raise RuntimeError("Certificate private key not found or symlink")
    if not public_cert.is_file() or public_cert.is_symlink():
        raise RuntimeError("Public certificate not found or symlink")
    sent_marker = args.reports / ("vtabsquare-traffic-" + date + ".sent")
    if args.send_daily and sent_marker.exists():
        print("Already marked sent; skipping duplicate daily email for", date)
        return
    access_token = token(tenant, app, private_key, public_cert)
    post_graph(message(date, data, is_test=args.send_test), access_token)
    # 202 = accepted by Graph; delivery must be verified via recipients / trace.
    print("Graph accepted", "TEST" if args.send_test else "DAILY",
          "message for", date, "HTTP 202 (not proof of delivery)")
    if args.send_daily:
        fd = os.open(str(sent_marker), os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
        with os.fdopen(fd, "w") as stream:
            stream.write("Accepted by Microsoft Graph (HTTP 202)\n")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print("Reporting mailer failed:", str(exc), file=sys.stderr)
        sys.exit(1)
