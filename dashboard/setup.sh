#!/bin/bash

# PremiumPlus Music Bot Dashboard Setup Script

echo "🎵 Setting up PremiumPlus Music Bot Dashboard..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Navigate to dashboard directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

print_status "Installing dashboard dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_success "Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating .env file from template..."
    cp .env.example .env
    print_warning "Please edit the .env file with your configuration before starting the dashboard"
else
    print_success ".env file already exists"
fi

# Create logs directory
if [ ! -d "logs" ]; then
    print_status "Creating logs directory..."
    mkdir -p logs
    print_success "Logs directory created"
fi

# Check if SSL certificates exist
if [ ! -f "../ssl/certificate.crt" ] || [ ! -f "../ssl/private.key" ]; then
    print_warning "SSL certificates not found in ../ssl/ directory"
    print_warning "Please ensure you have:"
    print_warning "  - ../ssl/certificate.crt"
    print_warning "  - ../ssl/private.key"
    print_warning "  - ../ssl/ca_bundle.crt (optional)"
fi

# Check PostgreSQL connection
print_status "Checking database connection..."
if [ -f ".env" ]; then
    source .env
    if [ -n "$DATABASE_URL" ]; then
        # Try to connect to database (simplified check)
        if command -v psql &> /dev/null; then
            if psql "$DATABASE_URL" -c "SELECT 1;" &> /dev/null; then
                print_success "Database connection successful"
            else
                print_warning "Could not connect to database. Please check your DATABASE_URL"
            fi
        else
            print_warning "psql not found. Cannot test database connection"
        fi
    else
        print_warning "DATABASE_URL not set in .env file"
    fi
fi

# Check Redis connection
print_status "Checking Redis connection..."
if [ -f ".env" ]; then
    source .env
    if [ -n "$REDIS_URL" ]; then
        if command -v redis-cli &> /dev/null; then
            if redis-cli -u "$REDIS_URL" ping &> /dev/null; then
                print_success "Redis connection successful"
            else
                print_warning "Could not connect to Redis. Please check your REDIS_URL"
            fi
        else
            print_warning "redis-cli not found. Cannot test Redis connection"
        fi
    else
        print_warning "REDIS_URL not set in .env file"
    fi
fi

# Run database migrations (if prisma is available)
if [ -f "../prisma/schema/schema.prisma" ]; then
    print_status "Running database migrations..."
    cd ..
    if command -v bun &> /dev/null; then
        bun x prisma db push
    else
        npx prisma db push
    fi
    cd dashboard
    
    if [ $? -eq 0 ]; then
        print_success "Database migrations completed"
    else
        print_warning "Database migration failed. Please run manually"
    fi
else
    print_warning "Prisma schema not found. Skipping migrations"
fi

# Create PM2 ecosystem file if it doesn't exist
if [ ! -f "ecosystem.config.js" ]; then
    print_status "Creating PM2 ecosystem configuration..."
    cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'premiumplus-dashboard',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    log_file: 'logs/dashboard.log',
    error_file: 'logs/dashboard-error.log',
    out_file: 'logs/dashboard-out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
EOF
    print_success "PM2 ecosystem file created"
fi

print_success "Dashboard setup completed!"
print_status ""
print_status "Next steps:"
print_status "1. Edit the .env file with your configuration"
print_status "2. Ensure your SSL certificates are in the ../ssl/ directory"
print_status "3. Make sure PostgreSQL and Redis are running"
print_status "4. Start the dashboard with: npm start"
print_status "   Or for development: npm run dev"
print_status "   Or with PM2: pm2 start ecosystem.config.js"
print_status ""
print_status "The dashboard will be available at: https://bot.nav-code.com:3000"
print_status ""
print_warning "Don't forget to:"
print_warning "- Configure your Discord OAuth2 application"
print_warning "- Set up your Stripe keys for payments"
print_warning "- Configure your SMTP settings for emails"
