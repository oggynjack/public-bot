@echo off
echo ========================================
echo  Installing Lavalink as Windows Service
echo ========================================
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must be run as Administrator
    echo Right-click this file and select "Run as administrator"
    pause
    exit /b 1
)

echo [1/4] Downloading NSSM (Non-Sucking Service Manager)...
powershell -Command "Invoke-WebRequest -Uri 'https://nssm.cc/release/nssm-2.24.zip' -OutFile 'C:\Lavalink\nssm.zip'"
if %errorLevel% neq 0 (
    echo ERROR: Failed to download NSSM
    echo Please download manually from: https://nssm.cc/release/nssm-2.24.zip
    pause
    exit /b 1
)

echo [2/4] Extracting NSSM...
powershell -Command "Expand-Archive -Path 'C:\Lavalink\nssm.zip' -DestinationPath 'C:\Lavalink\' -Force"
move "C:\Lavalink\nssm-2.24\win64\nssm.exe" "C:\Lavalink\nssm.exe"
rmdir /s /q "C:\Lavalink\nssm-2.24"
del "C:\Lavalink\nssm.zip"

echo [3/4] Creating Lavalink Windows Service...
cd /d "C:\Lavalink"

REM Remove existing service if it exists
C:\Lavalink\nssm.exe remove LavalinkService confirm >nul 2>&1

REM Install the service
C:\Lavalink\nssm.exe install LavalinkService "java" "-Xmx1G -jar C:\Lavalink\Lavalink-v3.jar"
if %errorLevel% neq 0 (
    echo ERROR: Failed to install service
    pause
    exit /b 1
)

REM Configure the service
C:\Lavalink\nssm.exe set LavalinkService AppDirectory "C:\Lavalink"
C:\Lavalink\nssm.exe set LavalinkService DisplayName "Lavalink Music Server"
C:\Lavalink\nssm.exe set LavalinkService Description "Lavalink audio streaming server for Discord music bots"
C:\Lavalink\nssm.exe set LavalinkService Start SERVICE_AUTO_START
C:\Lavalink\nssm.exe set LavalinkService ObjectName "LocalSystem"
C:\Lavalink\nssm.exe set LavalinkService Type SERVICE_WIN32_OWN_PROCESS

REM Set logging
C:\Lavalink\nssm.exe set LavalinkService AppStdout "C:\Lavalink\logs\service-output.log"
C:\Lavalink\nssm.exe set LavalinkService AppStderr "C:\Lavalink\logs\service-error.log"

REM Set restart options
C:\Lavalink\nssm.exe set LavalinkService AppThrottle 1500
C:\Lavalink\nssm.exe set LavalinkService AppExit Default Restart
C:\Lavalink\nssm.exe set LavalinkService AppRestartDelay 0

echo [4/4] Starting Lavalink Service...
C:\Lavalink\nssm.exe start LavalinkService
if %errorLevel% neq 0 (
    echo ERROR: Failed to start service
    echo Check logs at: C:\Lavalink\logs\
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Lavalink Service Installed Successfully!
echo ========================================
echo.
echo Service Name: LavalinkService
echo Status: Running in background
echo Auto-start: Enabled (starts with Windows)
echo.
echo Configuration: C:\Lavalink\application.yml
echo Logs: C:\Lavalink\logs\
echo.
echo Management Commands:
echo - Start:   sc start LavalinkService
echo - Stop:    sc stop LavalinkService  
echo - Status:  sc query LavalinkService
echo - Remove:  C:\Lavalink\nssm.exe remove LavalinkService confirm
echo.
echo Lavalink is now running on: http://localhost:2333
echo Password: youshallnotpass
echo.
pause
