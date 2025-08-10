import express from 'express';
import session from 'express-session';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import pm2 from 'pm2';
import { exec } from 'child_process';
import { promisify } from 'util';
import { PrismaClient } from './generated/index.js';
import { systemMonitor } from './services/SystemMonitor.js';
import { spawn } from 'child_process';
import http from 'http';
// (crypto already imported once above; removed duplicate)

// Load environment variables early so Lavalink logic can read them
dotenv.config();

// --- Lavalink Auto-Start & Health Check (multi-tenant support) ---
let lavalinkProcess = null;
let lavalinkRetryAttempts = 0;
const MAX_LAVALINK_RETRIES = 3;
let lavalinkDisabledUntil = 0; // timestamp ms until which we do not attempt restarts

async function detectJavaVersion() {
  return new Promise(resolve => {
    exec('java -version', (err, stdout, stderr) => {
      if (err) return resolve(null);
      const text = stdout + '\n' + stderr;
      const match = text.match(/version "([^"]+)"/);
      if (!match) return resolve(null);
      const versionStr = match[1]; // e.g. 1.8.0_372 or 17.0.10
      let major;
      if (versionStr.startsWith('1.')) { // legacy style 1.x => real major after 1.
        const parts = versionStr.split('.');
        major = parseInt(parts[1], 10);
      } else {
        major = parseInt(versionStr.split('.')[0], 10);
      }
      if (isNaN(major)) return resolve(null);
      resolve({ major, raw: versionStr });
    });
  });
}

async function startLavalinkIfNeeded() {
  if (process.env.DISABLE_LAVALINK && /^(1|true|yes)$/i.test(process.env.DISABLE_LAVALINK)) {
    console.log('🛑 Lavalink auto-start disabled via DISABLE_LAVALINK env');
    return;
  }
  if (Date.now() < lavalinkDisabledUntil) {
    return; // backoff window active
  }
  const host = process.env.LAVALINK_SERVER_HOST || '127.0.0.1';
  const port = process.env.LAVALINK_SERVER_PORT || '2333';
  const password = process.env.LAVALINK_SERVER_PASSWORD || 'youshallnotpass';

  // Quick health probe
  const healthy = await new Promise(resolve => {
    const req = http.request({ host, port, path: '/version', method: 'GET', timeout: 2000 }, res => {
      if (res.statusCode && res.statusCode < 500) { resolve(true); } else { resolve(false); }
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
  if (healthy) {
    console.log('🎧 Lavalink already running');
    return;
  }
  if (lavalinkProcess) {
    console.log('🎧 Lavalink process already spawned (starting)');
    return;
  }
  if (lavalinkRetryAttempts >= MAX_LAVALINK_RETRIES) {
    console.log(`🛑 Lavalink retries exceeded (${MAX_LAVALINK_RETRIES}). Will not auto-retry until manual intervention or after cooldown.`);
    lavalinkDisabledUntil = Date.now() + 30 * 60 * 1000; // 30 min cooldown
    return;
  }
  try {
    // Ensure Java version is compatible (Lavalink 4 requires Java 17+)
    const javaVersion = await detectJavaVersion();
    if (!javaVersion) {
      console.error('❌ Unable to detect Java version. Install Java 17+ (Temurin/OpenJDK) and ensure "java" is on PATH.');
      lavalinkRetryAttempts = MAX_LAVALINK_RETRIES; // stop further attempts until fixed
      lavalinkDisabledUntil = Date.now() + 30 * 60 * 1000;
      return;
    }
    if (javaVersion.major < 17) {
      console.error(`❌ Incompatible Java version detected (${javaVersion.raw}). Lavalink 4 needs Java 17+. Install newer JDK and restart the dashboard.`);
      lavalinkRetryAttempts = MAX_LAVALINK_RETRIES; // prevent loop
      lavalinkDisabledUntil = Date.now() + 30 * 60 * 1000;
      return;
    }
    // Allow overriding Lavalink path via env, else default to provided Windows path c:\\Lavalink
    const configuredDir = process.env.LAVALINK_DIR || 'c:/Lavalink';
    const jarFile = process.env.LAVALINK_JAR || 'Lavalink.jar';
    const fullPath = path.join(configuredDir, jarFile);
    if (!fs.existsSync(fullPath)) {
      console.error('❌ Lavalink jar not found at', fullPath);
      if (process.env.ALLOW_LAVALINK_DOWNLOAD && /^(1|true|yes)$/i.test(process.env.ALLOW_LAVALINK_DOWNLOAD)) {
        console.log('🌐 Attempting to download latest Lavalink release (requires internet)...');
        try {
          await fs.promises.mkdir(configuredDir, { recursive: true });
          const https = await import('https');
          const downloadUrl = process.env.LAVALINK_DOWNLOAD_URL || 'https://github.com/lavalink-devs/Lavalink/releases/download/4.0.8/Lavalink.jar';
          await new Promise((resolve, reject) => {
            const file = fs.createWriteStream(fullPath);
            https.get(downloadUrl, res => {
              if (res.statusCode !== 200) {
                file.close();
                fs.unlink(fullPath, ()=>{});
                return reject(new Error('Download failed HTTP ' + res.statusCode));
              }
              res.pipe(file);
              file.on('finish', () => file.close(resolve));
            }).on('error', err => {
              file.close();
              fs.unlink(fullPath, ()=>{});
              reject(err);
            });
          });
          console.log('✅ Lavalink.jar downloaded');
        } catch (e) {
          console.error('❌ Lavalink auto-download failed:', e.message);
          return;
        }
      } else {
        console.log('ℹ️ Enable auto-download by setting ALLOW_LAVALINK_DOWNLOAD=1');
        return;
      }
    }
    // Detect java executable path if JAVA_HOME provided
    let javaCmd = 'java';
    if (process.env.JAVA_HOME) {
      const candidate = path.join(process.env.JAVA_HOME, 'bin', process.platform === 'win32' ? 'java.exe' : 'java');
      if (fs.existsSync(candidate)) javaCmd = candidate;
    }
    // Quick check if java exists (Windows where or *nix which) – non-blocking
    const javaCheckCmd = process.platform === 'win32' ? 'where java' : 'which java';
    try {
      await new Promise((resolve) => {
        exec(javaCheckCmd, (err) => resolve(true));
      });
    } catch {}
    // Spawn and attach error handler to avoid process crash
    lavalinkProcess = spawn(javaCmd, ['-Xmx512m', '-jar', fullPath, '--port', port], {
      cwd: configuredDir,
      env: { ...process.env, SERVER_PASSWORD: password },
      stdio: ['ignore', 'pipe', 'pipe']
    });
    lavalinkProcess.on('error', (err) => {
      console.error('❌ Lavalink spawn error:', err.message);
      console.error('   Install Java (e.g., Temurin/OpenJDK) and ensure it is on PATH or set JAVA_HOME.');
      lavalinkProcess = null; // Do not retry immediately to avoid loop
    });
    lavalinkProcess.stdout.on('data', d => {
      const line = d.toString();
      if (line.includes('Started Launcher') || line.toLowerCase().includes('lavalink')) {
        console.log('✅ Lavalink output:', line.trim());
      }
    });
    lavalinkProcess.stderr.on('data', d => console.error('Lavalink ERR:', d.toString().trim()));
    lavalinkProcess.on('exit', code => {
      console.error('Lavalink exited with code', code);
      lavalinkProcess = null;
      lavalinkRetryAttempts += 1;
      if (lavalinkRetryAttempts < MAX_LAVALINK_RETRIES) {
        const delay = 10_000 * lavalinkRetryAttempts; // simple backoff
        console.log(`⏳ Scheduling Lavalink restart attempt ${lavalinkRetryAttempts}/${MAX_LAVALINK_RETRIES} in ${delay/1000}s`);
        setTimeout(startLavalinkIfNeeded, delay);
      } else {
        console.log('🛑 Lavalink restart attempts exhausted. No further automatic retries.');
        lavalinkDisabledUntil = Date.now() + 30 * 60 * 1000; // 30 min cooldown
      }
    });
    console.log('🚀 Spawning Lavalink process...');
  } catch (e) {
    console.error('❌ Failed to start Lavalink:', e);
  }
}
startLavalinkIfNeeded();

const execAsync = promisify(exec);

// Simple AES-256-GCM encryption helpers (shared)
import crypto from 'crypto';
const ENC_SECRET = (process.env.BOT_TOKEN_SECRET || 'change_this_secret_change_this_secret').slice(0,32).padEnd(32,'0');
function encryptToken(raw) {
  try {
    const iv = crypto.randomBytes(12);
    const key = Buffer.from(ENC_SECRET);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const enc = Buffer.concat([cipher.update(raw, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return 'encv1_' + Buffer.concat([iv, tag, enc]).toString('base64');
  } catch (e) { return 'encrypted_' + Buffer.from(raw).toString('base64'); }
}
function decryptToken(stored) {
  try {
    if (!stored) return stored;
    if (stored.startsWith('encv1_')) {
      const buf = Buffer.from(stored.replace('encv1_',''), 'base64');
      const iv = buf.subarray(0,12);
      const tag = buf.subarray(12,28);
      const data = buf.subarray(28);
      const key = Buffer.from(ENC_SECRET);
      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(tag);
      return decipher.update(data, undefined, 'utf8') + decipher.final('utf8');
    }
    if (stored.startsWith('encrypted_')) return Buffer.from(stored.replace('encrypted_',''), 'base64').toString('utf8');
    return stored;
  } catch { return stored; }
}

// Create logs directory if it doesn't exist
const logsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const prisma = new PrismaClient();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'premium-plus-music-bot-hosting-session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Update user session to include isAdmin based on ADMIN_IDS
const ADMIN_IDS = process.env.ADMIN_IDS?.split(',') || [];

// Configure Gmail SMTP transporter
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email connection
emailTransporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error.message);
  } else {
    console.log('✅ Email server ready');
  }
});

// Database helper functions for admin management
async function createMasterAdmin() {
  try {
    const masterEmail = process.env.MASTER_ADMIN_EMAIL || 'admin@mavcode.xyz';
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: masterEmail }
    });
    
    if (!existingAdmin) {
      await prisma.admin.create({
        data: {
          email: masterEmail,
          passwordHash: await bcrypt.hash('admin123', 10),
          isRegistered: true,
          isMaster: true,
          permissions: ['MASTER_CONTROL']
        }
      });
      console.log('✅ Master admin initialized in database');
    } else {
      console.log('✅ Master admin already exists in database');
    }
  } catch (error) {
    console.error('❌ Error initializing master admin:', error);
  }
}

