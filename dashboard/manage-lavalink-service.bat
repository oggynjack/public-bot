@echo off
echo ========================================
echo  Lavalink Service Management
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

:menu
echo Choose an option:
echo [1] Start Lavalink Service
echo [2] Stop Lavalink Service  
echo [3] Restart Lavalink Service
echo [4] Check Service Status
echo [5] View Service Logs
echo [6] Remove Service (Uninstall)
echo [7] Exit
echo.
set /p choice=Enter your choice (1-7): 

if "%choice%"=="1" goto start
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto restart
if "%choice%"=="4" goto status
if "%choice%"=="5" goto logs
if "%choice%"=="6" goto remove
if "%choice%"=="7" goto exit
echo Invalid choice. Please try again.
goto menu

:start
echo Starting Lavalink Service...
sc start LavalinkService
goto menu

:stop  
echo Stopping Lavalink Service...
sc stop LavalinkService
goto menu

:restart
echo Restarting Lavalink Service...
sc stop LavalinkService
timeout /t 3
sc start LavalinkService
goto menu

:status
echo Checking Lavalink Service Status...
sc query LavalinkService
echo.
echo Testing connection to http://localhost:2333...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:2333/version' -TimeoutSec 5; Write-Host 'Lavalink is responding: HTTP' $response.StatusCode } catch { Write-Host 'Lavalink is not responding or not started' }"
goto menu

:logs
echo Recent Service Logs:
echo.
echo === Output Log ===
type "C:\Lavalink\logs\service-output.log" 2>nul | more
echo.
echo === Error Log ===  
type "C:\Lavalink\logs\service-error.log" 2>nul | more
echo.
echo === Lavalink App Logs ===
type "C:\Lavalink\logs\spring.log" 2>nul | more
goto menu

:remove
echo WARNING: This will completely remove the Lavalink service!
set /p confirm=Are you sure? (y/N): 
if /i not "%confirm%"=="y" goto menu
echo Removing Lavalink Service...
sc stop LavalinkService 2>nul
C:\Lavalink\nssm.exe remove LavalinkService confirm
echo Service removed.
goto menu

:exit
echo Goodbye!
pause
exit
