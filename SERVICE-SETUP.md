# Discord Music Bot - Windows Service Setup

## Overview
This Discord music bot is now configured to run on Windows VPS with Lavalink as a Windows service that automatically starts on boot.

## Service Configuration

### Lavalink Service
- **Service Name**: LavalinkService
- **Display Name**: Lavalink Music Server
- **Description**: Lavalink Audio Server for Discord Music Bot
- **Auto-start**: Enabled (starts automatically on boot)
- **Port**: 2333
- **Password**: oggy123
- **Memory**: 6GB allocated (-Xmx6G)

### Service Management Commands
```bat
# Check service status
nssm status LavalinkService

# Start service
nssm start LavalinkService

# Stop service  
nssm stop LavalinkService

# Restart service
nssm restart LavalinkService

# View service configuration
nssm get LavalinkService

# Remove service (if needed)
nssm remove LavalinkService
```

### Windows Services Panel
You can also manage the service through Windows Services:
1. Press `Windows + R`, type `services.msc`
2. Look for "Lavalink Music Server"
3. Right-click for Start/Stop/Restart options

## Quick Start Scripts

### start-simple.bat
- Checks if Lavalink service is running
- Starts Lavalink service if needed
- Launches Discord bot in a new window
- Provides service management information

### stop-simple.bat  
- Stops Discord bot processes
- Shows Lavalink service status
- Provides commands for service management
- Note: Lavalink service continues running in background

## File Locations

### Lavalink Server
- **Location**: `C:\Lavalink\`
- **JAR File**: `C:\Lavalink\Lavalink.jar`
- **Config**: `C:\Lavalink\application.yaml`
- **Service Logs**: `C:\Lavalink\logs\service-stdout.log` and `C:\Lavalink\logs\service-stderr.log`

### Discord Bot
- **Location**: `C:\Users\Administrator\Documents\GitHub\panel\`
- **Main File**: `src\index.ts`
- **Config**: `.env`
- **Logs**: `logs\` directory

## Environment Configuration
All configuration is stored in `.env` file:
- `DISCORD_BOT_TOKEN`: Bot authentication token
- `DATABASE_URL`: PostgreSQL connection string
- `LAVALINK_SERVER_PASSWORD`: Lavalink authentication (oggy123)
- `PREFIX`: Command prefix (.)

## Database
- **Type**: PostgreSQL 17.5
- **Database**: shiroko-multi-music-bot
- **User**: postgres
- **Password**: oggy123

## Boot Behavior
- **Lavalink**: Automatically starts as Windows service on boot
- **Discord Bot**: Must be started manually using start-simple.bat

## Troubleshooting

### Check if Lavalink is running
```bat
nssm status LavalinkService
Test-NetConnection -ComputerName localhost -Port 2333
```

### View Lavalink logs
```bat
type "C:\Lavalink\logs\service-stdout.log"
type "C:\Lavalink\logs\service-stderr.log"
```

### Restart services
```bat
nssm restart LavalinkService
```

### Check Windows service status
```powershell
Get-Service -Name "LavalinkService"
```

## Advantages of This Setup
1. **Auto-start**: Lavalink starts automatically on server boot
2. **Service Management**: Professional Windows service integration
3. **Persistence**: Lavalink runs continuously in background
4. **Logging**: Dedicated service logs for troubleshooting
5. **Resource Management**: Proper memory allocation and monitoring
6. **Reliability**: Service automatically restarts on failure

## Notes
- Lavalink service runs continuously and uses system resources
- Discord bot must be started manually each time
- Both services can run simultaneously without conflicts
- NSSM (Non-Sucking Service Manager) is used for service management
