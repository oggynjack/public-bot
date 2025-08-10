import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requirePremiumPlus } from '../middleware/auth.js';
import { BotManager } from '../services/BotManager.js';
import { ValidationError } from '../middleware/errorHandler.js';

const router = express.Router();
const prisma = new PrismaClient();
const botManager = new BotManager();

// Dashboard home
router.get('/', async (req, res) => {
    try {
        const user = req.session.user;
        
        // Check premium status
        if (!user.premiumPlus) {
            return res.redirect('/dashboard/plans');
        }
        
        // Get bot instance
        const botInstance = await prisma.botInstance.findUnique({
            where: { userId: user.id }
        });
        
        if (!botInstance) {
            return res.redirect('/dashboard/setup');
        }
        
        // Get bot status from PM2
        const botStatus = await botManager.getBotStatus(user.id);
        
        // Get bot stats
        const stats = await botManager.getBotStats(user.id);
        
        res.render('dashboard/index', {
            title: 'Dashboard',
            user,
            botInstance,
            botStatus,
            stats
        });
        
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).render('errors/error', {
            title: 'Dashboard Error',
            status: 500,
            message: 'Failed to load dashboard'
        });
    }
});

// Bot setup (first-time)
router.get('/setup', async (req, res) => {
    try {
        const user = req.session.user;
        
        if (!user.premiumPlus) {
            return res.redirect('/dashboard/plans');
        }
        
        // Check if already setup
        const existingBot = await prisma.botInstance.findUnique({
            where: { userId: user.id }
        });
        
        if (existingBot) {
            return res.redirect('/dashboard');
        }
        
        res.render('dashboard/setup', {
            title: 'Bot Setup',
            user
        });
        
    } catch (error) {
        console.error('Setup page error:', error);
        res.status(500).render('errors/error', {
            title: 'Setup Error',
            status: 500,
            message: 'Failed to load setup page'
        });
    }
});

// Process bot setup
router.post('/setup', requirePremiumPlus, async (req, res) => {
    try {
        const { botToken, applicationId } = req.body;
        const user = req.session.user;
        
        if (!botToken || !applicationId) {
            throw new ValidationError('Bot token and application ID are required');
        }
        
        // Validate bot token format
        if (!botToken.match(/^[A-Za-z0-9._-]{50,}$/)) {
            throw new ValidationError('Invalid bot token format');
        }
        
        // Validate application ID format
        if (!applicationId.match(/^\d{17,19}$/)) {
            throw new ValidationError('Invalid application ID format');
        }
        
        // Test bot token
        const isValid = await botManager.validateBotToken(botToken);
        if (!isValid) {
            throw new ValidationError('Invalid bot token or bot is not accessible');
        }
        
        // Create bot instance in database
        const botInstance = await prisma.botInstance.create({
            data: {
                userId: user.id,
                botToken: await botManager.encryptToken(botToken),
                applicationId: applicationId,
                botName: `${user.username}'s Bot`,
                isActive: false,
                pm2ProcessId: null,
                defaultVolume: 50,
                enable247: false,
                enableAutoplay: true
            }
        });
        
        // Start bot instance
        const pm2Process = await botManager.startBot(user.id, botInstance);
        
        // Update database with PM2 process ID
        await prisma.botInstance.update({
            where: { userId: user.id },
            data: {
                isActive: true,
                pm2ProcessId: pm2Process.pm_id
            }
        });
        
        res.json({ 
            success: true, 
            message: 'Bot setup completed successfully!',
            redirectUrl: '/dashboard'
        });
        
    } catch (error) {
        console.error('Setup processing error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to setup bot'
        });
    }
});

// Plans page
router.get('/plans', (req, res) => {
    res.render('dashboard/plans', {
        title: 'Premium Plans',
        user: req.session.user
    });
});

// Bot management
router.get('/bot', requirePremiumPlus, async (req, res) => {
    try {
        const user = req.session.user;
        const botInstance = await prisma.botInstance.findUnique({
            where: { userId: user.id }
        });
        
        if (!botInstance) {
            return res.redirect('/dashboard/setup');
        }
        
        const botStatus = await botManager.getBotStatus(user.id);
        const stats = await botManager.getBotStats(user.id);
        
        res.render('dashboard/bot-management', {
            title: 'Bot Management',
            user,
            botInstance,
            botStatus,
            stats
        });
        
    } catch (error) {
        console.error('Bot management error:', error);
        res.status(500).render('errors/error', {
            title: 'Bot Management Error',
            status: 500,
            message: 'Failed to load bot management'
        });
    }
});

// Music settings
router.get('/music', requirePremiumPlus, async (req, res) => {
    try {
        const user = req.session.user;
        const botInstance = await prisma.botInstance.findUnique({
            where: { userId: user.id }
        });
        
        if (!botInstance) {
            return res.redirect('/dashboard/setup');
        }
        
        res.render('dashboard/music-settings', {
            title: 'Music Settings',
            user,
            botInstance
        });
        
    } catch (error) {
        console.error('Music settings error:', error);
        res.status(500).render('errors/error', {
            title: 'Music Settings Error',
            status: 500,
            message: 'Failed to load music settings'
        });
    }
});

// Bot profile customization
router.get('/profile', requirePremiumPlus, async (req, res) => {
    try {
        const user = req.session.user;
        const botInstance = await prisma.botInstance.findUnique({
            where: { userId: user.id }
        });
        
        if (!botInstance) {
            return res.redirect('/dashboard/setup');
        }
        
        res.render('dashboard/bot-profile', {
            title: 'Bot Profile',
            user,
            botInstance
        });
        
    } catch (error) {
        console.error('Bot profile error:', error);
        res.status(500).render('errors/error', {
            title: 'Bot Profile Error',
            status: 500,
            message: 'Failed to load bot profile'
        });
    }
});

// Subscription info
router.get('/subscription', requirePremiumPlus, async (req, res) => {
    try {
        const user = req.session.user;
        
        res.render('dashboard/subscription', {
            title: 'Subscription',
            user
        });
        
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).render('errors/error', {
            title: 'Subscription Error',
            status: 500,
            message: 'Failed to load subscription info'
        });
    }
});

// Documentation
router.get('/docs', (req, res) => {
    res.render('dashboard/docs', {
        title: 'Documentation',
        user: req.session.user
    });
});

export default router;
