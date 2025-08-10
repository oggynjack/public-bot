@echo off
echo Testing Discord Bot Token...
echo.

if "%1"=="" (
    echo Usage: test-token.bat "YOUR_BOT_TOKEN"
    echo Example: test-token.bat "MTE1234567890.ABCDEF.xyz123"
    pause
    exit /b 1
)

set "BOT_TOKEN=%~1"

echo Testing token: %BOT_TOKEN:~0,20%...
echo.

curl -H "Authorization: Bot %BOT_TOKEN%" https://discord.com/api/v10/users/@me

echo.
echo.
echo If you see JSON with bot info above, token is valid.
echo If you see 401 Unauthorized, token is invalid - regenerate it in Discord Developer Portal.
echo.
pause
