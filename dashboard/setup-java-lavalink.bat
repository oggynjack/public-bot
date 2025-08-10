@echo off
echo ========================================
echo  PremiumPlus Java 17 + Lavalink Setup
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

echo [1/4] Installing Java 17 JDK (Eclipse Temurin)...
echo Checking if winget is available...
winget --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: winget not found. Please install Java 17 manually from:
    echo https://adoptium.net/temurin/releases/?version=17
    pause
    exit /b 1
)

echo Installing Eclipse Temurin JDK 17...
winget install --id EclipseAdoptium.Temurin.17.JDK --silent --accept-source-agreements --accept-package-agreements
if %errorLevel% neq 0 (
    echo WARNING: winget install failed, trying alternative method...
    echo Please download and install Java 17 manually from:
    echo https://adoptium.net/temurin/releases/?version=17
    pause
)

echo.
echo [2/4] Setting JAVA_HOME environment variable...
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.12.7-hotspot"
if not exist "%JAVA_HOME%" (
    for /d %%i in ("C:\Program Files\Eclipse Adoptium\jdk-17*") do set "JAVA_HOME=%%i"
)
if not exist "%JAVA_HOME%" (
    echo ERROR: Java 17 installation not found in expected location
    echo Please set JAVA_HOME manually to your Java 17 installation path
    pause
    exit /b 1
)

echo Setting JAVA_HOME to: %JAVA_HOME%
setx JAVA_HOME "%JAVA_HOME%" /M
setx PATH "%PATH%;%JAVA_HOME%\bin" /M

echo.
echo [3/4] Creating Lavalink directory and downloading jar...
if not exist "C:\Lavalink" mkdir "C:\Lavalink"

echo Downloading Lavalink 4.0.8...
powershell -Command "Invoke-WebRequest -Uri 'https://github.com/lavalink-devs/Lavalink/releases/download/4.0.8/Lavalink.jar' -OutFile 'C:\Lavalink\Lavalink.jar'"
if %errorLevel% neq 0 (
    echo ERROR: Failed to download Lavalink.jar
    echo Please download manually from:
    echo https://github.com/lavalink-devs/Lavalink/releases/download/4.0.8/Lavalink.jar
    echo And place it in C:\Lavalink\
    pause
)

echo.
echo [4/4] Creating Lavalink configuration...
(
echo server:
echo   port: 2333
echo   address: 0.0.0.0
echo.
echo lavalink:
echo   server:
echo     password: "youshallnotpass"
echo     sources:
echo       youtube: true
echo       bandcamp: true
echo       soundcloud: true
echo       twitch: true
echo       vimeo: true
echo       http: true
echo       local: false
echo     filters:
echo       volume: true
echo       equalizer: true
echo       karaoke: true
echo       timescale: true
echo       tremolo: true
echo       vibrato: true
echo       distortion: true
echo       rotation: true
echo       channelMix: true
echo       lowPass: true
echo.
echo metrics:
echo   prometheus:
echo     enabled: false
echo     endpoint: /metrics
echo.
echo sentry:
echo   dsn: ""
echo   environment: ""
echo.
echo logging:
echo   file:
echo     path: ./logs/
echo   level:
echo     lavalink: INFO
echo     root: INFO
echo.
echo   logback:
echo     rollingpolicy:
echo       max-file-size: 25MB
echo       max-history: 8
) > "C:\Lavalink\application.yml"

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Java 17 installed: %JAVA_HOME%
echo Lavalink downloaded: C:\Lavalink\Lavalink.jar
echo Configuration: C:\Lavalink\application.yml
echo.
echo IMPORTANT: 
echo 1. Close this command prompt and open a NEW one for JAVA_HOME to take effect
echo 2. Test Java installation: java -version
echo 3. Update your .env file with these settings:
echo    LAVALINK_SERVER_HOST=127.0.0.1
echo    LAVALINK_SERVER_PORT=2333
echo    LAVALINK_SERVER_PASSWORD=youshallnotpass
echo    LAVALINK_DIR=C:/Lavalink
echo    DISABLE_LAVALINK=0
echo 4. Restart your dashboard server
echo.
pause