async function isApprovedAdmin(email) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    return !!admin;
  } catch (error) {
    console.error('Error checking admin approval:', error);
    return false;
  }
}

async function isMasterAdmin(email) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    return admin?.isMaster || false;
  } catch (error) {
    console.error('Error checking master admin:', error);
    return false;
  }
}

async function getAdminByEmail(email) {
  try {
    return await prisma.admin.findUnique({
      where: { email }
    });
  } catch (error) {
    console.error('Error getting admin by email:', error);
    return null;
  }
}

async function addApprovedAdmin(email, approvedBy) {
  try {
    return await prisma.admin.create({
      data: {
        email,
        passwordHash: '',
        isRegistered: false,
        isMaster: false,
        permissions: ['ADMIN_CONTROL']
      }
    });
  } catch (error) {
    console.error('Error adding approved admin:', error);
    return null;
  }
}

async function updateAdminPassword(email, passwordHash) {
  try {
    return await prisma.admin.update({
      where: { email },
      data: {
        passwordHash,
        isRegistered: true,
        lastLogin: new Date(),
        updatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error updating admin password:', error);
    return null;
  }
}

async function verifyAdminPassword(email, password) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    
    if (!admin || !admin.passwordHash) {
      return false;
    }
    
    return await bcrypt.compare(password, admin.passwordHash);
  } catch (error) {
    console.error('Error verifying admin password:', error);
    return false;
  }
}

// Storage for temporary data (OTP, etc.)
const adminLoginCodes = new Map();
const passwordResetCodes = new Map();
const passwordResetAttempts = new Map();

// Initialize database
await createMasterAdmin();


function canResetPassword(email) {
  const today = new Date().toDateString();
  const attempts = passwordResetAttempts.get(email + '_' + today) || 0;
  return attempts < 3;
}

function incrementPasswordResetAttempts(email) {
  const today = new Date().toDateString();
  const key = email + '_' + today;
  const attempts = passwordResetAttempts.get(key) || 0;
  passwordResetAttempts.set(key, attempts + 1);
}

async function setAdminPassword(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    // Update admin password in database
    await prisma.admin.update({
      where: { email },
      data: { 
        passwordHash: hashedPassword,
        isRegistered: true
      }
    });
  } catch (error) {
    console.error('Error setting admin password:', error);
    throw error;
  }
}

async function validateAdminPassword(email, password) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    
    if (!admin || !admin.passwordHash) return false;
    return await bcrypt.compare(password, admin.passwordHash);
  } catch (error) {
    console.error('Error validating admin password:', error);
    return false;
  }
}

app.use((req, res, next) => {
  if (req.session?.user) {
    req.session.user.isAdmin = ADMIN_IDS.includes(req.session.user.id);
  }
  next();
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Admin authentication middleware
const requireAdminAuth = async (req, res, next) => {
  // Check if session has admin user
  if (!req.session?.adminUser || !req.session.adminUser.isAdmin) {
    return res.redirect('/admin/login');
  }
  
  // HARD CHECK: Verify admin email is still approved
  const adminEmail = req.session.adminUser.email;
  if (!adminEmail) {
    console.log('🚫 No admin email in session');
    delete req.session.adminUser;
    return res.redirect('/admin/login?error=admin_access_only');
  }
  
  try {
    const isApproved = await isApprovedAdmin(adminEmail);
    if (!isApproved) {
      console.log(`🚫 Admin access revoked for session: ${adminEmail}`);
      delete req.session.adminUser;
      return res.redirect('/admin/login?error=not_registered');
    }
  } catch (error) {
    console.error('Error checking admin approval:', error);
    return res.redirect('/admin/login?error=system_error');
  }
  
  next();
};

// Middleware to add navigation data to all views
const addNavigationData = (req, res, next) => {
  res.locals.navigation = {
    currentUser: req.session?.user || null,
    isAdmin: !!req.session?.adminUser,
    currentPath: req.path,
    baseUrl: `http://localhost:${PORT}`
  };
  next();
};

// Apply navigation middleware to all routes
app.use(addNavigationData);

// Basic routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'PremiumPlus Music Bot Hosting',
    user: req.session?.user || null,
    isAdmin: !!req.session?.adminUser,
    error: req.query.error || null,
    message: req.query.message || null
  });
});

app.get('/features', (req, res) => {
  res.render('features', {
    title: 'Features - MAVCODE Rhythm',
    user: req.session?.user || null,
    isAdmin: !!req.session?.adminUser
  });
});

app.get('/support', (req, res) => {
  res.render('support', {
    title: 'Support - MAVCODE Rhythm',
    user: req.session?.user || null,
    isAdmin: !!req.session?.adminUser
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us - MAVCODE Rhythm',
    user: req.session?.user || null,
    isAdmin: !!req.session?.adminUser
  });
});

app.get('/status', (req, res) => {
  res.render('status', {
    title: 'System Status - MAVCODE Rhythm',
    user: req.session?.user || null,
    isAdmin: !!req.session?.adminUser
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Discord OAuth2 routes (simplified)
app.get('/auth/discord', (req, res) => {
  const clientId = process.env.DISCORD_CLIENT_ID || '1401323931847360623';
  const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI || `http://localhost:${PORT}/auth/callback`);
  const scope = 'identify email';
  
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  res.redirect(discordAuthUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect('/?error=no_code');
  }
  
  try {
    // TODO: Implement actual Discord OAuth2 token exchange
    // This is a simplified version - you should implement full Discord OAuth2
    
    // For now, simulate checking if user has premium
    const mockDiscordUser = {
      id: '123456789',
      username: 'TestUser',
      discriminator: '1234',
      avatar: null,
      email: 'test@example.com'
    };
    
    // Check if user exists in database and has premium
    const user = await prisma.user.findUnique({
      where: { userId: mockDiscordUser.id }
    });
    
    if (!user || !user.premiumPlus) {
      // User doesn't have premium, show error message
      return res.redirect('/?error=no_premium&message=' + encodeURIComponent('You need a Premium+ plan to access the dashboard. Please subscribe to continue.'));
    }
    
    // User has premium, create session
    req.session.user = {
      id: user.userId,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      email: user.email,
      premiumPlus: user.premiumPlus
    };
    
    res.redirect('/dashboard');
    
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect('/?error=auth_failed');
  }
});

// Database functions - TODO: Implement with actual database
async function checkUserInDatabase(discordId) {
  // TODO: Implement actual database query
  // This should query PostgreSQL/MongoDB/etc for user data
  return null; // No user found for now
}

app.get('/dashboard', (req, res) => {
  // Allow access if user is logged in OR if admin wants to switch to user panel
  if (!req.session?.user && !req.session?.adminUser) {
    return res.redirect('/');
  }
  
  // If admin is accessing dashboard, create temporary user session for testing
  let currentUser = req.session.user;
  if (!currentUser && req.session.adminUser) {
    // Create a temporary user session for admin testing
    // Admin must still go through bot setup flow
    req.session.user = {
      id: 'admin-as-user-' + Date.now(),
      username: 'Admin (Testing)',
      avatar: null,
      email: req.session.adminUser.email || 'admin@premiumplus.com',
      hasPremium: true, // Admins can test premium features
      isAdmin: true,
      isFirstTime: true, // Force admins to go through setup
      botToken: null,
      applicationId: null,
      subscriptionExpiry: null
    };
    currentUser = req.session.user;
  }
  
  // Redirect based on user status
  if (!currentUser.hasPremium) {
    return res.redirect('/dashboard/plans');
  } else if (currentUser.isFirstTime || !currentUser.botToken) {
    return res.redirect('/dashboard/setup');
  } else {
    return res.redirect('/dashboard/control-panel');
  }
});

// Bot Setup Routes
app.get('/dashboard/setup', (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.redirect('/');
  }
  
  const currentUser = req.session.user || req.session.adminUser;
  
  // Only allow setup for premium users or admins
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.redirect('/dashboard/plans');
  }
  
  res.render('dashboard/setup', {
    title: 'Bot Setup - PremiumPlus',
    user: currentUser,
    isAdmin: !!req.session?.adminUser,
    error: req.query.error || null,
    formData: req.query.formData || null
  });
});

app.post('/dashboard/setup', async (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const currentUser = req.session.user || req.session.adminUser;
  const { botToken, applicationId, botName } = req.body;
  
  try {
    // Validate inputs
    if (!botToken || !applicationId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Bot token and application ID are required' 
      });
    }
    
    if (!applicationId.match(/^\d{17,19}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid application ID format' 
      });
    }
    
    // Validate bot credentials with Discord API
    const validationResult = await validateBotCredentials(botToken, applicationId);
    
    if (!validationResult || !validationResult.valid) {
      return res.status(400).json({ 
        success: false, 
        message: validationResult?.reason || 'Invalid bot credentials. Please check your bot token and application ID.' 
      });
    }
    
    // Encrypt and store bot data
    const encryptedToken = await encryptBotToken(botToken);
    
    const botData = {
      userId: currentUser.id,
      applicationId: applicationId,
      botToken: encryptedToken,
      botName: botName || validationResult.botName || `${currentUser.username}'s Music Bot`,
      botId: validationResult.botId,
      verified: validationResult.verified,
      status: 'starting',
      createdAt: new Date()
    };
    
    // Store in database
    await storeBotData(botData);
    
    // Start bot with PM2 (mock)
    await startBotWithPM2(botData);
    
    // Update user session
    if (req.session.user) {
      req.session.user.botToken = encryptedToken;
      req.session.user.applicationId = applicationId;
      req.session.user.isFirstTime = false;
    }
    
    res.json({ 
      success: true, 
      message: 'Bot setup completed successfully!',
      redirectUrl: '/dashboard/control-panel'
    });
    
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Setup failed. Please try again.' 
    });
  }
});

