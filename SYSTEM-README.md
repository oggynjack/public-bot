# 🎵 PremiumPlus Music Bot - Complete System

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-blue.svg)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/discord.js-14.x-blue.svg)](https://discord.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.x-green.svg)](https://expressjs.com/)
[![PM2](https://img.shields.io/badge/PM2-ready-blue.svg)](https://pm2.keymetrics.io/)
[![SSL](https://img.shields.io/badge/SSL-HTTPS-green.svg)](https://letsencrypt.org/)

A comprehensive Discord music bot with premium hosting dashboard, built for professional Discord servers. Features a powerful music bot backend and a web-based management dashboard for hosting multiple bot instances.

## 🌟 System Overview

This project consists of two main components:
- **Music Bot Backend** - Advanced Discord music bot with premium features
- **Hosting Dashboard** - Web interface for bot management and premium subscriptions

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Discord Bot   │    │   Dashboard     │    │   Bot Hosting   │
│   (Music Core)  │◄──►│   (Web UI)      │◄──►│   (PM2 + Redis) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Lavalink      │    │   PostgreSQL    │    │   File System   │
│   (Audio)       │    │   (Database)    │    │   (Logs/SSL)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## ✨ Features

### 🎵 **Music Bot Features**
- **High-Quality Audio** - Lavalink-powered audio streaming
- **Multiple Sources** - YouTube, Spotify, SoundCloud, and more
- **Advanced Queue** - Unlimited queue with shuffle, loop, and autoplay
- **Audio Effects** - Bass boost, nightcore, 8D, and custom filters
- **24/7 Mode** - Stay connected to voice channels permanently
- **Playlist Management** - Save and manage unlimited playlists
- **Multi-Language** - Support for 10+ languages
- **Slash Commands** - Modern Discord slash command interface

### 🌐 **Dashboard Features**
- **Discord OAuth2** - Secure authentication system
- **Premium Management** - Subscription plans with Stripe integration
- **Bot Hosting** - Automated PM2 process management
- **Real-time Control** - Start, stop, restart bot instances
- **Settings Management** - Configure volume, 24/7 mode, autoplay
- **Bot Customization** - Change name, avatar, status, activity
- **Analytics** - Server count, user stats, uptime monitoring
- **Admin Panel** - User management, payment processing

### 🛡️ **Security & Reliability**
- **AES Encryption** - Secure bot token storage
- **Rate Limiting** - Protection against abuse
- **SSL/HTTPS** - Encrypted web traffic
- **Session Management** - Redis-powered secure sessions
- **Input Validation** - Comprehensive data validation
- **Error Handling** - Graceful error recovery

## 🚀 Quick Start

### **Option 1: One-Click Setup (Recommended)**
```bash
# Windows
start-system.bat

# Linux/macOS
chmod +x start-system.sh
./start-system.sh
```

### **Option 2: Manual Setup**
```bash
# 1. Install dependencies
bun install  # or npm install

# 2. Setup dashboard
cd dashboard
npm install
cd ..

# 3. Configure environment
cp .env.example .env
cp dashboard/.env.example dashboard/.env

# 4. Setup database
bun x prisma db push
bun x prisma generate

# 5. Start services
pm2 start ecosystem.config.cjs
pm2 start dashboard/ecosystem.config.js
```

## 📋 Prerequisites

### **System Requirements**
- **Node.js** 18+ 
- **Bun** (recommended) or npm
- **Java** 17+ (for Lavalink)
- **PM2** process manager
- **PostgreSQL** database
- **Redis** server

### **External Services**
- **Discord Application** - Bot token and OAuth2 setup
- **Lavalink Server** - Audio processing (included)
- **Stripe Account** - Payment processing (optional)
- **SSL Certificates** - For HTTPS dashboard

## ⚙️ Configuration

### **Main Bot Configuration (.env)**
```env
# Bot Configuration
BOT_TOKEN=your-discord-bot-token
BOT_APPLICATION_ID=your-bot-application-id
BOT_USER_ID=your-bot-user-id

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/musicbot
REDIS_URL=redis://localhost:6379

# Lavalink
LAVALINK_HOST=localhost
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass

# Features
ENABLE_PREMIUM_FEATURES=true
DEFAULT_LANGUAGE=EnglishUS
```

### **Dashboard Configuration (dashboard/.env)**
```env
# Server
PORT=3000
DASHBOARD_URL=https://bot.nav-code.com
SESSION_SECRET=your-session-secret

# SSL (for HTTPS)
SSL_CERT_PATH=../ssl/certificate.crt
SSL_KEY_PATH=../ssl/private.key

# Discord OAuth2
DISCORD_CLIENT_ID=your-client-id
DISCORD_CLIENT_SECRET=your-client-secret
DISCORD_REDIRECT_URI=https://bot.nav-code.com/auth/callback

# Security
ENCRYPTION_KEY=your-32-character-key
ADMIN_IDS=your-discord-id,another-admin-id

# Payments (optional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 🗂️ Project Structure

```
PremiumPlus-Music-Bot/
├── 📁 src/                    # Bot source code
│   ├── 📁 commands/           # Slash commands
│   ├── 📁 events/             # Discord events
│   ├── 📁 classes/            # Core classes
│   └── index.ts               # Bot entry point
├── 📁 dashboard/              # Web dashboard
│   ├── 📁 routes/             # Express routes
│   ├── 📁 views/              # EJS templates
│   ├── 📁 public/             # Static assets
│   ├── 📁 services/           # Business logic
│   └── server.js              # Dashboard entry
├── 📁 prisma/                 # Database schema
├── 📁 locales/                # Translation files
├── 📁 ssl/                    # SSL certificates
├── 📁 logs/                   # Application logs
├── ecosystem.config.cjs       # PM2 bot config
├── start-system.sh/.bat       # Startup scripts
└── README.md                  # This file
```

## 🎛️ Dashboard Access

### **User Dashboard**
- **URL**: `https://bot.nav-code.com`
- **Features**: Bot setup, music settings, subscription management

### **Admin Panel**
- **URL**: `https://bot.nav-code.com/admin`
- **Features**: User management, bot control, payment processing

## 📱 Bot Commands

### **Music Commands**
- `/play <song>` - Play a song or playlist
- `/pause` - Pause current track
- `/resume` - Resume playback
- `/stop` - Stop and clear queue
- `/skip` - Skip current track
- `/queue` - Show current queue
- `/volume <1-100>` - Set volume
- `/loop <mode>` - Set loop mode
- `/shuffle` - Shuffle queue

### **Playlist Commands**
- `/playlist create <name>` - Create playlist
- `/playlist add <song>` - Add to playlist
- `/playlist play <name>` - Play playlist
- `/playlist list` - Show playlists

### **Filter Commands**
- `/filter bass <0-5>` - Bass boost
- `/filter nightcore` - Nightcore effect
- `/filter 8d` - 8D audio effect
- `/filter clear` - Remove all filters

## 🔧 Development

### **Bot Development**
```bash
# Start bot in development
bun run src/index.ts

# Watch for changes
bun --watch src/index.ts

# Run linter
bun x prettier --write .
```

### **Dashboard Development**
```bash
cd dashboard

# Development server (auto-reload)
npm run dev

# Build CSS
npm run build

# Test API endpoints
curl -X POST https://localhost:3000/api/bot/stats
```

## 🚀 Deployment

### **Production Setup**
1. **Server Setup**
   ```bash
   # Install Node.js 18+, PostgreSQL, Redis
   # Setup SSL certificates in ssl/ directory
   # Configure firewall (ports 3000, 2333)
   ```

2. **Environment Configuration**
   ```bash
   # Set NODE_ENV=production
   # Use strong secrets and passwords
   # Configure proper database URLs
   ```

3. **Start Services**
   ```bash
   # Use startup script
   ./start-system.sh
   
   # Or manually with PM2
   pm2 start ecosystem.config.cjs
   pm2 start dashboard/ecosystem.config.js
   pm2 save
   ```

### **Domain & SSL**
```bash
# Point bot.nav-code.com to your server IP
# Place SSL certificates in ssl/ directory:
# - ssl/certificate.crt
# - ssl/private.key
# - ssl/ca_bundle.crt (if applicable)
```

## 📊 Monitoring

### **PM2 Monitoring**
```bash
pm2 list                    # Show all processes
pm2 monit                   # Real-time monitoring
pm2 logs                    # View logs
pm2 restart all             # Restart services
```

### **Health Checks**
- **Bot**: Check Discord presence and command responses
- **Dashboard**: Visit `/health` endpoint
- **Database**: Monitor connection and query performance
- **Lavalink**: Check audio playback and node status

## 🔍 Troubleshooting

### **Common Issues**

**Bot won't start:**
```bash
# Check bot token and permissions
# Verify database connection
# Check Lavalink server status
pm2 logs multi-discord-bot-music
```

**Dashboard errors:**
```bash
# Check SSL certificates
# Verify Discord OAuth2 setup
# Check database migrations
pm2 logs premiumplus-dashboard
```

**Audio not working:**
```bash
# Check Lavalink connection
# Verify audio sources (YouTube, etc.)
# Check bot voice permissions
```

### **Log Locations**
- Bot logs: `logs/bot-*.log`
- Dashboard logs: `dashboard/logs/*.log`  
- PM2 logs: `~/.pm2/logs/`
- Lavalink logs: `Lavalink/logs/`

## 💳 Payment Integration

### **Stripe Setup**
1. Create Stripe account and get API keys
2. Create products for subscription plans
3. Setup webhook endpoint: `/webhooks/stripe`
4. Configure prices in dashboard admin panel

### **Manual Payments**
- Admin can manually grant premium subscriptions
- Supports custom payment processing
- Email notifications for subscription changes

## 🌐 Multi-Language Support

Supported languages:
- English (US) 🇺🇸
- Spanish 🇪🇸
- French 🇫🇷
- German 🇩🇪
- Japanese 🇯🇵
- Korean 🇰🇷
- And more...

## 📄 API Documentation

### **Public Endpoints**
- `GET /` - Landing page
- `GET /health` - Health check
- `POST /webhooks/stripe` - Payment webhook

### **Authenticated Endpoints**
- `GET /dashboard` - User dashboard
- `POST /api/bot/start` - Start bot
- `GET /api/bot/stats` - Bot statistics

### **Admin Endpoints**
- `GET /admin` - Admin dashboard
- `POST /api/admin/user/:id/premium/grant` - Grant premium
- `GET /api/admin/bots` - All bot instances

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**OggyTheDev**
- GitHub: [@oggythdev](https://github.com/oggythdev)
- Email: nav-code2025@gmail.com
- Website: [nav-code.com](https://nav-code.com)

## 🙏 Acknowledgments

- **Discord.js** - Discord API wrapper
- **Lavalink** - Audio processing
- **Prisma** - Database ORM
- **Express.js** - Web framework
- **Tailwind CSS** - Styling
- **PM2** - Process management

---

**🎵 Built for the Discord music community with ❤️**

*Transform your Discord server with professional music bot hosting!*
