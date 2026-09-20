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
        self.assertEqual(report["pages"], {"/solutions": 1})
        self.assertEqual(report["acquisition_requests"], {"Google": 1})
        self.assertEqual(report["status_counts"], {"2xx": 1, "4xx": 1})
        rendered = traffic.render(report)
        self.assertNotIn("203.0.113", json.dumps(report) + rendered)
        self.assertNotIn("private@example.com", json.dumps(report) + rendered)

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
