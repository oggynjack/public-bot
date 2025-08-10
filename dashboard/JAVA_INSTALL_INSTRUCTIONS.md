# Java 17 Installation Instructions

Since winget is not available on your system, please install Java 17 manually:

## Method 1: Direct Download (Recommended)
1. Go to: https://adoptium.net/temurin/releases/?version=17
2. Download "Windows x64" MSI installer (Latest LTS version)
3. Run the installer
4. During installation, check these options:
   - ✅ "Set JAVA_HOME variable" 
   - ✅ "JavaSoft (Oracle) registry keys"
   - ✅ "Add to PATH"
5. Click Install

## Method 2: Oracle JDK 17
1. Go to: https://www.oracle.com/java/technologies/downloads/#java17
2. Download "Windows x64 Installer"  
3. Run and install with default settings

## Verify Installation
Open a NEW command prompt and run:
```cmd
java -version
```
Should show version 17.x.x (not 1.8)

If not working, manually set environment variables:
1. Press Windows + R, type `sysdm.cpl`, press Enter
2. Click "Environment Variables"
3. Under "System Variables":
   - New → Variable: `JAVA_HOME`, Value: `C:\Program Files\Eclipse Adoptium\jdk-17.0.12.7-hotspot` (adjust path)
   - Edit "Path" → Add: `%JAVA_HOME%\bin`
4. Click OK, restart command prompt

## Test Lavalink
After Java 17 is installed:
```cmd
cd C:\Lavalink
java -jar Lavalink.jar
```
Should start without "UnsupportedClassVersionError"

## Dashboard Setup
1. Install Java 17 (above)
2. Update your `.env` file: set `DISABLE_LAVALINK=0` 
3. Restart dashboard: `node server-simple.js`
4. Check logs for "Started Launcher" message
