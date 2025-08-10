#!/bin/bash

# PremiumPlus Music Bot - Complete Startup Script
# This script starts both the music bot backend and the dashboard frontend

echo "🎵 Starting PremiumPlus Music Bot System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}[SYSTEM]${NC} $1"
}

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

print_header "🚀 PremiumPlus Music Bot System Initialization"
echo "=============================================="

# Check prerequisites
print_status "Checking system prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) ✓"

# Check Bun (optional but preferred)
if command -v bun &> /dev/null; then
    print_success "Bun $(bun --version) ✓"
    RUNTIME="bun"
else
    print_warning "Bun not found, using Node.js"
    RUNTIME="node"
fi

# Check PM2
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 not found. Installing PM2..."
    npm install -g pm2
    if [ $? -eq 0 ]; then
        print_success "PM2 installed successfully"
    else
        print_error "Failed to install PM2"
        exit 1
    fi
else
    print_success "PM2 $(pm2 --version) ✓"
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    print_success "PostgreSQL available ✓"
else
    print_warning "PostgreSQL CLI not found (database may still be accessible via URL)"
fi

# Check Redis
if command -v redis-cli &> /dev/null; then
    if redis-cli ping &> /dev/null; then
        print_success "Redis connection ✓"
    else
        print_warning "Redis server not responding"
    fi
else
    print_warning "Redis CLI not found"
fi

echo ""

# Setup environment
print_status "Setting up environment..."

# Check main .env file
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        print_status "Creating .env from template..."
        cp .env.example .env
        print_warning "Please configure the .env file before running the system"
        print_warning "Important variables: DATABASE_URL, REDIS_URL, BOT_TOKEN"
    else
        print_error ".env.example file not found"
        exit 1
    fi
else
    print_success "Main .env file exists ✓"
fi

# Install main dependencies
print_status "Installing main project dependencies..."
if [ "$RUNTIME" = "bun" ]; then
    bun install
else
    npm install
fi

if [ $? -ne 0 ]; then
    print_error "Failed to install main dependencies"
    exit 1
fi

print_success "Main dependencies installed ✓"

# Setup dashboard
if [ -d "dashboard" ]; then
    print_status "Setting up dashboard..."
    cd dashboard
    
    # Check dashboard .env
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            print_status "Creating dashboard .env from template..."
            cp .env.example .env
            print_warning "Please configure the dashboard/.env file"
        else
            print_warning "Dashboard .env.example not found"
        fi
    else
        print_success "Dashboard .env file exists ✓"
    fi
    
    # Install dashboard dependencies
    print_status "Installing dashboard dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Dashboard dependencies installed ✓"
    else
        print_error "Failed to install dashboard dependencies"
        cd "$SCRIPT_DIR"
        exit 1
    fi
    
    # Create logs directory
    if [ ! -d "logs" ]; then
        mkdir -p logs
        print_success "Dashboard logs directory created ✓"
    fi
    
    cd "$SCRIPT_DIR"
else
    print_warning "Dashboard directory not found, skipping dashboard setup"
fi

# Database migration
print_status "Running database migrations..."
if [ "$RUNTIME" = "bun" ]; then
    bun x prisma db push --accept-data-loss
else
    npx prisma db push --accept-data-loss
fi

if [ $? -eq 0 ]; then
    print_success "Database migrations completed ✓"
else
    print_warning "Database migration failed (may need manual intervention)"
fi

# Generate Prisma client
print_status "Generating Prisma client..."
if [ "$RUNTIME" = "bun" ]; then
    bun x prisma generate
else
    npx prisma generate
fi

echo ""

# Start services with PM2
print_header "🚀 Starting Services with PM2"
echo "==============================="

# Stop any existing processes
print_status "Stopping existing processes..."
pm2 stop ecosystem.config.cjs 2>/dev/null || true
pm2 stop dashboard/ecosystem.config.js 2>/dev/null || true

# Start main music bot
print_status "Starting music bot backend..."
pm2 start ecosystem.config.cjs

if [ $? -eq 0 ]; then
    print_success "Music bot backend started ✓"
else
    print_error "Failed to start music bot backend"
fi

# Start dashboard (if available)
if [ -f "dashboard/ecosystem.config.js" ]; then
    print_status "Starting dashboard frontend..."
    cd dashboard
    pm2 start ecosystem.config.js
    cd "$SCRIPT_DIR"
    
    if [ $? -eq 0 ]; then
        print_success "Dashboard frontend started ✓"
    else
        print_error "Failed to start dashboard frontend"
    fi
elif [ -f "dashboard/server.js" ]; then
    print_status "Starting dashboard with basic PM2 config..."
    pm2 start dashboard/server.js --name "premiumplus-dashboard" --interpreter node
    
    if [ $? -eq 0 ]; then
        print_success "Dashboard started with basic config ✓"
    else
        print_error "Failed to start dashboard"
    fi
else
    print_warning "Dashboard not found or not configured"
fi

# Save PM2 configuration
pm2 save
pm2 startup

echo ""

# Display status
print_header "📊 System Status"
echo "=================="

pm2 list

echo ""
print_header "🔗 Access Information"
echo "======================="

echo -e "${GREEN}Music Bot:${NC}"
echo "  - Bot should now be online in Discord"
echo "  - Check PM2 logs: pm2 logs multi-discord-bot-music"
echo ""

if [ -f "dashboard/server.js" ]; then
    echo -e "${GREEN}Dashboard:${NC}"
    echo "  - Web Interface: https://bot.nav-code.com:3000"
    echo "  - Local Interface: https://localhost:3000"
    echo "  - Check PM2 logs: pm2 logs premiumplus-dashboard"
    echo ""
fi

echo -e "${GREEN}Management:${NC}"
echo "  - View all processes: pm2 list"
echo "  - Monitor processes: pm2 monit"
echo "  - View logs: pm2 logs [process-name]"
echo "  - Restart services: pm2 restart all"
echo "  - Stop services: pm2 stop all"

echo ""
print_header "⚠️  Important Notes"
echo "===================="

echo -e "${YELLOW}Configuration:${NC}"
echo "  - Ensure your .env files are properly configured"
echo "  - Set up Discord bot token and application ID"
echo "  - Configure database and Redis connections"
echo "  - Set up SSL certificates for HTTPS (dashboard)"

echo ""
echo -e "${YELLOW}Security:${NC}"
echo "  - Change default secrets and keys in production"
echo "  - Use strong passwords for database and Redis"
echo "  - Keep your bot token secure and never share it"

echo ""
echo -e "${YELLOW}Support:${NC}"
echo "  - Documentation: Check README files in each directory"
echo "  - Logs: Use 'pm2 logs' to troubleshoot issues"
echo "  - Issues: Check GitHub repository for known issues"

echo ""
print_success "🎉 PremiumPlus Music Bot System is now running!"
print_status "Use 'pm2 monit' to monitor your processes in real-time."

# Final status check
sleep 3
echo ""
print_status "Final system check..."
pm2 jlist | jq -r '.[] | "\(.name): \(.pm2_env.status)"' 2>/dev/null || pm2 list --no-colors | grep -E "online|errored|stopped"
