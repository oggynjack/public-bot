@echo off
echo ========================================
echo  Installing Lavalink v4 + Java 17 Service
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

echo [1/5] Downloading and Installing Java 17...
echo.
echo IMPORTANT: Install Java 17 first!
echo.
echo Download: Eclipse Temurin JDK 17 LTS
echo URL: https://adoptium.net/temurin/releases/?version=17
echo.
echo Choose: Windows x64 (offline installer - about 200MB)
echo This is the OFFLINE X64 version you need!
echo.
echo During installation:
echo - Check "Set JAVA_HOME variable"
echo - Check "Add to PATH"
echo - Check "Associate .jar files"
echo.
pause

echo [2/5] Verifying Java 17 installation...
java -version 2>&1 | findstr "17" >nul
if %errorLevel% neq 0 (
    echo ERROR: Java 17 not found or not in PATH
    echo Please install Java 17 first and restart this script
    echo Download from: https://adoptium.net/temurin/releases/?version=17
    pause
    exit /b 1
)
echo Java 17 verified!

echo [3/5] Setting up NSSM for Windows Service...
if not exist "C:\Lavalink\nssm.exe" (
    echo Downloading NSSM...
    powershell -Command "Invoke-WebRequest -Uri 'https://nssm.cc/release/nssm-2.24.zip' -OutFile 'C:\Lavalink\nssm.zip'"
    powershell -Command "Expand-Archive -Path 'C:\Lavalink\nssm.zip' -DestinationPath 'C:\Lavalink\' -Force"
    move "C:\Lavalink\nssm-2.24\win64\nssm.exe" "C:\Lavalink\nssm.exe"
    rmdir /s /q "C:\Lavalink\nssm-2.24"
    del "C:\Lavalink\nssm.zip"
)

echo [4/5] Creating Lavalink v4 Windows Service...
cd /d "C:\Lavalink"

REM Remove existing service if it exists
C:\Lavalink\nssm.exe remove LavalinkService confirm >nul 2>&1

REM Install the service with proper Java 17 settings
C:\Lavalink\nssm.exe install LavalinkService "java" "-Xmx1G -Djava.awt.headless=true --add-opens java.base/java.io=ALL-UNNAMED -jar C:\Lavalink\Lavalink.jar"

REM Configure the service
C:\Lavalink\nssm.exe set LavalinkService AppDirectory "C:\Lavalink"
C:\Lavalink\nssm.exe set LavalinkService DisplayName "Lavalink v4 Music Server"
C:\Lavalink\nssm.exe set LavalinkService Description "Lavalink v4.0.8 audio streaming server for Discord music bots with YouTube support"
C:\Lavalink\nssm.exe set LavalinkService Start SERVICE_AUTO_START
C:\Lavalink\nssm.exe set LavalinkService ObjectName "LocalSystem"
C:\Lavalink\nssm.exe set LavalinkService Type SERVICE_WIN32_OWN_PROCESS

REM Set environment variables
C:\Lavalink\nssm.exe set LavalinkService AppEnvironmentExtra "JAVA_OPTS=-Djava.awt.headless=true --add-opens java.base/java.io=ALL-UNNAMED"

REM Set logging
C:\Lavalink\nssm.exe set LavalinkService AppStdout "C:\Lavalink\logs\lavalink-output.log"
C:\Lavalink\nssm.exe set LavalinkService AppStderr "C:\Lavalink\logs\lavalink-error.log"

REM Set restart options
C:\Lavalink\nssm.exe set LavalinkService AppThrottle 1500
C:\Lavalink\nssm.exe set LavalinkService AppExit Default Restart
C:\Lavalink\nssm.exe set LavalinkService AppRestartDelay 5000

echo [5/5] Starting Lavalink v4 Service...
C:\Lavalink\nssm.exe start LavalinkService

echo.
echo Waiting for service to start...
timeout /t 15

echo.
echo ========================================
echo  Lavalink v4 Service Setup Complete!
echo ========================================
echo.
echo Service: LavalinkService (Lavalink v4 Music Server)
echo Status: Should be running in background
echo Auto-start: Enabled (starts with Windows)
echo Java Version: 17+ (required)
echo.
echo Connection Details:
echo - URL: http://localhost:2333
echo - Password: youshallnotpass
echo - Version: Lavalink v4.0.8
echo - Plugins: YouTube, LavaSrc
echo.
echo Logs: C:\Lavalink\logs\
echo Config: C:\Lavalink\application.yml
echo.
echo Management:
echo - Status: sc query LavalinkService
echo - Start:  sc start LavalinkService  
echo - Stop:   sc stop LavalinkService
echo - Logs:   type C:\Lavalink\logs\lavalink-output.log
echo.

REM Test the connection
echo Testing connection...
powershell -Command "try { $r = Invoke-WebRequest 'http://localhost:2333/version' -TimeoutSec 10; Write-Host 'SUCCESS: Lavalink v4 is responding!' -ForegroundColor Green } catch { Write-Host 'WARNING: Service may still be starting...' -ForegroundColor Yellow }"

echo.
echo Your music bot can now connect to Lavalink!
pause
