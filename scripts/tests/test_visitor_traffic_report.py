import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "visitor_traffic_report.py"
spec = importlib.util.spec_from_file_location("traffic", SCRIPT)
traffic = importlib.util.module_from_spec(spec)
spec.loader.exec_module(traffic)


class VisitorReportTests(unittest.TestCase):
    def test_aggregate_without_identity_or_query_strings(self):
        sample = (
            '203.0.113.3 - - [20/Sep/2026:12:00:00 +0000] '
            '"GET /solutions?email=private@example.com HTTP/1.1" 200 123 '
            '"https://www.google.com/search?q=data" "Mozilla/5.0"\n'
            '203.0.113.4 - - [20/Sep/2026:12:02:00 +0000] '
            '"GET /assets/index.js HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
            '203.0.113.4 - - [20/Sep/2026:12:02:30 +0000] '
            '"GET /src/assets/images/example.jpg HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
            '203.0.113.5 - - [20/Sep/2026:12:02:40 +0000] '
            '"GET /.env.production HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
            '203.0.113.5 - - [20/Sep/2026:12:02:50 +0000] '
            '"GET /.git/config HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
            '203.0.113.8 - - [20/Sep/2026:12:02:51 +0000] '
            '"GET /phpinfo.php HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
            '203.0.113.8 - - [20/Sep/2026:12:02:52 +0000] '
            '"GET /service-account.json HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
            '203.0.113.5 - - [20/Sep/2026:12:03:00 +0000] '
            '"GET /solutions HTTP/1.1" 200 123 "-" "Googlebot/2.1"\n'
            '203.0.113.6 - - [20/Sep/2026:12:04:00 +0000] '
            '"GET /missing HTTP/1.1" 404 123 "-" "Mozilla/5.0"\n'
            '203.0.113.7 - - [21/Sep/2026:12:00:00 +0000] '
            '"GET /contact HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
        )
        with tempfile.TemporaryDirectory() as folder:
            file = Path(folder) / "website.log"
            file.write_text(sample, encoding="utf-8")
            report = traffic.summarize(file, "2026-09-20")
        self.assertEqual(report["page_requests"], 1)
        self.assertEqual(report["excluded_requests"]["Security probe / non-page path"], 4)
        self.assertEqual(report["pages"], {"/solutions": 1})
        self.assertNotIn("/phpinfo", report["pages"])
        self.assertEqual(report["acquisition_requests"], {"Google": 1})
        self.assertEqual(report["status_counts"], {"2xx": 1})
        rendered = traffic.render(report)
        self.assertNotIn("203.0.113", json.dumps(report) + rendered)
        self.assertNotIn("private@example.com", json.dumps(report) + rendered)

    def test_only_published_sitemap_routes_counted(self):
        sample = (
            '203.0.113.3 - - [20/Sep/2026:12:00:00 +0000] '
            '"GET / HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
            '203.0.113.4 - - [20/Sep/2026:12:01:00 +0000] '
            '"GET /phpinfo HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
            '203.0.113.5 - - [20/Sep/2026:12:02:00 +0000] '
            '"GET /technology/cloud-migration HTTP/1.1" 200 123 "-" "Mozilla/5.0"\n'
        )
        with tempfile.TemporaryDirectory() as folder:
            file = Path(folder) / "site.log"
            file.write_text(sample, encoding="utf-8")
            report = traffic.summarize(file, "2026-09-20")
        self.assertEqual(report["pages"], {"/": 1})
        self.assertEqual(report["excluded_requests"]["Not a published sitemap page"], 2)

    def test_html_escape(self):
        report = {
            "date": "2026-09-20", "page_requests": 1,
            "pages": {"<script>alert(1)</script>": 1},
            "acquisition_requests": {}, "status_counts": {},
            "limitations": ["Visitors are not identifiable."],
        }
        page = traffic.render(report)
        self.assertNotIn("<script>alert(1)</script>", page)
        self.assertIn("&lt;script&gt;", page)


if __name__ == "__main__":
    unittest.main()
