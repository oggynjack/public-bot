# 🎵 PremiumPlus Music Bot Dashboard

A comprehensive web dashboard for hosting and managing Discord music bots with premium features, built with Express.js, EJS, and Tailwind CSS.

## ✨ Features

### 🚀 **User Features**
- **Discord OAuth2 Authentication** - Secure login with Discord
- **Premium Subscription Management** - Multiple plan options with Stripe integration
- **Bot Setup & Configuration** - Easy bot token and application ID setup
- **Real-time Bot Control** - Start, stop, restart your bot instances
- **Music Settings** - Configure volume, 24/7 mode, autoplay
- **Bot Customization** - Change bot name, avatar, status, and activity
- **Statistics Dashboard** - View server count, users, songs played
- **Subscription Management** - View billing, renewal options

### 👑 **Admin Features**
- **User Management** - View, manage, and grant premium to users
- **Bot Management** - Control all bot instances from one place
- **Payment Management** - Approve payments, handle refunds
- **Plan Management** - Create, edit, and manage subscription plans
- **Analytics** - Comprehensive system statistics and insights
- **System Settings** - Configure dashboard-wide settings

### 🔧 **Technical Features**
- **24/7 Bot Hosting** - PM2 process management for reliability
- **Secure Token Storage** - AES encryption for bot tokens
- **Auto-scaling** - Handle multiple bot instances efficiently
- **Redis Caching** - Fast session management and caching
- **Database Integration** - PostgreSQL with Prisma ORM
- **SSL Support** - HTTPS with custom SSL certificates
- **Rate Limiting** - Protection against abuse
- **Email Notifications** - Automated subscription emails

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Discord User  │───▶│   Dashboard     │───▶│   Bot Instance  │
│   (OAuth2)      │    │   (Express.js)  │    │   (PM2 Managed) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Database      │
                       │   (PostgreSQL)  │
                       └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Cache/Session │
                       │   (Redis)       │
                       └─────────────────┘
```

## 📋 Prerequisites

- **Node.js** 18+ 
- **PostgreSQL** database
- **Redis** server
- **PM2** process manager
- **SSL Certificates** (for HTTPS)
- **Discord Application** (OAuth2 setup)
- **Stripe Account** (for payments)

## 🚀 Quick Start

### 1. **Clone and Setup**
```bash
# Clone the repository (if needed)
cd dashboard

# Run the setup script
# On Windows:
setup.bat

# On Linux/macOS:
chmod +x setup.sh
./setup.sh
```

### 2. **Configure Environment**
Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=3000
NODE_ENV=production
SESSION_SECRET=your-super-secret-session-key
DASHBOARD_URL=https://bot.nav-code.com

# SSL Configuration
SSL_CERT_PATH=../ssl/certificate.crt
SSL_KEY_PATH=../ssl/private.key
SSL_CA_PATH=../ssl/ca_bundle.crt

# Discord OAuth2
DISCORD_CLIENT_ID=your-discord-application-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
DISCORD_REDIRECT_URI=https://bot.nav-code.com/auth/callback

# Database & Redis
DATABASE_URL=postgresql://user:pass@localhost:5432/musicbot_db
REDIS_URL=redis://localhost:6379

# Encryption & Security
ENCRYPTION_KEY=your-32-character-encryption-key-here
ADMIN_IDS=730818959112274040,another-admin-id

# Payments
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=nav-code2025@gmail.com
SMTP_PASS=your-app-password
```

### 3. **Database Setup**
```bash
# From the main project directory
bun x prisma db push
# or
npx prisma db push
```