// Bot setup helper functions
async function validateBotCredentials(token, appId) {
  try {
    console.log('🔍 Validating credentials...');
    if (token) token = token.trim().replace(/^['"`]|['"`]$/g, ''); // trim & remove accidental wrapping quotes
    console.log('Token format check:', token ? `${token.substring(0, 10)}... (len=${token.length})` : 'NO_TOKEN');
    console.log('App ID provided:', appId);
    
    // Basic format validation
    if (!token || !appId) {
      const reason = 'Missing token or application ID';
      console.log('❌', reason);
      return { valid: false, reason };
    }
    
    // Validate application ID format (Discord snowflake)
    if (!/^\d{17,19}$/.test(appId)) {
      const reason = 'Invalid application ID format';
      console.log('❌', reason);
      return { valid: false, reason };
    }
    
    // Validate bot token format
    if (token.length < 50 || !token.includes('.')) {
      const reason = 'Token format looks invalid (too short or missing segments)';
      console.log('❌', reason);
      return { valid: false, reason };
    }
    // Decode first segment (should be bot/app ID)
    let decodedId = null;
    try {
      decodedId = Buffer.from(token.split('.')[0], 'base64').toString('utf8');
      console.log('🔎 Decoded token ID:', decodedId);
      if (/^\d+$/.test(decodedId) && decodedId !== appId) {
        console.log('⚠️ Provided app ID does not match ID encoded in token');
      }
    } catch (e) {
      console.log('⚠️ Could not decode first token segment:', e.message);
    }
    
    console.log('🌐 Testing Discord API connection...');
    // Try to make a request to Discord API to validate the bot
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      method: 'GET',
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Bot validation failed:', response.status, response.statusText);
      console.log('Error details:', errorText);
      let reason = 'Discord API returned ' + response.status + ' Unauthorized. Common causes: invalid/revoked token, copied client secret instead of bot token, or extra whitespace.';
      if (decodedId && decodedId !== appId) {
        reason += ' Also: token belongs to a different application ID (' + decodedId + ').';
      }
      return { valid: false, reason };
    }
    
    const botData = await response.json();
    console.log('✅ Bot info retrieved:', botData.username);
    
    // Check if the bot's application ID matches the provided one
    console.log('🔍 Checking application ownership...');
    const appResponse = await fetch('https://discord.com/api/v10/oauth2/applications/@me', {
      method: 'GET',
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (appResponse.ok) {
      const appData = await appResponse.json();
      console.log('App data ID:', appData.id, 'vs provided:', appId);
      if (appData.id !== appId) {
        console.log('❌ Application ID mismatch:', appData.id, 'vs', appId);
        return false;
      }
    } else {
      console.log('⚠️ Could not verify app ownership, but bot token is valid');
    }
    
    // Validation successful
    console.log('✅ Bot validation successful for:', botData.username);
    return {
      valid: true,
      botId: botData.id,
      botName: botData.username,
      botDiscriminator: botData.discriminator,
      verified: botData.verified || false
    };
    
  } catch (error) {
    console.error('❌ Bot validation error:', error.message);
    return { valid: false, reason: 'Unexpected error during validation: ' + error.message };
  }
}

// legacy compatibility alias
async function encryptBotToken(token) { return encryptToken(token); }

// Function to check bot status
async function checkBotStatus(botToken, applicationId) {
  try {
    // Get real system data from SystemMonitor
    const systemStats = systemMonitor ? systemMonitor.getAllStats() : null;
    
  // Decrypt token for checking
  const token = decryptToken(botToken);
    
  // Removed demo token bypass: always perform actual API check
    
    // Make request to Discord API to check bot status
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      return {
        status: 'error',
        info: null,
        serverCount: 0,
        userCount: 0,
        uptime: null
      };
    }
    
    const botInfo = await response.json();
    
    // Get guild count from Discord API
    const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        'Authorization': `Bot ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    let serverCount = 0;
    let userCount = 0;
    
    if (guildsResponse.ok) {
      const guilds = await guildsResponse.json();
      serverCount = guilds.length;
      // Get more accurate user count from SystemMonitor or estimate
      userCount = systemStats?.botStats?.totalUsers || (serverCount * 75);
    } else {
      // Fallback to SystemMonitor data
      serverCount = systemStats?.botStats?.totalGuilds || 0;
      userCount = systemStats?.botStats?.totalUsers || 0;
    }
    
    // Use real PM2 uptime if available
    const realUptime = systemStats?.botStats?.uptime || Date.now() - (3 * 60 * 60 * 1000);
    
    return {
      status: 'online',
      info: {
        id: botInfo.id,
        username: botInfo.username,
        discriminator: botInfo.discriminator,
        avatar: botInfo.avatar,
        verified: botInfo.verified || false,
        public: botInfo.bot_public !== false
      },
      serverCount: serverCount,
      userCount: userCount,
      uptime: realUptime
    };
    
  } catch (error) {
    console.error('Bot status check error:', error);
    return {
      status: 'offline',
      info: null,
      serverCount: 0,
      userCount: 0,
      uptime: null
    };
  }
}

async function storeBotData(botData) {
  try {
    // Encrypt the bot token before storing
  const alreadyEncrypted = botData.botToken.startsWith('encrypted_') || botData.botToken.startsWith('encv1_');
  const encryptedToken = alreadyEncrypted ? botData.botToken : encryptToken(botData.botToken);
    
    // Ensure user exists first
    await prisma.user.upsert({
      where: { userId: botData.userId },
      update: {},
      create: {
        userId: botData.userId,
        username: 'Dashboard User',
        discriminator: '0000',
        premiumPlan: 'Free',
        createdAt: new Date()
      }
    });
    
    // Store or update bot instance in database
    const botInstance = await prisma.botInstance.upsert({
      where: { userId: botData.userId },
      update: {
        botToken: encryptedToken,
        applicationId: botData.applicationId,
        botName: botData.botName,
        isActive: true,
        updatedAt: new Date()
      },
      create: {
        userId: botData.userId,
        botToken: encryptedToken,
        applicationId: botData.applicationId,
        botName: botData.botName,
        isActive: true
      }
    });
    
    console.log('✅ Bot data stored in database for user:', botData.userId);
    return botInstance;
  } catch (error) {
    console.error('❌ Error storing bot data:', error);
    return null;
  }
}

async function startBotWithPM2(botData) {
  return new Promise((resolve, reject) => {
    try {
      console.log('🚀 Starting bot with PM2:', botData.botName);
      
      // Connect to PM2
      pm2.connect((err) => {
        if (err) {
          console.error('❌ PM2 connection error:', err);
          reject(err);
          return;
        }

        // Create bot instance configuration
        // Use bun to execute TypeScript directly so we avoid Node failing to load .ts modules
    const rawToken = decryptToken(botData.botToken || '');
    const botConfig = {
          name: `bot-${botData.userId}-${botData.applicationId}`,
          script: 'bun',
          args: ['run', 'src/index.ts'],
          env: {
      BOT_TOKEN: rawToken,
      DISCORD_BOT_TOKEN: rawToken, // main index.ts expects DISCORD_BOT_TOKEN
            APPLICATION_ID: botData.applicationId,
            BOT_NAME: botData.botName,
            USER_ID: botData.userId,
            PREFIX: process.env.PREFIX || '!',
            DATABASE_URL: process.env.DATABASE_URL || 'sqlite:./bot_data.db',
            GUILD_ID: process.env.GUILD_ID || '',
            GENIUS_ACCESS_TOKEN: process.env.GENIUS_ACCESS_TOKEN || '',
            DISCORD_BOT_ID: process.env.DISCORD_BOT_ID || botData.applicationId,
            LAVALINK_SERVER_HOST: process.env.LAVALINK_SERVER_HOST || '',
            LAVALINK_SERVER_PORT: process.env.LAVALINK_SERVER_PORT || '',
            LAVALINK_SERVER_PASSWORD: process.env.LAVALINK_SERVER_PASSWORD || '',
            FORCE_PREMIUM_TIER: process.env.FORCE_PREMIUM_TIER || 'premiumplus',
            ENABLE_AUTOPLAY_DEFAULT: process.env.ENABLE_AUTOPLAY_DEFAULT || '1',
            NODE_ENV: 'production'
          },
          instances: 1,
          autorestart: true,
          watch: false,
          max_memory_restart: '500M',
          exec_mode: 'fork',
          out_file: path.join(__dirname, `logs/${botData.userId}-out.log`),
          error_file: path.join(__dirname, `logs/${botData.userId}-error.log`),
          log_file: path.join(__dirname, `logs/${botData.userId}-combined.log`),
          cwd: path.join(__dirname, '..')
        };

        console.log('🔧 Bot configuration:', botConfig.name);
        
        // Start the bot with PM2
        pm2.start(botConfig, (err) => {
          if (err) {
            console.error('❌ Error starting bot with PM2:', err);
            pm2.disconnect();
            reject(err);
            return;
          }

          console.log('✅ Bot started successfully with PM2:', botConfig.name);
          console.log('🎵 Bot is now online and ready to play music!');
          
          pm2.disconnect();
          resolve(true);
        });
      });
    } catch (error) {
      console.error('❌ Error in startBotWithPM2:', error);
      reject(error);
    }
  });
}

// Redirect /plans to /dashboard/plans
app.get('/plans', (req, res) => {
  res.redirect('/dashboard/plans');
});

// Update the /dashboard/plans route to include body
app.get('/dashboard/plans', (req, res) => {
  if (!req.session?.user) {
    return res.redirect('/');
  }

  res.render('dashboard/plans', {
    title: 'Plans - PremiumPlus',
    user: req.session.user,
    isAdmin: req.session.user.isAdmin || false,
    plans: [
      {
        id: 'monthly',
        name: 'Monthly',
        price: 9.99,
        period: 'month',
        features: ['24/7 Bot Hosting', 'Premium Music Features', 'Unlimited Playlists', 'Audio Effects & Filters', 'Web Dashboard', 'Bot Customization', 'Discord Support']
      },
      {
        id: 'quarterly',
        name: '3 Months',
        price: 24.99,
        period: '3mo',
        popular: true,
        features: ['Everything in Monthly', 'Priority Support', 'Advanced Analytics', 'Custom Bot Avatar']
      },
      {
        id: 'annual',
        name: 'Annual',
        price: 79.99,
        period: 'year',
        features: ['Everything in 3-Month', 'VIP Support Channel', 'API Access', 'Beta Features Access']
      }
    ]
  });
});

// Checkout route for plan purchases
app.get('/dashboard/checkout', (req, res) => {
  if (!req.session?.user) {
    return res.redirect('/');
  }

  const { plan, method } = req.query;
  
  // For now, show a checkout page with plan details
  res.render('dashboard/checkout', {
    title: 'Checkout - PremiumPlus',
    user: req.session.user,
    selectedPlan: plan,
    paymentMethod: method,
    plans: {
      monthly: { name: 'Monthly Plan', price: '$9.99/month', features: ['24/7 Bot Hosting', 'Premium Music Features', 'Unlimited Playlists'] },
      annual: { name: 'Annual Plan', price: '$79.99/year', features: ['Everything in Monthly', 'Priority Support', 'Advanced Analytics'] },
      lifetime: { name: 'Lifetime Plan', price: '$199.99 once', features: ['Everything in Annual', 'Lifetime Updates', 'VIP Support'] }
    }
  });
});

// Route for /dashboard/control-panel
app.get('/dashboard/control-panel', async (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.redirect('/');
  }
  
  const currentUser = req.session.user || req.session.adminUser;
  
  // Create admin user session for testing if needed
  if (!currentUser && req.session.adminUser) {
    currentUser = {
      id: 'admin-as-user',
      username: 'Admin (User View)',
      hasPremium: true,
      isAdmin: true,
      botToken: 'admin-demo-token',
      applicationId: '1234567890',
      botName: 'PremiumPlus Demo Bot'
    };
  }
  
  // Only allow access for premium users or admins
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.redirect('/dashboard/plans');
  }
  
  // If user doesn't have bot setup, redirect to setup
  if (!currentUser.botToken && !currentUser.isAdmin) {
    return res.redirect('/dashboard/setup');
  }

  // Get bot status and information
  let botStatus = 'offline';
  let botInfo = null;
  let serverCount = 0;
  let userCount = 0;
  let uptime = null;
  
  if (currentUser.botToken && currentUser.applicationId) {
    try {
      // Check bot status (simulate for now)
      const statusCheck = await checkBotStatus(currentUser.botToken, currentUser.applicationId);
      botStatus = statusCheck.status;
      botInfo = statusCheck.info;
      serverCount = statusCheck.serverCount || 0;
      userCount = statusCheck.userCount || 0;
      uptime = statusCheck.uptime || null;
    } catch (error) {
      console.error('Error checking bot status:', error);
      botStatus = 'error';
    }
  }

  res.render('dashboard/control-panel', {
    title: 'Control Panel - PremiumPlus',
    user: currentUser,
    isAdmin: !!req.session?.adminUser,
    bot: {
      name: currentUser.botName || `${currentUser.username}'s Music Bot`,
      avatar: currentUser.avatar || null,
      status: botStatus,
      applicationId: currentUser.applicationId,
      serverCount: serverCount,
      userCount: userCount,
      uptime: uptime,
      isOnline: botStatus === 'online'
    },
    settings: {
      prefix: currentUser.prefix || '!',
      volume: currentUser.volume || 50,
      autoPlay: currentUser.autoPlay !== false,
      joinMessage: currentUser.joinMessage || true,
      leaveMessage: currentUser.leaveMessage || true
    },
    profile: {
      botName: currentUser.botName || `${currentUser.username}'s Music Bot`,
      avatar: currentUser.avatar || null,
      status: botStatus
    },
    subscription: {
      plan: currentUser.hasPremium ? 'Premium' : 'Free',
      expires: currentUser.premiumExpires || null
    }
  });
});

