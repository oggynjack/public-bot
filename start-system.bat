@echo off
title PremiumPlus Music Bot System - Startup

echo 🎵 Starting PremiumPlus Music Bot System...
echo.

echo ============================================
echo 🚀 PremiumPlus Music Bot System Initialization
echo ============================================
echo.

echo [INFO] Checking system prerequisites...

:: Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo [SUCCESS] Node.js detected: 
node --version

:: Check PM2
pm2 --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] PM2 not found. Installing PM2...
    npm install -g pm2
    if errorlevel 1 (
        echo [ERROR] Failed to install PM2
        pause
        exit /b 1
    )
    echo [SUCCESS] PM2 installed successfully
) else (
    echo [SUCCESS] PM2 available
)

echo.
echo [INFO] Setting up environment...

:: Check main .env file
if not exist ".env" (
    if exist ".env.example" (
        echo [INFO] Creating .env from template...
        copy .env.example .env
        echo [WARNING] Please configure the .env file before running the system
        echo [WARNING] Important variables: DATABASE_URL, REDIS_URL, BOT_TOKEN
    ) else (
        echo [ERROR] .env.example file not found
        pause
        exit /b 1
    )
) else (
    echo [SUCCESS] Main .env file exists
)

:: Install main dependencies
echo [INFO] Installing main project dependencies...
if exist "bun.lock" (
    if where bun >nul 2>&1 (
        bun install
    ) else (
        npm install
    )
) else (
    npm install
)

if errorlevel 1 (
    echo [ERROR] Failed to install main dependencies
    pause
    exit /b 1
)

echo [SUCCESS] Main dependencies installed

:: Setup dashboard
if exist "dashboard" (
    echo [INFO] Setting up dashboard...
    cd dashboard
    
    if not exist ".env" (
        if exist ".env.example" (
            echo [INFO] Creating dashboard .env from template...
            copy .env.example .env
            echo [WARNING] Please configure the dashboard/.env file
        ) else (
            echo [WARNING] Dashboard .env.example not found
        )
    ) else (
        echo [SUCCESS] Dashboard .env file exists
    )
    
    echo [INFO] Installing dashboard dependencies...
    npm install
    
    if errorlevel 1 (
        echo [ERROR] Failed to install dashboard dependencies
        cd ..
        pause
        exit /b 1
    )
    
    echo [SUCCESS] Dashboard dependencies installed
    
    if not exist "logs" (
        mkdir logs
        echo [SUCCESS] Dashboard logs directory created
    )
    
    cd ..
) else (
    echo [WARNING] Dashboard directory not found, skipping dashboard setup
)

:: Database migration
echo [INFO] Running database migrations...
if exist "bun.lock" (
    if where bun >nul 2>&1 (
        bun x prisma db push --accept-data-loss
    ) else (
        npx prisma db push --accept-data-loss
    )
) else (
    npx prisma db push --accept-data-loss
)

if errorlevel 1 (
    echo [WARNING] Database migration failed ^(may need manual intervention^)
) else (
    echo [SUCCESS] Database migrations completed
)

:: Generate Prisma client
echo [INFO] Generating Prisma client...
if exist "bun.lock" (
    if where bun >nul 2>&1 (
        bun x prisma generate
    ) else (
        npx prisma generate
    )
) else (
    npx prisma generate
)

echo.
echo ===============================
echo 🚀 Starting Services with PM2
echo ===============================
echo.

:: Stop any existing processes
echo [INFO] Stopping existing processes...
pm2 stop ecosystem.config.cjs 2>nul
pm2 stop dashboard/ecosystem.config.js 2>nul

:: Start main music bot
echo [INFO] Starting music bot backend...
pm2 start ecosystem.config.cjs

if errorlevel 1 (
    echo [ERROR] Failed to start music bot backend
) else (
    echo [SUCCESS] Music bot backend started
)

:: Start dashboard
if exist "dashboard\ecosystem.config.js" (
    echo [INFO] Starting dashboard frontend...
    cd dashboard
    pm2 start ecosystem.config.js
    cd ..
    
    if errorlevel 1 (
        echo [ERROR] Failed to start dashboard frontend
    ) else (
        echo [SUCCESS] Dashboard frontend started
    )
) else if exist "dashboard\server.js" (
    echo [INFO] Starting dashboard with basic PM2 config...
    pm2 start dashboard/server.js --name "premiumplus-dashboard" --interpreter node
    
    if errorlevel 1 (
        echo [ERROR] Failed to start dashboard
    ) else (
        echo [SUCCESS] Dashboard started with basic config
    )
) else (
    echo [WARNING] Dashboard not found or not configured
)

:: Save PM2 configuration
pm2 save
pm2 startup

echo.
echo ==================
echo 📊 System Status
echo ==================
echo.

pm2 list

echo.
echo =======================
echo 🔗 Access Information
echo =======================
echo.

echo Music Bot:
echo   - Bot should now be online in Discord
echo   - Check PM2 logs: pm2 logs multi-discord-bot-music
echo.

if exist "dashboard\server.js" (
    echo Dashboard:
    echo   - Web Interface: https://bot.nav-code.com:3000
    echo   - Local Interface: https://localhost:3000
    echo   - Check PM2 logs: pm2 logs premiumplus-dashboard
    echo.
)

echo Management:
echo   - View all processes: pm2 list
echo   - Monitor processes: pm2 monit
echo   - View logs: pm2 logs [process-name]
echo   - Restart services: pm2 restart all
echo   - Stop services: pm2 stop all

echo.
echo ====================
echo ⚠️  Important Notes
echo ====================
echo.

echo Configuration:
echo   - Ensure your .env files are properly configured
echo   - Set up Discord bot token and application ID
echo   - Configure database and Redis connections
echo   - Set up SSL certificates for HTTPS ^(dashboard^)

echo.
echo Security:
echo   - Change default secrets and keys in production
echo   - Use strong passwords for database and Redis
echo   - Keep your bot token secure and never share it

echo.
echo Support:
echo   - Documentation: Check README files in each directory
echo   - Logs: Use 'pm2 logs' to troubleshoot issues
echo   - Issues: Check GitHub repository for known issues

echo.
echo [SUCCESS] 🎉 PremiumPlus Music Bot System is now running!
echo [INFO] Use 'pm2 monit' to monitor your processes in real-time.

echo.
echo Final system check...
timeout /t 3 /nobreak >nul
pm2 list

echo.
echo Press any key to continue...
pause >nul
