@echo off
title VTab Square Website Launcher
cd /d "%~dp0"

where py >nul 2>nul
if %errorlevel%==0 (
  py -3 run_website.py
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    python run_website.py
  ) else (
    echo.
    echo Python was not found.
    echo Install Python 3 from https://www.python.org/downloads/
    echo During installation, select "Add Python to PATH".
    echo.
    pause
  )
)
