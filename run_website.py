"""One-click local launcher for the VTab Square website.

Double-click RUN_WEBSITE.bat on Windows, or run:
    python run_website.py

The launcher installs dependencies when needed, creates a local .env file from
.env.example when needed, builds the production site, starts a local preview,
and opens it in the default browser.
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path
import shutil
import socket
import subprocess
import sys
import time
from urllib.error import URLError
from urllib.request import urlopen
import webbrowser


PROJECT_DIR = Path(__file__).resolve().parent
DEFAULT_PORT = 4173
TEST_ROUTES = (
    "/",
    "/careers",
    "/architecture/ai-reporting-platform",
)


def pause_on_error(message: str) -> None:
    print(f"\nERROR: {message}", file=sys.stderr)
    if os.name == "nt" and sys.stdin.isatty():
        input("\nPress Enter to close...")


def find_npm() -> str:
    candidates = ("npm.cmd", "npm") if os.name == "nt" else ("npm",)
    for candidate in candidates:
        path = shutil.which(candidate)
        if path:
            return path
    raise RuntimeError(
        "Node.js was not found. Install the Node.js LTS version from "
        "https://nodejs.org/ and then run this launcher again."
    )


def find_node() -> str:
    path = shutil.which("node.exe" if os.name == "nt" else "node")
    if path:
        return path
    raise RuntimeError(
        "Node.js was not found. Install the Node.js LTS version from "
        "https://nodejs.org/ and then run this launcher again."
    )


def run_step(command: list[str], label: str) -> None:
    print(f"\n[{label}]")
    result = subprocess.run(command, cwd=PROJECT_DIR, check=False)
    if result.returncode != 0:
        raise RuntimeError(f"{label} failed with exit code {result.returncode}.")


def prepare_environment() -> None:
    env_file = PROJECT_DIR / ".env"
    example_file = PROJECT_DIR / ".env.example"
    if not env_file.exists() and example_file.exists():
        shutil.copy2(example_file, env_file)
        print("Created .env from .env.example.")
        print("The site will open, but online forms require your real service values in .env.")


def find_available_port(preferred_port: int) -> int:
    for port in range(preferred_port, preferred_port + 20):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            try:
                sock.bind(("127.0.0.1", port))
            except OSError:
                continue
            return port
    raise RuntimeError("No available local port was found. Close other local servers and retry.")


def wait_for_site(base_url: str, timeout_seconds: int = 60) -> None:
    deadline = time.time() + timeout_seconds
    last_error: Exception | None = None
    while time.time() < deadline:
        try:
            with urlopen(base_url, timeout=3) as response:
                if response.status == 200:
                    return
        except (URLError, OSError) as error:
            last_error = error
        time.sleep(0.5)
    raise RuntimeError(f"The local website did not start in time. Last error: {last_error}")


def verify_routes(base_url: str) -> None:
    print("\n[Checking website pages]")
    for route in TEST_ROUTES:
        url = f"{base_url}{route}"
        with urlopen(url, timeout=10) as response:
            content = response.read().decode("utf-8", errors="replace")
            if response.status != 200 or 'id="root"' not in content:
                raise RuntimeError(f"Page check failed: {url}")
            print(f"OK  {url}")


def stop_process(process: subprocess.Popen[bytes]) -> None:
    if process.poll() is not None:
        return
    if os.name == "nt":
        # npm starts the preview server as a child process on Windows. Stop the
        # complete launcher-owned process tree so no hidden server is left open.
        subprocess.run(
            ["taskkill", "/PID", str(process.pid), "/T", "/F"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
        try:
            process.wait(timeout=8)
        except subprocess.TimeoutExpired:
            process.kill()
        return
    process.terminate()
    try:
        process.wait(timeout=8)
    except subprocess.TimeoutExpired:
        process.kill()
        process.wait(timeout=5)


def launch(check_only: bool, requested_port: int) -> int:
    if not (PROJECT_DIR / "package.json").exists():
        raise RuntimeError("package.json is missing. Keep this script inside the website project folder.")

    npm = find_npm()
    node = find_node()
    prepare_environment()

    if not (PROJECT_DIR / "node_modules").exists():
        run_step([npm, "install"], "Installing website dependencies")
    else:
        print("Website dependencies are already installed.")

    run_step([npm, "run", "build"], "Building the production website")

    port = find_available_port(requested_port)
    base_url = f"http://127.0.0.1:{port}"
    vite_script = PROJECT_DIR / "node_modules" / "vite" / "bin" / "vite.js"
    if not vite_script.exists():
        raise RuntimeError("The local website preview tool is missing. Delete node_modules and run again.")

    command = [
        node,
        str(vite_script),
        "preview",
        "--configLoader",
        "runner",
        "--host",
        "127.0.0.1",
        "--port",
        str(port),
        "--strictPort",
    ]

    print(f"\n[Starting website at {base_url}]")
    process = subprocess.Popen(command, cwd=PROJECT_DIR)
    try:
        wait_for_site(base_url)
        verify_routes(base_url)

        if check_only:
            print("\nAll one-click launcher tests passed.")
            return 0

        print("\nThe website is ready. Opening it in your browser...")
        print("Keep this window open while using the website.")
        print("Press Ctrl+C here when you want to stop it.\n")
        webbrowser.open(base_url)
        return process.wait()
    except KeyboardInterrupt:
        print("\nStopping the local website...")
        return 0
    finally:
        stop_process(process)


def main() -> int:
    parser = argparse.ArgumentParser(description="Build and run the VTab Square website locally.")
    parser.add_argument("--check", action="store_true", help="Run automated page checks, then stop.")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="Preferred local port.")
    args = parser.parse_args()

    try:
        return launch(check_only=args.check, requested_port=args.port)
    except Exception as error:
        pause_on_error(str(error))
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
