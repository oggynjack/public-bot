@echo off
echo 🎵 Setting up PremiumPlus Music Bot Dashboard...

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo [SUCCESS] Node.js detected: 
node --version

:: Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm first.
    exit /b 1
)

echo [INFO] Installing dashboard dependencies...
npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)

echo [SUCCESS] Dependencies installed successfully

:: Create .env file if it doesn't exist
if not exist ".env" (
    echo [INFO] Creating .env file from template...
    copy .env.example .env
    echo [WARNING] Please edit the .env file with your configuration before starting the dashboard
) else (
    echo [SUCCESS] .env file already exists
)

:: Create logs directory
if not exist "logs" (
    echo [INFO] Creating logs directory...
    mkdir logs
    echo [SUCCESS] Logs directory created
)

:: Check if SSL certificates exist
if not exist "..\ssl\certificate.crt" (
    echo [WARNING] SSL certificate not found in ..\ssl\ directory
)
if not exist "..\ssl\private.key" (
    echo [WARNING] SSL private key not found in ..\ssl\ directory
)

:: Create PM2 ecosystem file if it doesn't exist
if not exist "ecosystem.config.js" (
    echo [INFO] Creating PM2 ecosystem configuration...
    (
    echo module.exports = {
    echo   apps: [{
    echo     name: 'premiumplus-dashboard',
    echo     script: 'server.js',
    echo     instances: 1,
    echo     exec_mode: 'cluster',
    echo     autorestart: true,
    echo     watch: false,
    echo     max_memory_restart: '1G',
    echo     env: {
    echo       NODE_ENV: 'production',
    echo       PORT: 3000
    echo     },
    echo     log_file: 'logs/dashboard.log',
    echo     error_file: 'logs/dashboard-error.log',
    echo     out_file: 'logs/dashboard-out.log',
    echo     merge_logs: true,
    echo     log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    echo   }]
    echo };
    ) > ecosystem.config.js
    echo [SUCCESS] PM2 ecosystem file created
)

echo.
echo [SUCCESS] Dashboard setup completed!
echo.
echo Next steps:
echo 1. Edit the .env file with your configuration
echo 2. Ensure your SSL certificates are in the ..\ssl\ directory
echo 3. Make sure PostgreSQL and Redis are running
echo 4. Start the dashboard with: npm start
echo    Or for development: npm run dev
echo    Or with PM2: pm2 start ecosystem.config.js
echo.
echo The dashboard will be available at: https://bot.nav-code.com:3000
echo.
echo Don't forget to:
echo - Configure your Discord OAuth2 application
echo - Set up your Stripe keys for payments
echo - Configure your SMTP settings for emails

pause
