# 🎵 Lavalink v4 + Java 17 Setup Guide

## ✅ Java Version Required

**Download: Eclipse Temurin JDK 17 LTS - Windows x64 OFFLINE**

📥 **Direct Download Link**: https://adoptium.net/temurin/releases/?version=17

**Choose this specific version:**
- **Package**: Windows x64 (**offline installer**)  
- **File size**: ~200MB (full offline installer)
- **File name**: `OpenJDK17U-jdk_x64_windows_hotspot_17.0.12_7.msi`

### Why Offline x64?
- ✅ **Offline**: Complete installer, no internet required during install
- ✅ **x64**: 64-bit architecture (matches your system)
- ✅ **Full package**: Includes all necessary components
- ❌ **Avoid online installer**: Smaller but downloads during install
- ❌ **Avoid x86**: 32-bit version won't work properly

## 🛠️ Installation Steps

### 1. Install Java 17
1. Download the **Windows x64 offline** installer
2. Run as Administrator
3. **Important**: Check these options during installation:
   - ✅ "Set JAVA_HOME variable"
   - ✅ "Add to PATH" 
   - ✅ "Associate .jar files"

### 2. Verify Installation
Open **new** Command Prompt and run:
```cmd
java -version
```
Should show: `openjdk version "17.0.x"`

### 3. Install Lavalink v4 Service
Run as Administrator:
```cmd
install-lavalink-v4-service.bat
```

## 🎯 What This Setup Provides

### Lavalink v4.0.8 Features:
- ✅ **YouTube Plugin**: Better YouTube support than internal
- ✅ **LavaSrc Plugin**: Enhanced search capabilities  
- ✅ **Windows Service**: Runs in background, starts on boot
- ✅ **Auto-restart**: Restarts if crashed
- ✅ **Proper logging**: Detailed logs in `C:\Lavalink\logs\`

### Service Configuration:
- **Name**: LavalinkService
- **Display**: "Lavalink v4 Music Server" 
- **Auto-start**: Yes (starts with Windows)
- **User**: LocalSystem (secure background service)
- **Memory**: 1GB allocated
- **Connection**: http://localhost:2333
- **Password**: youshallnotpass

## 🎵 Music Bot Integration

Your Discord music bot will connect to:
```javascript
// Bot connection settings
host: "127.0.0.1" or "localhost"
port: 2333
password: "youshallnotpass"
secure: false
```

## 🔧 Service Management

```cmd
# Check status
sc query LavalinkService
Get-Service LavalinkService

# Start service
sc start LavalinkService  
net start LavalinkService

# Stop service
sc stop LavalinkService
net stop LavalinkService

# View logs
type C:\Lavalink\logs\lavalink-output.log
type C:\Lavalink\logs\lavalink-error.log

# Test connection
curl http://localhost:2333/version
```

## 🚀 Ready to Use

Once Java 17 is installed and the service is running:

1. ✅ Lavalink runs automatically in background
2. ✅ No visible windows or terminals  
3. ✅ Starts with Windows boot
4. ✅ Your music bot connects seamlessly
5. ✅ YouTube streaming works perfectly
6. ✅ All audio sources supported

**This is the exact same setup that was working before!**