// Public /control-panel demo route removed to eliminate fake data exposure

// Route for /admin (redirect to dashboard)
app.get('/admin', requireAdminAuth, async (req, res) => {
  try {
    // Get comprehensive stats for admin dashboard
    const stats = {
      totalUsers: await prisma.user.count(),
      premiumUsers: await prisma.user.count({ where: { premiumPlus: true } }),
      totalBots: await prisma.botInstance.count(),
      totalAdmins: await prisma.admin.count()
    };

    res.render('dashboard/admin', {
      title: 'Admin Panel - PremiumPlus',
      user: req.session.adminUser,
      adminTasks: [],
      stats
    });
  } catch (error) {
    console.error('Error loading admin dashboard:', error);
    res.render('dashboard/admin', {
      title: 'Admin Panel - PremiumPlus',
      user: req.session.adminUser,
      adminTasks: [],
      stats: { totalUsers: 0, premiumUsers: 0, totalBots: 0, totalAdmins: 0 }
    });
  }
});

// Route for /dashboard/admin (legacy compatibility)
app.get('/dashboard/admin', requireAdminAuth, async (req, res) => {
  // Redirect to cleaner URL
  res.redirect('/admin');
});

// Route for /dashboard/bot-token
app.get('/dashboard/bot-token', (req, res) => {
  if (!req.session?.user) {
    return res.redirect('/');
  }

  res.render('dashboard/bot-token', {
    title: 'Bot Token Setup - PremiumPlus',
    user: req.session.user,
    isAdmin: !!req.session?.adminUser
  });
});

// Route for /dashboard/music-settings
app.get('/dashboard/music-settings', (req, res) => {
  if (!req.session?.user) {
    return res.redirect('/');
  }

  res.render('dashboard/music-settings', {
    title: 'Music Settings - PremiumPlus',
    user: req.session.user,
    isAdmin: !!req.session?.adminUser,
    settings: {}
  });
});

// Route for /dashboard/profile-customization
app.get('/dashboard/profile-customization', (req, res) => {
  if (!req.session?.user) {
    return res.redirect('/');
  }

  res.render('dashboard/profile-customization', {
    title: 'Profile Customization - PremiumPlus',
    user: req.session.user,
    isAdmin: !!req.session?.adminUser,
    profile: {}
  });
});

// Route for /dashboard/subscriptions
app.get('/dashboard/subscriptions', (req, res) => {
  if (!req.session?.user) {
    return res.redirect('/');
  }

  res.render('dashboard/subscriptions', {
    title: 'Subscriptions - PremiumPlus',
    user: req.session.user,
    isAdmin: !!req.session?.adminUser,
    subscriptions: [] // Placeholder for subscription data
  });
});