### 4. **Start the Dashboard**

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
# or with PM2
pm2 start ecosystem.config.js
```

## 🗂️ Project Structure

```
dashboard/
├── 📁 middleware/          # Authentication, error handling
├── 📁 routes/             # API and page routes
│   ├── auth.js           # Discord OAuth2 authentication
│   ├── dashboard.js      # User dashboard routes
│   ├── admin.js          # Admin panel routes
│   ├── api.js            # API endpoints
│   └── webhooks.js       # Payment webhooks
├── 📁 services/           # Business logic
│   └── BotManager.js     # PM2 bot management
├── 📁 views/              # EJS templates
│   ├── 📁 layouts/        # Layout templates
│   ├── 📁 dashboard/      # Dashboard pages
│   ├── 📁 admin/          # Admin pages
│   └── 📁 errors/         # Error pages
├── 📁 public/             # Static assets
│   ├── 📁 css/            # Stylesheets
│   ├── 📁 js/             # JavaScript files
│   └── 📁 images/         # Images and icons
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env.example           # Environment template
└── README.md              # This file
```

## 🔄 User Workflow

### **New User Journey:**
1. **Visit Dashboard** → Discord OAuth2 Login
2. **Premium Check** → Redirect to Plans Page (if not premium)
3. **Purchase Plan** → Stripe checkout or admin approval
4. **Bot Setup** → Enter bot token and application ID
5. **Dashboard Access** → Full control panel access

### **Returning User:**
1. **Login** → Discord OAuth2
2. **Dashboard** → Bot status and controls
3. **Management** → Settings, customization, subscription

## 🎛️ Dashboard Pages

### **User Pages:**
- `/` - Landing page with features
- `/dashboard` - Main dashboard with bot stats
- `/dashboard/setup` - First-time bot setup
- `/dashboard/plans` - Premium plans and pricing
- `/dashboard/bot` - Bot management controls
- `/dashboard/music` - Music settings configuration
- `/dashboard/profile` - Bot profile customization
- `/dashboard/subscription` - Subscription information
- `/dashboard/docs` - Documentation and help

### **Admin Pages:**
- `/admin` - Admin dashboard with system stats
- `/admin/users` - User management
- `/admin/bots` - Bot instance management
- `/admin/payments` - Payment and subscription management
- `/admin/plans` - Plan configuration
- `/admin/settings` - System settings

## 🔌 API Endpoints

### **Bot Control:**
- `POST /api/bot/start` - Start bot instance
- `POST /api/bot/stop` - Stop bot instance  
- `POST /api/bot/restart` - Restart bot instance
- `GET /api/bot/stats` - Get bot statistics

### **Settings:**
- `POST /api/bot/settings/music` - Update music settings
- `POST /api/bot/settings/profile` - Update bot profile
- `POST /api/bot/settings/credentials` - Update bot credentials

### **Admin:**
- `POST /api/admin/user/:id/premium/grant` - Grant premium
- `POST /api/admin/user/:id/premium/revoke` - Revoke premium
- `POST /api/admin/bot/:id/control/:action` - Control any bot
- `POST /api/admin/payment/:id/approve` - Approve payment

### **Webhooks:**
- `POST /webhooks/stripe` - Stripe payment webhook
- `POST /webhooks/manual-payment` - Manual payment processing

## 🔒 Security Features

- **HTTPS Enforced** - SSL certificates required
- **Session Security** - Redis-based secure sessions
- **Rate Limiting** - Protection against abuse
- **Input Validation** - All user inputs validated
- **Token Encryption** - AES encryption for bot tokens
- **CSRF Protection** - Cross-site request forgery protection
- **Content Security Policy** - XSS protection headers

## 🎯 Environment Configuration

### **Development:**
```env
NODE_ENV=development
DASHBOARD_URL=http://localhost:3000
# Use HTTP redirect URI for development
DISCORD_REDIRECT_URI=http://localhost:3000/auth/callback
```

### **Production:**
```env
NODE_ENV=production
DASHBOARD_URL=https://bot.nav-code.com
# Use HTTPS and custom domain
DISCORD_REDIRECT_URI=https://bot.nav-code.com/auth/callback
```

## 🔧 Discord Application Setup

1. **Go to** [Discord Developer Portal](https://discord.com/developers/applications)
2. **Create New Application** → Name it "PremiumPlus Music Bot Dashboard"
3. **OAuth2 Settings:**
   - **Redirect URI:** `https://bot.nav-code.com/auth/callback`
   - **Scopes:** `identify`, `email`
4. **Copy Client ID and Secret** to your `.env` file

## 💳 Stripe Integration

1. **Create Stripe Account** → Get API keys
2. **Create Products/Prices** → Monthly, quarterly, annual plans
3. **Setup Webhook** → Point to `/webhooks/stripe`
4. **Configure Environment:**
   ```env
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## 📧 Email Configuration

**Gmail Setup:**
1. **Enable 2FA** on your Gmail account
2. **Generate App Password** → Use in `SMTP_PASS`
3. **Configure:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

## 🚀 Deployment

### **PM2 Deployment:**
```bash
# Start with PM2
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# View logs
pm2 logs premiumplus-dashboard

# Restart
pm2 restart premiumplus-dashboard
```

### **Nginx Configuration:**
```nginx
server {
    listen 443 ssl;
    server_name bot.nav-code.com;
    
    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;
    
    location / {
        proxy_pass https://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🐛 Troubleshooting

### **Common Issues:**

**SSL Certificate Error:**
```bash
# Verify certificates
openssl x509 -in ssl/certificate.crt -text -noout
openssl rsa -in ssl/private.key -check
```

**Database Connection:**
```bash
# Test PostgreSQL connection
psql "postgresql://user:pass@localhost:5432/musicbot_db" -c "SELECT 1;"
```

**Redis Connection:**
```bash
# Test Redis connection
redis-cli -u "redis://localhost:6379" ping
```

**PM2 Issues:**
```bash
# Restart PM2
pm2 kill
pm2 start ecosystem.config.js

# View detailed logs
pm2 logs --lines 100
```

## 📊 Monitoring

### **PM2 Monitoring:**
```bash
pm2 monit                    # Real-time monitoring
pm2 list                     # Process list
pm2 show premiumplus-dashboard # Detailed info
```

### **Log Files:**
- `logs/dashboard.log` - Combined logs
- `logs/dashboard-error.log` - Error logs
- `logs/dashboard-out.log` - Output logs

## 🤝 Contributing

1. **Fork the Repository**
2. **Create Feature Branch** → `git checkout -b feature/amazing-feature`
3. **Commit Changes** → `git commit -m 'Add amazing feature'`
4. **Push to Branch** → `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 👨‍💻 Author

**OggyTheDev**
- GitHub: [@oggythdev](https://github.com/oggythdev)
- Email: nav-code2025@gmail.com
- Discord: Coming soon

## 🙏 Acknowledgments

- [Discord.js](https://discord.js.org/) - Discord API library
- [Express.js](https://expressjs.com/) - Web framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Prisma](https://prisma.io/) - Database ORM
- [PM2](https://pm2.keymetrics.io/) - Process manager
- [Stripe](https://stripe.com/) - Payment processing

---

**Made with ❤️ for the Discord music bot community**
