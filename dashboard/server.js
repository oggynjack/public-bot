import express from 'express';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import next from 'next';

// Route imports
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import apiRoutes from './routes/api.js';
import webhookRoutes from './routes/webhooks.js';

// Middleware imports
import { requireAuth, requireAdmin } from './middleware/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './next-app' });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Redis client for sessions
    const redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        password: process.env.REDIS_PASSWORD
    });

    redisClient.connect().catch(console.error);

    // Security middleware
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://cdnjs.cloudflare.com"],
                scriptSrc: ["'self'", "https://cdn.tailwindcss.com", "https://js.stripe.com"],
                imgSrc: ["'self'", "data:", "https://cdn.discordapp.com"],
                connectSrc: ["'self'", "https://discord.com", "https://api.stripe.com"],
                frameSrc: ["https://js.stripe.com"]
            }
        }
    }));

    // CORS configuration
    app.use(cors({
        origin: process.env.DASHBOARD_URL || 'https://bot.nav-code.com',
        credentials: true
    }));

    // Rate limiting
    const limiter = rateLimit({
        windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
        max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
        message: 'Too many requests from this IP, please try again later.'
    });

    app.use(limiter);

    // Body parsing middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Session configuration
    app.use(session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET || 'change-this-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        },
        name: 'premiumplus.sid'
    }));

    // Static files
    // app.use(express.static(path.join(__dirname, 'public')));

    // View engine
    // app.set('view engine', 'ejs');
    // app.set('views', path.join(__dirname, 'views'));

    // Make user available in all templates
    app.use((req, res, next) => {
        // res.locals.user = req.session.user || null;
        // res.locals.isAdmin = req.session.user?.isAdmin || false;
        next();
    });

    // Routes
    app.use('/auth', authRoutes);
    // app.use('/dashboard', requireAuth, dashboardRoutes);
    app.use('/admin', requireAuth, requireAdmin, adminRoutes);
    app.use('/api', apiRoutes);
    app.use('/webhooks', webhookRoutes);

    // Home route
    // app.get('/', (req, res) => {
    //     if (req.session.user) {
    //         return res.redirect('/dashboard');
    //     }
    //     res.render('index', {
    //         title: 'PremiumPlus Music Bot Hosting',
    //         description: 'Host your own Discord music bot with premium features'
    //     });
    // });

    // Health check
    app.get('/health', (req, res) => {
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    });

    // all other requests are handled by Next.js
    app.all('*', (req, res) => {
        return nextHandler(req, res);
    });


    // 404 handler
    // app.use((req, res) => {
    //     res.status(404).render('errors/404', {
    //         title: 'Page Not Found',
    //         url: req.url
    //     });
    // });

    // Error handler
    app.use(errorHandler);

    // SSL configuration
    const sslOptions = {
        key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY_PATH || '../ssl/private.key')),
        cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CERT_PATH || '../ssl/certificate.crt')),
        ca: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CA_PATH || '../ssl/ca_bundle.crt'))
    };

    // Start HTTPS server
    const server = https.createServer(sslOptions, app);

    server.listen(PORT, () => {
        console.log(`🚀 Dashboard server running on https://bot.nav-code.com:${PORT}`);
        console.log(`🔒 SSL enabled with certificates from ssl/ folder`);
        console.log(`🎵 PremiumPlus Music Bot Dashboard is ready!`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully...');
        server.close(() => {
            redisClient.quit();
            process.exit(0);
        });
    });

    // export default app;
});
