@echo off
echo Stopping Lavalink service...

REM Stop Lavalink processes
taskkill /F /IM java.exe /FI "COMMANDLINE eq *Lavalink.jar*" 2>nul
pm2 stop lavalink-server 2>nul
pm2 delete lavalink-server 2>nul

echo Lavalink stopped
pause