// Route for /dashboard/documentation
app.get('/dashboard/documentation', (req, res) => {
  res.render('dashboard/documentation', {
    title: 'Documentation - PremiumPlus',
    user: req.session?.user || null,
    isAdmin: !!req.session?.adminUser
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Admin logout route
app.get('/admin/logout', (req, res) => {
  if (req.session.adminUser) {
    delete req.session.adminUser;
  }
  res.redirect('/admin/login');
});

// Admin API endpoints for AJAX calls
app.get('/api/admin/stats', requireAdminAuth, async (req, res) => {
  try {
    const stats = {
      totalUsers: await prisma.user.count(),
      premiumUsers: await prisma.user.count({ where: { premiumPlus: true } }),
      totalBots: await prisma.botInstance.count(),
      totalAdmins: await prisma.admin.count()
    };

    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.json({ success: false, message: 'Failed to load stats' });
  }
});

app.get('/api/admin/users', requireAdminAuth, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        botInstance: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedUsers = users.map(user => ({
      id: user.discordId,
      username: user.username,
      email: user.email,
      isPremium: user.premiumPlus,
      botCount: user.botInstance ? 1 : 0,
      createdAt: user.createdAt
    }));

    res.json({ success: true, users: formattedUsers });
  } catch (error) {
    console.error('Error getting users:', error);
    res.json({ success: false, message: 'Failed to load users' });
  }
});

app.get('/api/admin/bots', requireAdminAuth, async (req, res) => {
  try {
    const bots = await prisma.botInstance.findMany({
      include: {
        user: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Get real PM2 process information
    const formattedBots = [];
    for (const bot of bots) {
      try {
        // Get PM2 process info if available
        const pm2Info = await new Promise((resolve) => {
          execAsync('pm2 list --no-ansi').then(({ stdout }) => {
            // Parse PM2 output to find bot process
            const lines = stdout.split('\n');
            const botLine = lines.find(line => line.includes(bot.ownerId));
            
            if (botLine) {
              const parts = botLine.split('│').map(p => p.trim());
              if (parts.length >= 10) {
                resolve({
                  status: parts[8] === 'online' ? 'online' : 'offline',
                  uptime: parts[6] || 'N/A',
                  memory: parts[10] || 'N/A',
                  cpu: parts[9] || '0%'
                });
              }
            }
            resolve(null);
          }).catch(() => resolve(null));
        });

        formattedBots.push({
          id: bot.botToken.substring(0, 24) + '...',
          ownerId: bot.ownerId,
          ownerUsername: bot.owner?.username || 'Unknown',
          status: pm2Info?.status || (bot.isActive ? 'online' : 'offline'),
          uptime: pm2Info?.uptime || 'N/A',
          memory: pm2Info?.memory || 'N/A',
          cpu: pm2Info?.cpu || '0%',
          createdAt: bot.createdAt
        });
      } catch (error) {
        // Fallback to database info
        formattedBots.push({
          id: bot.botToken.substring(0, 24) + '...',
          ownerId: bot.ownerId,
          ownerUsername: bot.owner?.username || 'Unknown',
          status: bot.isActive ? 'online' : 'offline',
          uptime: 'N/A',
          memory: 'N/A',
          cpu: '0%',
          createdAt: bot.createdAt
        });
      }
    }

    res.json({ success: true, bots: formattedBots });
  } catch (error) {
    console.error('Error getting bots:', error);
    res.json({ success: false, message: 'Failed to load bots' });
  }
});

app.post('/api/admin/add-user', requireAdminAuth, async (req, res) => {
  const { userId, username, email, isPremium } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { userId: userId }
    });

    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    await prisma.user.create({
      data: {
        userId: userId,
        username,
        email,
        premiumPlus: !!isPremium
      }
    });

    res.json({ success: true, message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.json({ success: false, message: 'Failed to add user' });
  }
});

app.post('/api/admin/toggle-premium', requireAdminAuth, async (req, res) => {
  const { userId, grantPremium } = req.body;

  try {
    await prisma.user.update({
      where: { discordId: userId },
      data: { premiumPlus: grantPremium }
    });

    const action = grantPremium ? 'granted' : 'revoked';
    res.json({ success: true, message: `Premium access ${action} for user ${userId}` });
  } catch (error) {
    console.error('Error toggling premium:', error);
    res.json({ success: false, message: 'Failed to update premium status' });
  }
});

app.post('/api/admin/suspend-user', requireAdminAuth, async (req, res) => {
  const { userId } = req.body;

  try {
    await prisma.user.update({
      where: { userId: userId },
      data: { premiumPlus: false }
    });

    await prisma.botInstance.updateMany({
      where: { userId: userId },
      data: { isActive: false }
    });

    res.json({ success: true, message: `User ${userId} has been suspended` });
  } catch (error) {
    console.error('Error suspending user:', error);
    res.json({ success: false, message: 'Failed to suspend user' });
  }
});

app.delete('/api/admin/delete-user', requireAdminAuth, async (req, res) => {
  const { userId } = req.body;

  try {
    await prisma.botInstance.deleteMany({
      where: { userId: userId }
    });

    await prisma.user.delete({
      where: { discordId: userId }
    });

    res.json({ success: true, message: `User ${userId} and all associated data deleted` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.json({ success: false, message: 'Failed to delete user' });
  }
});

app.post('/api/admin/restart-bot', requireAdminAuth, async (req, res) => {
  const { botId } = req.body;

  try {
    // This would integrate with PM2 to restart specific bot processes
    res.json({ success: true, message: `Bot ${botId} restart initiated` });
  } catch (error) {
    console.error('Error restarting bot:', error);
    res.json({ success: false, message: 'Failed to restart bot' });
  }
});

app.post('/api/admin/stop-bot', requireAdminAuth, async (req, res) => {
  const { botId } = req.body;

  try {
    await prisma.botInstance.updateMany({
      where: { 
        botToken: { startsWith: botId.substring(0, 24) }
      },
      data: { isActive: false }
    });

    res.json({ success: true, message: `Bot ${botId} stopped` });
  } catch (error) {
    console.error('Error stopping bot:', error);
    res.json({ success: false, message: 'Failed to stop bot' });
  }
});

// Admin Bot Management
app.post('/api/admin/restart-all-bots', requireAdminAuth, async (req, res) => {
  try {
    // This would restart all PM2 bot processes
    res.json({ success: true, message: 'All bots restart initiated' });
  } catch (error) {
    console.error('Error restarting all bots:', error);
    res.json({ success: false, message: 'Failed to restart all bots' });
  }
});

// Admin Payment Management
app.post('/api/admin/approve-payment', requireAdminAuth, async (req, res) => {
  const { userId, plan } = req.body;
  
  if (!userId || !plan) {
    return res.json({ 
      success: false, 
      message: 'User ID and plan are required' 
    });
  }
  
  try {
    await prisma.user.update({
      where: { userId: userId },
      data: { premiumPlus: true }
    });

    console.log(`Admin approved ${plan} payment for user ${userId}`);
    
    res.json({ 
      success: true, 
      message: `Payment approved! User ${userId} now has ${plan} access.`,
      action: 'payment_approved'
    });
  } catch (error) {
    console.error('Error approving payment:', error);
    res.json({ success: false, message: 'Failed to approve payment' });
  }
});

app.post('/api/admin/revoke-premium', requireAdminAuth, async (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.json({ 
      success: false, 
      message: 'User ID is required' 
    });
  }
  
  try {
    await prisma.user.update({
      where: { userId: userId },
      data: { premiumPlus: false }
    });

    // Stop all bots for this user
    await prisma.botInstance.updateMany({
      where: { userId: userId },
      data: { isActive: false }
    });

    console.log(`Admin revoked premium for user ${userId}`);
    
    res.json({ 
      success: true, 
      message: `Premium access revoked for user ${userId}. Bot will be stopped.`,
      action: 'premium_revoked'
    });
  } catch (error) {
    console.error('Error revoking premium:', error);
    res.json({ success: false, message: 'Failed to revoke premium' });
  }
});

app.post('/api/admin/pause-premium', requireAdminAuth, async (req, res) => {
  const { userId } = req.body;
  
  try {
    // You could add a 'paused' field to track paused subscriptions
    res.json({ 
      success: true, 
      message: `Premium subscription paused for user ${userId}` 
    });
  } catch (error) {
    console.error('Error pausing premium:', error);
    res.json({ success: false, message: 'Failed to pause premium' });
  }
});

// User Bot Management API
// User Settings API
app.post('/api/settings/update', (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  
  const { setting, value } = req.body;
  // Mock settings update
  res.json({ 
    success: true, 
    message: `${setting} updated to ${value}` 
  });
});

// Discord OAuth2 for Admin
app.get('/admin/auth/discord', (req, res) => {
  const clientId = process.env.DISCORD_CLIENT_ID || '1401323931847360623';
  const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI_ADMIN || `http://localhost:${PORT}/admin/auth/callback`);
  const scope = 'identify email';
  
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=admin_login`;
  res.redirect(discordAuthUrl);
});

app.get('/admin/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  
  if (!code || state !== 'admin_login') {
    return res.redirect('/admin/login?error=invalid_request');
  }
  
  try {
    // TODO: Implement actual Discord OAuth2 token exchange
    // For now, check if user is an admin based on Discord ID
    const ADMIN_IDS = process.env.ADMIN_IDS?.split(',') || [];
    const mockDiscordId = '730818959112274040'; // This would come from Discord API
    
    if (ADMIN_IDS.includes(mockDiscordId)) {
      req.session.adminUser = {
        id: 'admin-' + mockDiscordId,
        username: 'Admin User',
        discordId: mockDiscordId,
        avatar: null,
        isAdmin: true,
        loginTime: new Date(),
        loginMethod: 'discord'
      };
      return res.redirect('/admin');
    } else {
      return res.redirect('/admin/login?error=not_authorized');
    }
  } catch (error) {
    console.error('Admin OAuth callback error:', error);
    res.redirect('/admin/login?error=auth_failed');
  }
});

// Admin login routes
app.get('/admin/login', (req, res) => {
  res.render('admin-login', {
    title: 'Admin Login - PremiumPlus',
    error: req.query.error || null,
    success: req.query.success || null,
    email: req.query.email || ''
  });
});

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Check if email is provided
  if (!email) {
    return res.redirect('/admin/login?error=email_required');
  }
  
  // Normalize email to lowercase for consistent checking
  const normalizedEmail = email.toLowerCase().trim();
  
  try {
    // HARD CHECK: Verify if this email is approved by master admin
    const isApproved = await isApprovedAdmin(normalizedEmail);
    if (!isApproved) {
      console.log(`🚫 Unauthorized admin login attempt: ${normalizedEmail}`);
      return res.redirect('/admin/login?error=admin_access_only');
    }
  
    const adminData = await prisma.admin.findUnique({
      where: { email: normalizedEmail }
    });
    
    if (!adminData) {
      return res.redirect('/admin/login?error=admin_not_found');
    }
  
    // Check if admin is registered
    if (!adminData.isRegistered) {
      return res.redirect(`/admin/register?email=${encodeURIComponent(normalizedEmail)}`);
    }
  
    // Password is required for registered admins
    if (!password) {
      return res.redirect('/admin/login?error=password_required');
    }
    
    // Validate password
    const isValidPassword = await validateAdminPassword(normalizedEmail, password);
    if (isValidPassword) {
      // Successful password login
      req.session.adminUser = {
        id: 'admin-' + normalizedEmail.split('@')[0],
        username: 'Admin',
        email: normalizedEmail,
        role: adminData.role,
        isAdmin: true,
        isMaster: isMasterAdmin(normalizedEmail),
        loginTime: new Date(),
        loginMethod: 'password'
      };
      return res.redirect('/admin');
    } else {
      return res.redirect('/admin/login?error=invalid_credentials');
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return res.redirect('/admin/login?error=server_error');
  }
});

// Admin Registration Routes
app.get('/admin/register', async (req, res) => {
  const { email } = req.query;
  
  if (!email || !(await isApprovedAdmin(email))) {
    return res.redirect('/admin/login?error=admin_access_only');
  }
  
  try {
    const adminData = await prisma.admin.findUnique({
      where: { email: email }
    });
    
    if (adminData && adminData.isRegistered) {
      return res.redirect('/admin/login');
    }
    
    res.render('admin-register', {
      title: 'Admin Registration',
      email: email,
      error: req.query.error || null
    });
  } catch (error) {
    console.error('Admin register get error:', error);
    return res.redirect('/admin/login?error=server_error');
  }
});

app.post('/admin/register', async (req, res) => {
  const { email } = req.body;
  
  if (!email || !(await isApprovedAdmin(email))) {
    return res.redirect('/admin/login?error=admin_access_only');
  }
  
  try {
    const adminData = await prisma.admin.findUnique({
      where: { email: email }
    });
    
    if (!adminData) {
      return res.redirect('/admin/login?error=admin_not_found');
    }
    
    if (adminData.isRegistered) {
      return res.redirect('/admin/login');
    }
    
    // Generate 6-digit verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const codeExpiry = Date.now() + (10 * 60 * 1000); // 10 minutes
    
    // Store the code
    adminLoginCodes.set(email, { code: verificationCode, expiry: codeExpiry });
    
    // Send verification code via Gmail
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'PremiumPlus Admin Registration - Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">🎉 Welcome to PremiumPlus Admin Panel</h2>
          <p>You have been approved as an admin by <strong>${adminData.approvedBy || 'Master Admin'}</strong>.</p>
          <p>Your verification code is:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #1f2937; margin: 0; font-size: 32px; letter-spacing: 8px;">${verificationCode}</h1>
          </div>
          <p style="color: #6b7280;">This code will expire in 10 minutes.</p>
          <p>After verification, you'll set up your admin password.</p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    
    // Redirect to verification page
    res.redirect(`/admin/verify-registration?email=${encodeURIComponent(email)}`);
    
  } catch (error) {
    console.error('Admin registration email error:', error);
    res.redirect(`/admin/register?email=${encodeURIComponent(email)}&error=email_failed`);
  }
});

// Admin Registration Verification
app.get('/admin/verify-registration', async (req, res) => {
  const { email } = req.query;
  if (!email || !(await isApprovedAdmin(email))) {
    return res.redirect('/admin/login');
  }
  
  res.render('admin-verify-registration', {
    title: 'Verify Registration',
    email: email,
    error: req.query.error || null
  });
});

app.post('/admin/verify-registration', (req, res) => {
  const { email, code } = req.body;
  
  const storedData = adminLoginCodes.get(email);
  if (!storedData || Date.now() > storedData.expiry) {
    adminLoginCodes.delete(email);
    return res.redirect(`/admin/verify-registration?email=${encodeURIComponent(email)}&error=code_expired`);
  }
  
  if (storedData.code !== code) {
    return res.redirect(`/admin/verify-registration?email=${encodeURIComponent(email)}&error=invalid_code`);
  }
  
  // Success - redirect to password setup
  adminLoginCodes.delete(email);
  req.session.tempAdminEmail = email;
  res.redirect('/admin/setup-password');
});

// Password Reset Routes
app.get('/admin/forgot-password', (req, res) => {
  res.render('admin-forgot-password', {
    title: 'Reset Password',
    error: req.query.error || null,
    success: req.query.success || null
  });
});

app.post('/admin/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  if (!email || !(await isApprovedAdmin(email))) {
    return res.redirect('/admin/forgot-password?error=admin_access_only');
  }
  
  try {
    const adminData = await prisma.admin.findUnique({
      where: { email: email }
    });
    
    if (!adminData) {
      return res.redirect('/admin/forgot-password?error=admin_not_found');
    }
    
    if (!adminData.isRegistered) {
      return res.redirect('/admin/forgot-password?error=not_registered');
    }
    
    if (!canResetPassword(email)) {
      return res.redirect('/admin/forgot-password?error=limit_exceeded');
    }
    
    incrementPasswordResetAttempts(email);
    
    // Generate reset code
    const resetCode = crypto.randomInt(100000, 999999).toString();
    const codeExpiry = Date.now() + (15 * 60 * 1000); // 15 minutes
    
    passwordResetCodes.set(email, { code: resetCode, expiry: codeExpiry });
    
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'PremiumPlus Admin - Password Reset Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">🔐 Password Reset Request</h2>
          <p>You requested to reset your admin password.</p>
          <p>Your password reset code is:</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #1f2937; margin: 0; font-size: 32px; letter-spacing: 8px;">${resetCode}</h1>
          </div>
          <p style="color: #6b7280;">This code will expire in 15 minutes.</p>
          <p style="color: #dc2626; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    
    res.redirect(`/admin/reset-password?email=${encodeURIComponent(email)}`);
    
  } catch (error) {
    console.error('Password reset email error:', error);
    res.redirect('/admin/forgot-password?error=email_failed');
  }
});

app.get('/admin/reset-password', async (req, res) => {
  const { email } = req.query;
  if (!email || !(await isApprovedAdmin(email))) {
    return res.redirect('/admin/forgot-password');
  }
  
  res.render('admin-reset-password', {
    title: 'Reset Password',
    email: email,
    error: req.query.error || null
  });
});

app.post('/admin/reset-password', async (req, res) => {
  const { email, code, password, confirmPassword } = req.body;
  
  if (!email || !(await isApprovedAdmin(email))) {
    return res.redirect('/admin/forgot-password');
  }
  
  const storedData = passwordResetCodes.get(email);
  if (!storedData || Date.now() > storedData.expiry) {
    passwordResetCodes.delete(email);
    return res.redirect(`/admin/reset-password?email=${encodeURIComponent(email)}&error=code_expired`);
  }
  
  if (storedData.code !== code) {
    return res.redirect(`/admin/reset-password?email=${encodeURIComponent(email)}&error=invalid_code`);
  }
  
  if (!password || password.length < 8) {
    return res.redirect(`/admin/reset-password?email=${encodeURIComponent(email)}&error=password_too_short`);
  }
  
  if (password !== confirmPassword) {
    return res.redirect(`/admin/reset-password?email=${encodeURIComponent(email)}&error=passwords_dont_match`);
  }
  
  try {
    await setAdminPassword(email, password);
    passwordResetCodes.delete(email);
    
    res.redirect('/admin/login?success=password_reset');
    
  } catch (error) {
    console.error('Password reset error:', error);
    res.redirect(`/admin/reset-password?email=${encodeURIComponent(email)}&error=reset_failed`);
  }
});

// Admin code verification
app.get('/admin/verify', async (req, res) => {
  const { email, first_time } = req.query;
  if (!email || !(await isApprovedAdmin(email))) {
    return res.redirect('/admin/login');
  }
  
  res.render('admin-verify', {
    title: 'Verify Admin Login',
    email: email,
    isFirstTime: first_time === 'true',
    error: req.query.error || null
  });
});

app.post('/admin/verify', async (req, res) => {
  const { email, code } = req.body;
  
  const storedData = adminLoginCodes.get(email);
  if (!storedData || Date.now() > storedData.expiry) {
    adminLoginCodes.delete(email);
    return res.redirect(`/admin/verify?email=${encodeURIComponent(email)}&error=code_expired`);
  }
  
  if (storedData.code !== code) {
    return res.redirect(`/admin/verify?email=${encodeURIComponent(email)}&error=invalid_code`);
  }
  
  try {
    // Success - check if first time setup
    adminLoginCodes.delete(email);
    const adminData = await prisma.admin.findUnique({
      where: { email: email }
    });
    
    if (!adminData) {
      return res.redirect('/admin/login?error=admin_not_found');
    }
    
    if (!adminData.isRegistered) {
      // First time - redirect to password setup
      req.session.tempAdminEmail = email;
      return res.redirect('/admin/setup-password');
    } else {
      // Regular login
      req.session.adminUser = { 
        id: 'admin-' + email.split('@')[0],
        username: 'Admin',
        email: email,
        role: adminData.role,
        isAdmin: true,
        isMaster: isMasterAdmin(email),
        loginTime: new Date(),
        loginMethod: 'otp'
      };
      
      res.redirect('/dashboard/admin');
    }
  } catch (error) {
    console.error('Admin verify error:', error);
    return res.redirect(`/admin/verify?email=${encodeURIComponent(email)}&error=server_error`);
  }
});

// Admin password setup (first time)
app.get('/admin/setup-password', (req, res) => {
  if (!req.session.tempAdminEmail) {
    return res.redirect('/admin/login');
  }
  
  res.render('admin-setup-password', {
    title: 'Set Admin Password',
    email: req.session.tempAdminEmail,
    error: req.query.error || null
  });
});

app.post('/admin/setup-password', async (req, res) => {
  const { password, confirmPassword } = req.body;
  const email = req.session.tempAdminEmail;
  
  if (!email) {
    return res.redirect('/admin/login');
  }
  
  if (!password || password.length < 8) {
    return res.redirect('/admin/setup-password?error=password_too_short');
  }
  
  if (password !== confirmPassword) {
    return res.redirect('/admin/setup-password?error=passwords_dont_match');
  }
  
  try {
    await setAdminPassword(email, password);
    
    // Create admin session
    const adminData = await prisma.admin.findUnique({
      where: { email: email }
    });
    
    if (!adminData) {
      return res.redirect('/admin/login?error=admin_not_found');
    }
    
    req.session.adminUser = {
      id: 'admin-' + email.split('@')[0],
      username: 'Admin',
      email: email,
      role: adminData.role,
      isAdmin: true,
      isMaster: isMasterAdmin(email),
      loginTime: new Date(),
      loginMethod: 'first_setup'
    };
    
    delete req.session.tempAdminEmail;
    res.redirect('/admin');
    
  } catch (error) {
    console.error('Password setup error:', error);
    res.redirect('/admin/setup-password?error=setup_failed');
  }
});

// Admin Management API endpoints
app.get('/api/admin/approved-admins', requireAdminAuth, async (req, res) => {
  if (!req.session.adminUser.isMaster) {
    return res.status(403).json({ success: false, message: 'Master admin access required' });
  }
  
  try {
    const adminsList = await prisma.admin.findMany({
      select: {
        email: true,
        role: true,
        approvedBy: true,
        createdAt: true,
        isRegistered: true
      }
    });
    
    const formattedAdmins = adminsList.map(admin => ({
      email: admin.email,
      role: admin.role,
      approvedBy: admin.approvedBy,
      approvedAt: admin.createdAt,
      isSetup: admin.isRegistered
    }));
    
    res.json({ success: true, admins: formattedAdmins });
  } catch (error) {
    console.error('Error fetching approved admins:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/admin/add-admin', requireAdminAuth, async (req, res) => {
  if (!req.session.adminUser.isMaster) {
    return res.status(403).json({ success: false, message: 'Master admin access required' });
  }
  
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.json({ success: false, message: 'Valid email is required' });
  }
  
  if (await isApprovedAdmin(email)) {
    return res.json({ success: false, message: 'Admin already exists' });
  }
  
  // Add to approved admins
  addApprovedAdmin(email, req.session.adminUser.email);
  
  // Send welcome email
  try {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: 'Welcome to PremiumPlus Admin Panel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">🎉 Welcome to PremiumPlus Admin Panel</h2>
          <p>You have been granted admin access to the PremiumPlus Dashboard by <strong>${req.session.adminUser.email}</strong>.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>What's next?</strong></p>
            <ol>
              <li>Visit the admin login page: <a href="${process.env.DASHBOARD_URL}/admin/login">Login Here</a></li>
              <li>Enter your email address</li>
              <li>Check your email for a verification code</li>
              <li>Set up your admin password on first login</li>
            </ol>
          </div>
          <p style="color: #6b7280; font-size: 12px;">This access was granted on ${new Date().toLocaleString()}.</p>
        </div>
      `
    };
    
    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Welcome email error:', error);
  }
  
  res.json({ 
    success: true, 
    message: `Admin access granted to ${email}. Welcome email sent.` 
  });
});

app.post('/api/admin/remove-admin', requireAdminAuth, async (req, res) => {
  if (!req.session.adminUser.isMaster) {
    return res.status(403).json({ success: false, message: 'Master admin access required' });
  }
  
  const { email } = req.body;
  
  if (email === MASTER_ADMIN_EMAIL) {
    return res.json({ success: false, message: 'Cannot remove master admin' });
  }
  
  if (!(await isApprovedAdmin(email))) {
    return res.json({ success: false, message: 'Admin not found' });
  }
  
  try {
    await prisma.admin.delete({
      where: { email: email }
    });
    
    res.json({ 
      success: true, 
      message: `Admin access revoked for ${email}` 
    });
  } catch (error) {
    console.error('Error removing admin:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
// (Moved 404 handler to end so later routes like monitoring/SSE are reachable)

// Bot Control API Routes
app.post('/api/bot/start', async (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const currentUser = req.session.user || req.session.adminUser;
  
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.status(403).json({ success: false, message: 'Premium required' });
  }

  try {
    console.log('Loading: Starting bot...');
    
    // Check if bot is already configured
    if (!currentUser.botToken || !currentUser.applicationId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Bot not configured. Please set up your bot first.' 
      });
    }

    // Use existing startBotWithPM2 function
    const botData = {
      userId: currentUser.id,
      applicationId: currentUser.applicationId,
      botToken: currentUser.botToken,
      botName: currentUser.botName || `${currentUser.username}'s Music Bot`
    };

    const result = await startBotWithPM2(botData);
    
    if (result) {
      console.log('✅ Bot started successfully for', currentUser.username);
      res.json({ 
        success: true, 
        message: 'Bot started successfully',
        status: 'online' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to start bot',
        status: 'error'
      });
    }
  } catch (error) {
    console.error('Error starting bot:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      status: 'error'
    });
  }
});

app.post('/api/bot/stop', (req, res) => {
  // Allow demo access without authentication
  if (!req.session?.user && !req.session?.adminUser) {
    return res.json({ 
      success: true, 
      message: 'Demo: Bot stopped successfully',
      status: 'stopped' 
    });
  }

  const currentUser = req.session.user || req.session.adminUser;
  
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.status(403).json({ success: false, message: 'Premium required' });
  }

  // TODO: Implement actual bot stopping logic
  console.log('Stopping bot for user:', currentUser.username);
  
  res.json({ 
    success: true, 
    message: 'Bot stopped successfully',
    status: 'stopped' 
  });
});

app.post('/api/bot/restart', (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const currentUser = req.session.user || req.session.adminUser;
  
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.status(403).json({ success: false, message: 'Premium required' });
  }

  // TODO: Implement actual bot restarting logic
  console.log('Restarting bot for user:', currentUser.username);
  
  res.json({ 
    success: true, 
    message: 'Bot restart initiated',
    status: 'restarting' 
  });
});

