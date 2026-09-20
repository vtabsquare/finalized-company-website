#!/usr/bin/env python3
"""Aggregate a dedicated VTAB Square Nginx combined access log, without exporting IPs.

This is a first-stage, read-only, traffic report. It does NOT count unique users,
identify people, know SPA-only product interactions, or send email. Those depend
on a consent-reviewed analytics source and a configured server-side mailer.
"""
import argparse
import collections
import datetime as dt
import html
import json
import os
import re
from pathlib import Path
from urllib.parse import urlsplit

COMBINED = re.compile(
    r'^\S+ \S+ \S+ \[(?P<stamp>[^\]]+)\] '
    r'"(?P<request>[^"]*)" (?P<status>\d{3}) \S+ '
    r'"(?P<referrer>[^"]*)" "(?P<agent>[^"]*)"'
)
BOT = re.compile(r'bot|crawler|spider|headless|lighthouse|curl/|wget/|uptime|monitor', re.I)
STATIC = re.compile(r'^/(?:src/)?(?:assets|media|static)/|^/(?:favicon|logo|robots\.txt|sitemap\.xml)|\.(?:js|css|png|jpe?g|svg|gif|webp|ico|woff2?|ttf|otf|map|mp4|webm|pdf)
HOSTS = {"vtabsquare.com", "www.vtabsquare.com"}


def category(referrer: str) -> str:
    if referrer in ("", "-"):
        return "Direct / unknown"
    try:
        host = (urlsplit(referrer).hostname or "").lower()
    except ValueError:
        return "Other referral"
    if host in HOSTS:
        return "Internal"
    for label, domains in (
        ("Google", ("google.",)),
        ("Bing", ("bing.com",)),
        ("LinkedIn", ("linkedin.com",)),
        ("Facebook / Instagram", ("facebook.com", "instagram.com")),
        ("YouTube", ("youtube.com", "youtu.be")),
    ):
        if any(domain in host for domain in domains):
            return label
    return "Other referral"


def summarize(log: Path, date: str) -> dict:
    pages = collections.Counter()
    sources = collections.Counter()
    statuses = collections.Counter()
    skipped = collections.Counter()
    with log.open("r", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            match = COMBINED.match(line)
            if not match:
                skipped["Unparsed log line"] += 1
                continue
            try:
                timestamp = dt.datetime.strptime(match["stamp"], "%d/%b/%Y:%H:%M:%S %z")
            except ValueError:
                skipped["Invalid timestamp"] += 1
                continue
            if timestamp.date().isoformat() != date:
                continue
            request = match["request"].split()
            if len(request) < 2 or request[0] not in {"GET", "HEAD"}:
                continue
            if BOT.search(match["agent"]):
                skipped["Likely automation"] += 1
                continue
            url = urlsplit(request[1])
            path = url.path or "/"
            if STATIC.search(path) or path in {"/", ""} and request[0] == "HEAD":
                # HEAD is often monitoring; avoid double-counting the homepage.
                if STATIC.search(path):
                    skipped["Static asset"] += 1
                else:
                    skipped["HEAD homepage"] += 1
                continue
            if request[0] == "HEAD":
                continue
            code = int(match["status"])
            statuses[f"{code // 100}xx"] += 1
            if code >= 400:
                continue
            pages[path] += 1
            source = category(match["referrer"])
            if source != "Internal":
                sources[source] += 1
    return {
        "date": date, "basis": "Nginx GET requests; not unique visitors or SPA navigation",
        "page_requests": sum(pages.values()),
        "pages": dict(pages.most_common(30)),
        "acquisition_requests": dict(sources.most_common()),
        "status_counts": dict(statuses),
        "excluded_requests": dict(skipped),
        "limitations": [
            "No visitor identity, distinct user, session or client-IP metrics.",
            "SPA page transitions and product-click activity are not visible in server access logs.",
            "Bot filtering is approximate; browser caching/ad blockers can change counts.",
            "Use a dedicated site log; shared Nginx access logs may contain other applications.",
            "Date follows the timezone recorded by Nginx access-log timestamps.",
        ],
    }


def render(report: dict) -> str:
    def rows(data):
        return "".join(
            "<tr><td>" + html.escape(str(k)) + "</td><td>" +
            str(v) + "</td></tr>" for k, v in data.items()
        ) or '<tr><td colspan="2">No matching activity</td></tr>'
    return (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="robots" content="noindex,nofollow">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>Private VTAB Square traffic brief</title>'
        '<style>body{font:16px system-ui;max-width:840px;margin:40px auto;'
        'padding:0 20px;color:#172235}table{border-collapse:collapse;width:100%}'
        'td,th{padding:10px;border-bottom:1px solid #dae2ec;text-align:left}'
        'section{margin:30px 0}small{color:#586777}</style></head><body>'
        '<h1>VTAB Square — daily website traffic brief</h1>'
        '<p>Date: ' + html.escape(report["date"]) + '</p>'
        '<h2>' + str(report["page_requests"]) + ' page requests</h2>'
        '<small>Not unique visitors. No personal identities or IPs are included.</small>'
        '<section><h2>Requested pages</h2><table><tr><th>Page path</th>'
        '<th>Requests</th></tr>' + rows(report["pages"]) + '</table></section>'
        '<section><h2>External acquisition</h2><table><tr><th>Source</th>'
        '<th>Requests</th></tr>' + rows(report["acquisition_requests"]) + '</table></section>'
        '<section><h2>HTTP status totals</h2><table><tr><th>Status group</th>'
        '<th>Requests</th></tr>' + rows(report["status_counts"]) + '</table></section>'
        '<section><h2>Reporting limitations</h2><ul>' +
        "".join("<li>" + html.escape(item) + "</li>" for item in report["limitations"]) +
        '</ul></section></body></html>'
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--log", type=Path, required=True,
                        help="Dedicated company website Nginx combined-format access log")
    parser.add_argument("--date", default=(dt.datetime.now(dt.timezone.utc).date() - dt.timedelta(days=1)).isoformat(),
                        help="Date YYYY-MM-DD in Nginx timestamp timezone; default yesterday UTC")
    parser.add_argument("--output", type=Path, required=True,
                        help="Private report folder OUTSIDE the publicly served website")
    args = parser.parse_args()
    dt.date.fromisoformat(args.date)
    if not args.log.is_file():
        parser.error("The specified Nginx access log does not exist.")
    if "dist" in args.output.resolve().parts or str(args.output.resolve()).startswith("/var/www/"):
        parser.error("Report output must not be under /var/www or a public dist directory.")
    old_mask = os.umask(0o077)
    try:
        args.output.mkdir(parents=True, exist_ok=True, mode=0o700)
        report = summarize(args.log, args.date)
        for ext, body in ((".json", json.dumps(report, indent=2)), (".html", render(report))):
            destination = args.output / ("vtabsquare-traffic-" + args.date + ext)
            destination.write_text(body + "\n", encoding="utf-8")
            destination.chmod(0o600)
            print("Created private report:", destination)
    finally:
        os.umask(old_mask)


if __name__ == "__main__":
    main()
, re.I)
HOSTS = {"vtabsquare.com", "www.vtabsquare.com"}


def category(referrer: str) -> str:
    if referrer in ("", "-"):
        return "Direct / unknown"
    try:
        host = (urlsplit(referrer).hostname or "").lower()
    except ValueError:
        return "Other referral"
    if host in HOSTS:
        return "Internal"
    for label, domains in (
        ("Google", ("google.",)),
        ("Bing", ("bing.com",)),
        ("LinkedIn", ("linkedin.com",)),
        ("Facebook / Instagram", ("facebook.com", "instagram.com")),
        ("YouTube", ("youtube.com", "youtu.be")),
    ):
        if any(domain in host for domain in domains):
            return label
    return "Other referral"


def summarize(log: Path, date: str) -> dict:
    pages = collections.Counter()
    sources = collections.Counter()
    statuses = collections.Counter()
    skipped = collections.Counter()
    with log.open("r", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            match = COMBINED.match(line)
            if not match:
                skipped["Unparsed log line"] += 1
                continue
            try:
                timestamp = dt.datetime.strptime(match["stamp"], "%d/%b/%Y:%H:%M:%S %z")
            except ValueError:
                skipped["Invalid timestamp"] += 1
                continue
            if timestamp.date().isoformat() != date:
                continue
            request = match["request"].split()
            if len(request) < 2 or request[0] not in {"GET", "HEAD"}:
                continue
            if BOT.search(match["agent"]):
                skipped["Likely automation"] += 1
                continue
            url = urlsplit(request[1])
            path = url.path or "/"
            if STATIC.search(path) or path in {"/", ""} and request[0] == "HEAD":
                # HEAD is often monitoring; avoid double-counting the homepage.
                if STATIC.search(path):
                    skipped["Static asset"] += 1
                else:
                    skipped["HEAD homepage"] += 1
                continue
            if request[0] == "HEAD":
                continue
            code = int(match["status"])
            statuses[f"{code // 100}xx"] += 1
            if code >= 400:
                continue
            pages[path] += 1
            source = category(match["referrer"])
            if source != "Internal":
                sources[source] += 1
    return {
        "date": date, "basis": "Nginx GET requests; not unique visitors or SPA navigation",
        "page_requests": sum(pages.values()),
        "pages": dict(pages.most_common(30)),
        "acquisition_requests": dict(sources.most_common()),
        "status_counts": dict(statuses),
        "excluded_requests": dict(skipped),
        "limitations": [
            "No visitor identity, distinct user, session or client-IP metrics.",
            "SPA page transitions and product-click activity are not visible in server access logs.",
            "Bot filtering is approximate; browser caching/ad blockers can change counts.",
            "Use a dedicated site log; shared Nginx access logs may contain other applications.",
            "Date follows the timezone recorded by Nginx access-log timestamps.",
        ],
    }


def render(report: dict) -> str:
    def rows(data):
        return "".join(
            "<tr><td>" + html.escape(str(k)) + "</td><td>" +
            str(v) + "</td></tr>" for k, v in data.items()
        ) or '<tr><td colspan="2">No matching activity</td></tr>'
    return (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="robots" content="noindex,nofollow">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>Private VTAB Square traffic brief</title>'
        '<style>body{font:16px system-ui;max-width:840px;margin:40px auto;'
        'padding:0 20px;color:#172235}table{border-collapse:collapse;width:100%}'
        'td,th{padding:10px;border-bottom:1px solid #dae2ec;text-align:left}'
        'section{margin:30px 0}small{color:#586777}</style></head><body>'
        '<h1>VTAB Square — daily website traffic brief</h1>'
        '<p>Date: ' + html.escape(report["date"]) + '</p>'
        '<h2>' + str(report["page_requests"]) + ' page requests</h2>'
        '<small>Not unique visitors. No personal identities or IPs are included.</small>'
        '<section><h2>Requested pages</h2><table><tr><th>Page path</th>'
        '<th>Requests</th></tr>' + rows(report["pages"]) + '</table></section>'
        '<section><h2>External acquisition</h2><table><tr><th>Source</th>'
        '<th>Requests</th></tr>' + rows(report["acquisition_requests"]) + '</table></section>'
        '<section><h2>HTTP status totals</h2><table><tr><th>Status group</th>'
        '<th>Requests</th></tr>' + rows(report["status_counts"]) + '</table></section>'
        '<section><h2>Reporting limitations</h2><ul>' +
        "".join("<li>" + html.escape(item) + "</li>" for item in report["limitations"]) +
        '</ul></section></body></html>'
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--log", type=Path, required=True,
                        help="Dedicated company website Nginx combined-format access log")
    parser.add_argument("--date", default=(dt.datetime.now(dt.timezone.utc).date() - dt.timedelta(days=1)).isoformat(),
                        help="Date YYYY-MM-DD in Nginx timestamp timezone; default yesterday UTC")
    parser.add_argument("--output", type=Path, required=True,
                        help="Private report folder OUTSIDE the publicly served website")
    args = parser.parse_args()
    dt.date.fromisoformat(args.date)
    if not args.log.is_file():
        parser.error("The specified Nginx access log does not exist.")
    if "dist" in args.output.resolve().parts or str(args.output.resolve()).startswith("/var/www/"):
        parser.error("Report output must not be under /var/www or a public dist directory.")
    old_mask = os.umask(0o077)
    try:
        args.output.mkdir(parents=True, exist_ok=True, mode=0o700)
        report = summarize(args.log, args.date)
        for ext, body in ((".json", json.dumps(report, indent=2)), (".html", render(report))):
            destination = args.output / ("vtabsquare-traffic-" + args.date + ext)
            destination.write_text(body + "\n", encoding="utf-8")
            destination.chmod(0o600)
            print("Created private report:", destination)
    finally:
        os.umask(old_mask)


if __name__ == "__main__":
    main()
, re.I)
HOSTS = {"vtabsquare.com", "www.vtabsquare.com"}


def category(referrer: str) -> str:
    if referrer in ("", "-"):
        return "Direct / unknown"
    try:
        host = (urlsplit(referrer).hostname or "").lower()
    except ValueError:
        return "Other referral"
    if host in HOSTS:
        return "Internal"
    for label, domains in (
        ("Google", ("google.",)),
        ("Bing", ("bing.com",)),
        ("LinkedIn", ("linkedin.com",)),
        ("Facebook / Instagram", ("facebook.com", "instagram.com")),
        ("YouTube", ("youtube.com", "youtu.be")),
    ):
        if any(domain in host for domain in domains):
            return label
    return "Other referral"


def summarize(log: Path, date: str) -> dict:
    pages = collections.Counter()
    sources = collections.Counter()
    statuses = collections.Counter()
    skipped = collections.Counter()
    with log.open("r", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            match = COMBINED.match(line)
            if not match:
                skipped["Unparsed log line"] += 1
                continue
            try:
                timestamp = dt.datetime.strptime(match["stamp"], "%d/%b/%Y:%H:%M:%S %z")
            except ValueError:
                skipped["Invalid timestamp"] += 1
                continue
            if timestamp.date().isoformat() != date:
                continue
            request = match["request"].split()
            if len(request) < 2 or request[0] not in {"GET", "HEAD"}:
                continue
            if BOT.search(match["agent"]):
                skipped["Likely automation"] += 1
                continue
            url = urlsplit(request[1])
            path = url.path or "/"
            if STATIC.search(path) or path in {"/", ""} and request[0] == "HEAD":
                # HEAD is often monitoring; avoid double-counting the homepage.
                if STATIC.search(path):
                    skipped["Static asset"] += 1
                else:
                    skipped["HEAD homepage"] += 1
                continue
            if request[0] == "HEAD":
                continue
            code = int(match["status"])
            statuses[f"{code // 100}xx"] += 1
            if code >= 400:
                continue
            pages[path] += 1
            source = category(match["referrer"])
            if source != "Internal":
                sources[source] += 1
    return {
        "date": date, "basis": "Nginx GET requests; not unique visitors or SPA navigation",
        "page_requests": sum(pages.values()),
        "pages": dict(pages.most_common(30)),
        "acquisition_requests": dict(sources.most_common()),
        "status_counts": dict(statuses),
        "excluded_requests": dict(skipped),
        "limitations": [
            "No visitor identity, distinct user, session or client-IP metrics.",
            "SPA page transitions and product-click activity are not visible in server access logs.",
            "Bot filtering is approximate; browser caching/ad blockers can change counts.",
            "Use a dedicated site log; shared Nginx access logs may contain other applications.",
            "Date follows the timezone recorded by Nginx access-log timestamps.",
        ],
    }


def render(report: dict) -> str:
    def rows(data):
        return "".join(
            "<tr><td>" + html.escape(str(k)) + "</td><td>" +
            str(v) + "</td></tr>" for k, v in data.items()
        ) or '<tr><td colspan="2">No matching activity</td></tr>'
    return (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="robots" content="noindex,nofollow">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>Private VTAB Square traffic brief</title>'
        '<style>body{font:16px system-ui;max-width:840px;margin:40px auto;'
        'padding:0 20px;color:#172235}table{border-collapse:collapse;width:100%}'
        'td,th{padding:10px;border-bottom:1px solid #dae2ec;text-align:left}'
        'section{margin:30px 0}small{color:#586777}</style></head><body>'
        '<h1>VTAB Square — daily website traffic brief</h1>'
        '<p>Date: ' + html.escape(report["date"]) + '</p>'
        '<h2>' + str(report["page_requests"]) + ' page requests</h2>'
        '<small>Not unique visitors. No personal identities or IPs are included.</small>'
        '<section><h2>Requested pages</h2><table><tr><th>Page path</th>'
        '<th>Requests</th></tr>' + rows(report["pages"]) + '</table></section>'
        '<section><h2>External acquisition</h2><table><tr><th>Source</th>'
        '<th>Requests</th></tr>' + rows(report["acquisition_requests"]) + '</table></section>'
        '<section><h2>HTTP status totals</h2><table><tr><th>Status group</th>'
        '<th>Requests</th></tr>' + rows(report["status_counts"]) + '</table></section>'
        '<section><h2>Reporting limitations</h2><ul>' +
        "".join("<li>" + html.escape(item) + "</li>" for item in report["limitations"]) +
        '</ul></section></body></html>'
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--log", type=Path, required=True,
                        help="Dedicated company website Nginx combined-format access log")
    parser.add_argument("--date", default=(dt.datetime.now(dt.timezone.utc).date() - dt.timedelta(days=1)).isoformat(),
                        help="Date YYYY-MM-DD in Nginx timestamp timezone; default yesterday UTC")
    parser.add_argument("--output", type=Path, required=True,
                        help="Private report folder OUTSIDE the publicly served website")
    args = parser.parse_args()
    dt.date.fromisoformat(args.date)
    if not args.log.is_file():
        parser.error("The specified Nginx access log does not exist.")
    if "dist" in args.output.resolve().parts or str(args.output.resolve()).startswith("/var/www/"):
        parser.error("Report output must not be under /var/www or a public dist directory.")
    old_mask = os.umask(0o077)
    try:
        args.output.mkdir(parents=True, exist_ok=True, mode=0o700)
        report = summarize(args.log, args.date)
        for ext, body in ((".json", json.dumps(report, indent=2)), (".html", render(report))):
            destination = args.output / ("vtabsquare-traffic-" + args.date + ext)
            destination.write_text(body + "\n", encoding="utf-8")
            destination.chmod(0o600)
            print("Created private report:", destination)
    finally:
        os.umask(old_mask)


if __name__ == "__main__":
    main()
, re.I)
HOSTS = {"vtabsquare.com", "www.vtabsquare.com"}


def category(referrer: str) -> str:
    if referrer in ("", "-"):
        return "Direct / unknown"
    try:
        host = (urlsplit(referrer).hostname or "").lower()
    except ValueError:
        return "Other referral"
    if host in HOSTS:
        return "Internal"
    for label, domains in (
        ("Google", ("google.",)),
        ("Bing", ("bing.com",)),
        ("LinkedIn", ("linkedin.com",)),
        ("Facebook / Instagram", ("facebook.com", "instagram.com")),
        ("YouTube", ("youtube.com", "youtu.be")),
    ):
        if any(domain in host for domain in domains):
            return label
    return "Other referral"


def summarize(log: Path, date: str) -> dict:
    pages = collections.Counter()
    sources = collections.Counter()
    statuses = collections.Counter()
    skipped = collections.Counter()
    with log.open("r", encoding="utf-8", errors="replace") as fh:
        for line in fh:
            match = COMBINED.match(line)
            if not match:
                skipped["Unparsed log line"] += 1
                continue
            try:
                timestamp = dt.datetime.strptime(match["stamp"], "%d/%b/%Y:%H:%M:%S %z")
            except ValueError:
                skipped["Invalid timestamp"] += 1
                continue
            if timestamp.date().isoformat() != date:
                continue
            request = match["request"].split()
            if len(request) < 2 or request[0] not in {"GET", "HEAD"}:
                continue
            if BOT.search(match["agent"]):
                skipped["Likely automation"] += 1
                continue
            url = urlsplit(request[1])
            path = url.path or "/"
            if STATIC.search(path) or path in {"/", ""} and request[0] == "HEAD":
                # HEAD is often monitoring; avoid double-counting the homepage.
                if STATIC.search(path):
                    skipped["Static asset"] += 1
                else:
                    skipped["HEAD homepage"] += 1
                continue
            if request[0] == "HEAD":
                continue
            code = int(match["status"])
            statuses[f"{code // 100}xx"] += 1
            if code >= 400:
                continue
            pages[path] += 1
            source = category(match["referrer"])
            if source != "Internal":
                sources[source] += 1
    return {
        "date": date, "basis": "Nginx GET requests; not unique visitors or SPA navigation",
        "page_requests": sum(pages.values()),
        "pages": dict(pages.most_common(30)),
        "acquisition_requests": dict(sources.most_common()),
        "status_counts": dict(statuses),
        "excluded_requests": dict(skipped),
        "limitations": [
            "No visitor identity, distinct user, session or client-IP metrics.",
            "SPA page transitions and product-click activity are not visible in server access logs.",
            "Bot filtering is approximate; browser caching/ad blockers can change counts.",
            "Use a dedicated site log; shared Nginx access logs may contain other applications.",
            "Date follows the timezone recorded by Nginx access-log timestamps.",
        ],
    }


def render(report: dict) -> str:
    def rows(data):
        return "".join(
            "<tr><td>" + html.escape(str(k)) + "</td><td>" +
            str(v) + "</td></tr>" for k, v in data.items()
        ) or '<tr><td colspan="2">No matching activity</td></tr>'
    return (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="robots" content="noindex,nofollow">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>Private VTAB Square traffic brief</title>'
        '<style>body{font:16px system-ui;max-width:840px;margin:40px auto;'
        'padding:0 20px;color:#172235}table{border-collapse:collapse;width:100%}'
        'td,th{padding:10px;border-bottom:1px solid #dae2ec;text-align:left}'
        'section{margin:30px 0}small{color:#586777}</style></head><body>'
        '<h1>VTAB Square — daily website traffic brief</h1>'
        '<p>Date: ' + html.escape(report["date"]) + '</p>'
        '<h2>' + str(report["page_requests"]) + ' page requests</h2>'
        '<small>Not unique visitors. No personal identities or IPs are included.</small>'
        '<section><h2>Requested pages</h2><table><tr><th>Page path</th>'
        '<th>Requests</th></tr>' + rows(report["pages"]) + '</table></section>'
        '<section><h2>External acquisition</h2><table><tr><th>Source</th>'
        '<th>Requests</th></tr>' + rows(report["acquisition_requests"]) + '</table></section>'
        '<section><h2>HTTP status totals</h2><table><tr><th>Status group</th>'
        '<th>Requests</th></tr>' + rows(report["status_counts"]) + '</table></section>'
        '<section><h2>Reporting limitations</h2><ul>' +
        "".join("<li>" + html.escape(item) + "</li>" for item in report["limitations"]) +
        '</ul></section></body></html>'
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--log", type=Path, required=True,
                        help="Dedicated company website Nginx combined-format access log")
    parser.add_argument("--date", default=(dt.datetime.now(dt.timezone.utc).date() - dt.timedelta(days=1)).isoformat(),
                        help="Date YYYY-MM-DD in Nginx timestamp timezone; default yesterday UTC")
    parser.add_argument("--output", type=Path, required=True,
                        help="Private report folder OUTSIDE the publicly served website")
    args = parser.parse_args()
    dt.date.fromisoformat(args.date)
    if not args.log.is_file():
        parser.error("The specified Nginx access log does not exist.")
    if "dist" in args.output.resolve().parts or str(args.output.resolve()).startswith("/var/www/"):
        parser.error("Report output must not be under /var/www or a public dist directory.")
    old_mask = os.umask(0o077)
    try:
        args.output.mkdir(parents=True, exist_ok=True, mode=0o700)
        report = summarize(args.log, args.date)
        for ext, body in ((".json", json.dumps(report, indent=2)), (".html", render(report))):
            destination = args.output / ("vtabsquare-traffic-" + args.date + ext)
            destination.write_text(body + "\n", encoding="utf-8")
            destination.chmod(0o600)
            print("Created private report:", destination)
    finally:
        os.umask(old_mask)


if __name__ == "__main__":
    main()
