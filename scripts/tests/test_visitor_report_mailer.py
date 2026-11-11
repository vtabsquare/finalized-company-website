import importlib.util
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "visitor_report_mailer.py"
spec = importlib.util.spec_from_file_location("mailer", SCRIPT)
mailer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mailer)


class MailerTests(unittest.TestCase):
    def test_report_date_in_india(self):
        import datetime as dt
        self.assertEqual(
            mailer.report_date(dt.datetime(2026, 9, 22, 3, 30, tzinfo=dt.timezone.utc)),
            "2026-09-21",
        )

    def test_message_addresses_and_attachment(self):
        payload = mailer.message("2026-09-21", b"<html>VTAB Square</html>", is_test=True)
        msg = payload["message"]
        self.assertIn("TEST", msg["subject"])
        self.assertEqual(msg["toRecipients"][0]["emailAddress"]["address"], "Information@vtabsquare.com")
        self.assertEqual(msg["ccRecipients"][0]["emailAddress"]["address"], "vitabsquare@gmail.com")
        self.assertEqual(msg["attachments"][0]["name"], "vtabsquare-traffic-2026-09-21.html")

    def test_report_only_private_and_expected(self):
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            file = directory / "vtabsquare-traffic-2026-09-21.html"
            file.write_text("<html>VTAB Square visitor brief</html>", encoding="utf-8")
            selected, content = mailer.safe_report(directory, "2026-09-21")
            self.assertEqual(selected, file)
            self.assertIn(b"VTAB Square", content)
            with self.assertRaises(ValueError):
                mailer.safe_report(directory, "2026-09-20")
            file.unlink()
            file.symlink_to(directory / "elsewhere")
            with self.assertRaises(ValueError):
                mailer.safe_report(directory, "2026-09-21")


if __name__ == "__main__":
    unittest.main()