app.get('/api/bot/status', async (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const currentUser = req.session.user || req.session.adminUser;
  
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.status(403).json({ success: false, message: 'Premium required' });
  }

  try {
    // Check actual bot status
    if (currentUser.botToken && currentUser.applicationId) {
      const statusCheck = await checkBotStatus(currentUser.botToken, currentUser.applicationId);
      
      res.json({
        success: true,
        status: statusCheck.status,
        serverCount: statusCheck.serverCount,
        userCount: statusCheck.userCount,
        uptime: statusCheck.uptime,
        botInfo: statusCheck.info
      });
    } else {
      res.json({
        success: true,
        status: 'not_configured',
        message: 'Bot not configured yet'
      });
    }
  } catch (error) {
    console.error('Bot status check error:', error);
    res.json({
      success: false,
      status: 'error',
      message: 'Failed to check bot status'
    });
  }
});

app.post('/api/bot/settings', (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const currentUser = req.session.user || req.session.adminUser;
  
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.status(403).json({ success: false, message: 'Premium required' });
  }

  const { prefix, volume, autoPlay, joinMessage, leaveMessage } = req.body;
  
  // Update user settings (in production, save to database)
  if (req.session.user) {
    req.session.user.prefix = prefix;
    req.session.user.volume = parseInt(volume);
    req.session.user.autoPlay = autoPlay;
    req.session.user.joinMessage = joinMessage;
    req.session.user.leaveMessage = leaveMessage;
  }

  console.log('Updated bot settings for user:', currentUser.username, {
    prefix, volume, autoPlay, joinMessage, leaveMessage
  });

  // TODO: Apply settings to actual bot
  
  res.json({ 
    success: true, 
    message: 'Settings updated successfully' 
  });
});

