@echo off
REM Lavalink Background Service Script
echo Starting Lavalink as Windows Service...

REM Kill any existing Lavalink processes
taskkill /F /IM java.exe /FI "WINDOWTITLE eq Lavalink*" 2>nul

REM Start Lavalink in background with no window
cd /d "C:\Lavalink"
start /B /MIN "" java -Xmx1G -Djava.awt.headless=true -jar Lavalink.jar > logs\lavalink-service.log 2>&1

echo Lavalink started in background
echo Check logs at: C:\Lavalink\logs\lavalink-service.log
echo.
echo To stop Lavalink, run: stop-lavalink.bat
pause
