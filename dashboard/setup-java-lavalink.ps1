#!/usr/bin/env pwsh
# PowerShell setup script for Java 17 + Lavalink

Write-Host "========================================"
Write-Host " PremiumPlus Java 17 + Lavalink Setup"
Write-Host "========================================"
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as administrator'" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/4] Installing Java 17 JDK (Eclipse Temurin)..." -ForegroundColor Green

# Check if winget is available
try {
    $wingetVersion = winget --version
    Write-Host "Winget version: $wingetVersion" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: winget not found. Please install Java 17 manually from:" -ForegroundColor Red
    Write-Host "https://adoptium.net/temurin/releases/?version=17" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Installing Eclipse Temurin JDK 17..." -ForegroundColor Cyan
try {
    winget install --id EclipseAdoptium.Temurin.17.JDK --silent --accept-source-agreements --accept-package-agreements
    Write-Host "Java 17 installation completed" -ForegroundColor Green
} catch {
    Write-Host "WARNING: winget install failed" -ForegroundColor Yellow
    Write-Host "Please download and install Java 17 manually from:" -ForegroundColor Yellow
    Write-Host "https://adoptium.net/temurin/releases/?version=17" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[2/4] Setting JAVA_HOME environment variable..." -ForegroundColor Green

# Find Java installation
$javaPath = "C:\Program Files\Eclipse Adoptium\jdk-17.0.12.7-hotspot"
if (-not (Test-Path $javaPath)) {
    $javaPath = Get-ChildItem "C:\Program Files\Eclipse Adoptium\" -Directory | Where-Object { $_.Name -like "jdk-17*" } | Select-Object -First 1 -ExpandProperty FullName
}

if (-not $javaPath -or -not (Test-Path $javaPath)) {
    Write-Host "ERROR: Java 17 installation not found" -ForegroundColor Red
    Write-Host "Please set JAVA_HOME manually to your Java 17 installation path" -ForegroundColor Yellow
    Read-Host "Press Enter to continue anyway"
} else {
    Write-Host "Setting JAVA_HOME to: $javaPath" -ForegroundColor Cyan
    [Environment]::SetEnvironmentVariable("JAVA_HOME", $javaPath, "Machine")
    
    # Update PATH
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
    $javaBin = Join-Path $javaPath "bin"
    if ($currentPath -notlike "*$javaBin*") {
        [Environment]::SetEnvironmentVariable("PATH", "$currentPath;$javaBin", "Machine")
        Write-Host "Added Java to PATH" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "[3/4] Creating Lavalink directory and downloading jar..." -ForegroundColor Green

if (-not (Test-Path "C:\Lavalink")) {
    New-Item -Path "C:\Lavalink" -ItemType Directory -Force | Out-Null
    Write-Host "Created C:\Lavalink directory" -ForegroundColor Cyan
}

Write-Host "Downloading Lavalink 4.0.8..." -ForegroundColor Cyan
try {
    Invoke-WebRequest -Uri "https://github.com/lavalink-devs/Lavalink/releases/download/4.0.8/Lavalink.jar" -OutFile "C:\Lavalink\Lavalink.jar"
    Write-Host "Lavalink.jar downloaded successfully" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to download Lavalink.jar" -ForegroundColor Red
    Write-Host "Please download manually from:" -ForegroundColor Yellow
    Write-Host "https://github.com/lavalink-devs/Lavalink/releases/download/4.0.8/Lavalink.jar" -ForegroundColor Yellow
    Write-Host "And place it in C:\Lavalink\" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[4/4] Creating Lavalink configuration..." -ForegroundColor Green

$lavalinkConfig = @"
server:
  port: 2333
  address: 0.0.0.0

lavalink:
  server:
    password: "youshallnotpass"
    sources:
      youtube: true
      bandcamp: true
      soundcloud: true
      twitch: true
      vimeo: true
      http: true
      local: false
    filters:
      volume: true
      equalizer: true
      karaoke: true
      timescale: true
      tremolo: true
      vibrato: true
      distortion: true
      rotation: true
      channelMix: true
      lowPass: true

metrics:
  prometheus:
    enabled: false
    endpoint: /metrics

sentry:
  dsn: ""
  environment: ""

logging:
  file:
    path: ./logs/
  level:
    lavalink: INFO
    root: INFO
  logback:
    rollingpolicy:
      max-file-size: 25MB
      max-history: 8
"@

$lavalinkConfig | Out-File -FilePath "C:\Lavalink\application.yml" -Encoding UTF8
Write-Host "Created application.yml configuration" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Java 17 installed: $javaPath" -ForegroundColor Cyan
Write-Host "Lavalink downloaded: C:\Lavalink\Lavalink.jar" -ForegroundColor Cyan
Write-Host "Configuration: C:\Lavalink\application.yml" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT:" -ForegroundColor Yellow
Write-Host "1. Close this PowerShell and open a NEW one for JAVA_HOME to take effect" -ForegroundColor White
Write-Host "2. Test Java installation: java -version" -ForegroundColor White
Write-Host "3. Update your .env file with these settings:" -ForegroundColor White
Write-Host "   LAVALINK_SERVER_HOST=127.0.0.1" -ForegroundColor Gray
Write-Host "   LAVALINK_SERVER_PORT=2333" -ForegroundColor Gray
Write-Host "   LAVALINK_SERVER_PASSWORD=youshallnotpass" -ForegroundColor Gray
Write-Host "   LAVALINK_DIR=C:/Lavalink" -ForegroundColor Gray
Write-Host "   DISABLE_LAVALINK=0" -ForegroundColor Gray
Write-Host "4. Restart your dashboard server" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to exit"