// Bot Customization API Endpoints
app.post('/api/bot/update-profile', (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const currentUser = req.session.user || req.session.adminUser;
  
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.status(403).json({ success: false, message: 'Premium required' });
  }

  const { botName, avatarUrl, status, activity } = req.body;
  const requestId = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  
  // Update bot profile (in production, save to database and apply to bot)
  if (req.session.user) {
    req.session.user.botName = botName;
    req.session.user.avatarUrl = avatarUrl;
    req.session.user.botStatus = status;
    req.session.user.botActivity = activity;
  }

  console.log('🤖 Updated bot profile for user:', currentUser.username, { botName, avatarUrl, status, activity });

  // Send IPC message to bot process so it can update live
  try {
    pm2.connect(err => {
      if (err) return;
      pm2.list((err, list) => {
        if (err) { pm2.disconnect(); return; }
        const target = list.find(p => p.name && p.name.startsWith(`bot-${currentUser.id}`));
        if (target) {
          pm2.sendDataToProcessId(target.pm_id, {
            type: 'process:msg',
            data: { action: 'updateProfile', botName, avatarUrl, requestId },
            topic: 'bot-control'
          }, ()=>{});
        }
        pm2.disconnect();
      });
    });
  } catch {}

  // Immediately query updated profile (fire and wait briefly)
  setTimeout(()=>queryBotProfile(currentUser.id, requestId).then(profile=>{
    res.json({ success:true, message:'Bot profile updated successfully', profile });
  }).catch(()=>res.json({ success:true, message:'Bot profile updated (pending fetch)' })), 800);
});

app.post('/api/bot/update-presence', (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const currentUser = req.session.user || req.session.adminUser;
  
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.status(403).json({ success: false, message: 'Premium required' });
  }

  const { status, activity, activityType } = req.body;
  const requestId = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  
  // Valid status: online, idle, dnd, invisible
  // Valid activity types: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING
  
  console.log('👤 Updating bot presence for user:', currentUser.username, { status, activity, activityType });
  // Relay to bot process
  try {
    pm2.connect(err => {
      if (err) return;
      pm2.list((err, list) => {
        if (err) { pm2.disconnect(); return; }
        const target = list.find(p => p.name && p.name.startsWith(`bot-${currentUser.id}`));
        if (target) {
          pm2.sendDataToProcessId(target.pm_id, {
            type: 'process:msg',
            data: { action: 'updatePresence', status, activity, activityType, requestId },
            topic: 'bot-control'
          }, ()=>{});
        }
        pm2.disconnect();
      });
    });
  } catch {}

  setTimeout(()=>queryBotProfile(currentUser.id, requestId).then(profile=>{
    res.json({ success:true, message:'Bot presence updated successfully', profile });
  }).catch(()=>res.json({ success:true, message:'Bot presence update sent (pending fetch)' })), 600);
});

app.get('/api/bot/profile', (req, res) => {
  if (!req.session?.user && !req.session?.adminUser) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const currentUser = req.session.user || req.session.adminUser;
  
  if (!currentUser.hasPremium && !currentUser.isAdmin) {
    return res.status(403).json({ success: false, message: 'Premium required' });
  }

  res.json({
    success: true,
    profile: {
      botName: currentUser.botName || `${currentUser.username}'s Music Bot`,
      avatarUrl: currentUser.avatarUrl || null,
      status: currentUser.botStatus || 'online',
      activity: currentUser.botActivity || 'Playing music',
      applicationId: currentUser.applicationId,
      isOnline: true // TODO: Check actual bot status
    }
  });
});

