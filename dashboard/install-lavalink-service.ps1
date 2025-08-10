# PowerShell script to install Lavalink as Windows Service
# Run as Administrator

Write-Host "========================================"
Write-Host " Installing Lavalink as Windows Service"
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

Write-Host "[1/4] Downloading NSSM (Non-Sucking Service Manager)..." -ForegroundColor Green
try {
    Invoke-WebRequest -Uri "https://nssm.cc/release/nssm-2.24.zip" -OutFile "C:\Lavalink\nssm.zip"
    Write-Host "NSSM downloaded successfully" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: Failed to download NSSM" -ForegroundColor Red
    Write-Host "Please download manually from: https://nssm.cc/release/nssm-2.24.zip" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[2/4] Extracting NSSM..." -ForegroundColor Green
try {
    Expand-Archive -Path "C:\Lavalink\nssm.zip" -DestinationPath "C:\Lavalink\" -Force
    Move-Item "C:\Lavalink\nssm-2.24\win64\nssm.exe" "C:\Lavalink\nssm.exe" -Force
    Remove-Item "C:\Lavalink\nssm-2.24" -Recurse -Force
    Remove-Item "C:\Lavalink\nssm.zip" -Force
    Write-Host "NSSM extracted successfully" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: Failed to extract NSSM" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[3/4] Creating Lavalink Windows Service..." -ForegroundColor Green
Set-Location "C:\Lavalink"

# Remove existing service if it exists
& "C:\Lavalink\nssm.exe" remove LavalinkService confirm 2>$null

# Install the service
& "C:\Lavalink\nssm.exe" install LavalinkService "java" "-Xmx1G -jar C:\Lavalink\Lavalink-v3.jar"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install service" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Configure the service
& "C:\Lavalink\nssm.exe" set LavalinkService AppDirectory "C:\Lavalink"
& "C:\Lavalink\nssm.exe" set LavalinkService DisplayName "Lavalink Music Server"
& "C:\Lavalink\nssm.exe" set LavalinkService Description "Lavalink audio streaming server for Discord music bots"
& "C:\Lavalink\nssm.exe" set LavalinkService Start SERVICE_AUTO_START
& "C:\Lavalink\nssm.exe" set LavalinkService ObjectName "LocalSystem"
& "C:\Lavalink\nssm.exe" set LavalinkService Type SERVICE_WIN32_OWN_PROCESS

# Set logging
& "C:\Lavalink\nssm.exe" set LavalinkService AppStdout "C:\Lavalink\logs\service-output.log"
& "C:\Lavalink\nssm.exe" set LavalinkService AppStderr "C:\Lavalink\logs\service-error.log"

# Set restart options
& "C:\Lavalink\nssm.exe" set LavalinkService AppThrottle 1500
& "C:\Lavalink\nssm.exe" set LavalinkService AppExit Default Restart
& "C:\Lavalink\nssm.exe" set LavalinkService AppRestartDelay 0

Write-Host "Service configured successfully" -ForegroundColor Cyan

Write-Host "[4/4] Starting Lavalink Service..." -ForegroundColor Green
& "C:\Lavalink\nssm.exe" start LavalinkService
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to start service" -ForegroundColor Red
    Write-Host "Check logs at: C:\Lavalink\logs\" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Lavalink Service Installed Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Service Name: LavalinkService" -ForegroundColor Cyan
Write-Host "Status: Running in background" -ForegroundColor Cyan
Write-Host "Auto-start: Enabled (starts with Windows)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration: C:\Lavalink\application.yml" -ForegroundColor Cyan
Write-Host "Logs: C:\Lavalink\logs\" -ForegroundColor Cyan
Write-Host ""
Write-Host "Management Commands:" -ForegroundColor Yellow
Write-Host "- Start:   sc start LavalinkService" -ForegroundColor White
Write-Host "- Stop:    sc stop LavalinkService" -ForegroundColor White
Write-Host "- Status:  sc query LavalinkService" -ForegroundColor White
Write-Host "- Remove:  C:\Lavalink\nssm.exe remove LavalinkService confirm" -ForegroundColor White
Write-Host ""
Write-Host "Lavalink is now running on: http://localhost:2333" -ForegroundColor Green
Write-Host "Password: youshallnotpass" -ForegroundColor Green
Write-Host ""

# Test connection
Write-Host "Testing connection..." -ForegroundColor Yellow
Start-Sleep 10
try {
    $response = Invoke-WebRequest -Uri "http://localhost:2333/version" -TimeoutSec 5
    Write-Host "✅ Lavalink is responding: HTTP $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Lavalink might still be starting up. Check logs if it doesn't respond in a few minutes." -ForegroundColor Yellow
}

Read-Host "Press Enter to exit"