// Monitoring API Endpoints
app.get('/api/monitoring/system/stats', requireAdminAuth, (req, res) => {
  try {
    const stats = systemMonitor.getAllStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('System stats API error:', error);
    res.status(500).json({ success: false, message: 'Failed to get system stats' });
  }
});

app.get('/api/monitoring/database/stats', requireAdminAuth, async (req, res) => {
  try {
    const stats = await systemMonitor.getDatabaseStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Database stats API error:', error);
    res.status(500).json({ success: false, message: 'Failed to get database stats' });
  }
});

app.get('/api/monitoring/dashboard/realtime', async (req, res) => {
  try {
    const isAdmin = !!req.session?.adminUser;
    const userId = req.session?.user?.id;
    let data = {};
    
    if (isAdmin) {
      // Admin gets full system stats
      const systemStats = systemMonitor.getAllStats();
      const dbStats = await systemMonitor.getDatabaseStats();
      
      data = {
        system: systemStats.system,
        database: dbStats,
        bots: systemStats.bots,
        timestamp: Date.now()
      };
    } else if (userId) {
      // Regular user gets only their bot stats (no fake fallback)
      const botStats = systemMonitor.getBotStats(userId);
      data = {
        bot: botStats,
        timestamp: Date.now()
      };
    } else {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    res.json({ success: true, data });
  } catch (error) {
    console.error('Realtime dashboard API error:', error);
    res.status(500).json({ success: false, message: 'Failed to get realtime data' });
  }
});

// Debug endpoint for testing SystemMonitor
app.get('/api/monitoring/test', async (req, res) => {
  try {
    const systemStats = systemMonitor.getAllStats();
    const dbStats = await systemMonitor.getDatabaseStats();
    
    res.json({
      success: true,
      data: {
        system: systemStats.system,
        database: dbStats,
        bots: systemStats.bots,
        timestamp: Date.now()
      }
    });
  } catch (error) {
    console.error('SystemMonitor test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Server-Sent Events endpoint for real-time updates
app.get('/api/monitoring/sse/dashboard', (req, res) => {
  console.log('🔌 SSE connection requested');
  console.log('Session admin:', !!req.session?.adminUser);
  console.log('Session user:', !!req.session?.user);
  
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control'
  });

  const isAdmin = !!req.session?.adminUser;
  const userId = req.session?.user?.id;

  // Send initial data
  const sendUpdate = async () => {
    try {
      let data = {};
      
      if (isAdmin) {
        const systemStats = systemMonitor.getAllStats();
        const dbStats = await systemMonitor.getDatabaseStats();
        // Also attach per-bot PM2 resource stats
        data = {
          system: systemStats.system,
          database: dbStats,
          bots: systemStats.bots,
          timestamp: Date.now()
        };
      } else if (userId) {
        const botStats = systemMonitor.getBotStats(userId);
        data = { bot: botStats, timestamp: Date.now() };
      } else {
        data = { error: 'unauthorized', timestamp: Date.now() };
      }
      
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (error) {
      console.error('SSE update error:', error);
      // Send error data
      res.write(`data: ${JSON.stringify({ error: error.message, timestamp: Date.now() })}\n\n`);
    }
  };

  // Send updates every 5 seconds
  sendUpdate();
  const interval = setInterval(sendUpdate, 5000);
  // Lightweight metrics ping every 8s via PM2 query for user's bot (if user) or all (if admin)
  const metricsInterval = setInterval(()=>{
    try {
      if (!isAdmin && !userId) return;
      pm2.connect(err => {
        if (err) return;
        pm2.list((err, list)=>{
          if (err) { pm2.disconnect(); return; }
          const procs = isAdmin ? list : list.filter(p=>p.name && p.name.startsWith(`bot-${userId}`));
          const metrics = procs.map(p=>({ name: p.name, cpu: p.monit?.cpu, memory: p.monit?.memory }));
          res.write(`event: metrics\n` + `data: ${JSON.stringify({ metrics, ts: Date.now() })}\n\n`);
          pm2.disconnect();
        });
      });
    } catch {}
  }, 8000);

  // Cleanup on client disconnect
  const cleanup = ()=>{ clearInterval(interval); clearInterval(metricsInterval); };
  req.on('close', cleanup);
  req.on('end', cleanup);

});

// Simple JSON endpoint to verify monitoring routes availability
app.get('/api/monitoring/health', (req,res)=>{
  res.json({ ok:true, time: Date.now() });
});

// Admin: list all bot processes with metrics
app.get('/api/admin/bots', requireAdminAuth, (req, res) => {
  try {
    const all = systemMonitor.getAllStats();
    res.json({ success: true, bots: all.bots.list || [] });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to fetch bots', error: e.message });
  }
});

// Admin: live bot profile from process
app.get('/api/admin/bots/:userId/profile', requireAdminAuth, async (req, res) => {
  const { userId } = req.params;
  const requestId = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  try {
    const profile = await queryBotProfile(userId, requestId, 1500);
    if (!profile) return res.status(404).json({ success:false, message:'Bot profile not available' });
    res.json({ success:true, profile });
  } catch (e) {
    res.status(500).json({ success:false, message:'Failed to fetch profile', error: e.message });
  }
});

// Utility: query live profile/metrics via PM2 IPC
function queryBotProfile(userId, requestId, timeout=1200) {
  return new Promise((resolve, reject)=>{
    pm2.connect(err => {
      if (err) return reject(err);
      pm2.list((err, list)=>{
        if (err) { pm2.disconnect(); return reject(err); }
        const target = list.find(p=>p.name && p.name.startsWith(`bot-${userId}`));
        if (!target) { pm2.disconnect(); return resolve(null); }
        let done = false;
        const onMessage = (packet) => {
          if (!packet || packet.type !== 'process:msg' || !packet.data) return;
          if (packet.data.action === 'profileData' && packet.data.requestId === requestId) {
            done = true;
            pm2.removeListener('process:msg', onMessage);
            pm2.disconnect();
            resolve(packet.data);
          }
        };
        pm2.on('process:msg', onMessage);
        pm2.sendDataToProcessId(target.pm_id, { type:'process:msg', data:{ action:'queryProfile', requestId }, topic:'bot-control' }, ()=>{});
        setTimeout(()=>{
          if (!done) {
            pm2.removeListener('process:msg', onMessage);
            pm2.disconnect();
            resolve(null);
          }
        }, timeout);
      });
    });
  });
}

// Admin: restart a specific bot by userId
app.post('/api/admin/bots/:userId/restart', requireAdminAuth, async (req, res) => {
  const { userId } = req.params;
  try {
    pm2.connect(err => {
      if (err) return res.status(500).json({ success:false, message:'PM2 connect failed'});
      pm2.list((err, list) => {
        if (err) { pm2.disconnect(); return res.status(500).json({ success:false, message:'PM2 list failed'}); }
        const proc = list.find(p => p.name && p.name.startsWith(`bot-${userId}`));
        if (!proc) { pm2.disconnect(); return res.status(404).json({ success:false, message:'Bot process not found'}); }
        pm2.restart(proc.pm_id, (err) => {
          pm2.disconnect();
          if (err) return res.status(500).json({ success:false, message:'Restart failed'});
          res.json({ success:true, message:'Bot restart triggered'});
        });
      });
    });
  } catch (e) {
    res.status(500).json({ success:false, message:'Error', error:e.message });
  }
});

// User: update bot token & application id (encryption helpers defined earlier)

app.post('/api/bot/credentials', (req, res) => {
  if (!req.session?.user) return res.status(401).json({ success:false, message:'Unauthorized'});
  const { token, applicationId, botName } = req.body || {};
  if (!token || !applicationId) return res.status(400).json({ success:false, message:'token and applicationId required'});
  // Store encrypted token
  const encrypted = encryptToken(token);
  prisma.botInstance.upsert({
    where: { userId: req.session.user.id },
    update: { botToken: encrypted, applicationId, botName: botName || undefined, updatedAt: new Date() },
    create: { userId: req.session.user.id, botToken: encrypted, applicationId, botName: botName || null, isActive: true }
  }).then(async () => {
    // Optionally restart bot with new credentials
    try {
      await startBotWithPM2({
        userId: req.session.user.id,
        botToken: encrypted,
        applicationId,
        botName: botName || (req.session.user.username + ' Bot')
      });
    } catch {}
    // Update session for quick status checks
    req.session.user.botToken = encrypted;
    req.session.user.applicationId = applicationId;
    res.json({ success:true, message:'Credentials updated; bot (re)started' });
  }).catch(err => {
    console.error('Credential update error:', err);
    res.status(500).json({ success:false, message:'Failed to update credentials'});
  });
});

// User: delete bot (stop process & remove record)
app.delete('/api/bot', (req, res) => {
  if (!req.session?.user) return res.status(401).json({ success:false, message:'Unauthorized'});
  const userId = req.session.user.id;
  pm2.connect(err => {
    if (err) return res.status(500).json({ success:false, message:'PM2 connect failed'});
    pm2.list((err, list) => {
      if (!err) {
        const proc = list.find(p => p.name && p.name.startsWith(`bot-${userId}`));
        if (proc) {
          pm2.delete(proc.pm_id, () => {});
        }
      }
      pm2.disconnect();
      prisma.botInstance.delete({ where: { userId } }).catch(()=>{}).finally(()=>{
        res.json({ success:true, message:'Bot removed' });
      });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PremiumPlus Dashboard running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Discord Client ID: ${process.env.DISCORD_CLIENT_ID || '1401323931847360623'}`);
  console.log(`✅ Ready to accept connections!`);
});

export default app;

// Final 404 handler (after all routes including SSE & monitoring)
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success:false, message:'Endpoint not found'});
  }
  res.status(404).render('404', { title:'404 Not Found', message:'Page not found'});
});
