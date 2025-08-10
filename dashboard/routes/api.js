import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireAdmin, requirePremiumPlus } from '../middleware/auth.js';
import { BotManager } from '../services/BotManager.js';
import { ValidationError } from '../middleware/errorHandler.js';

const router = express.Router();
const prisma = new PrismaClient();
const botManager = new BotManager();

// Bot control endpoints
router.post('/bot/start', requireAuth, requirePremiumPlus, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const result = await botManager.startBot(userId);
        
        await prisma.botInstance.update({
            where: { userId },
            data: { isActive: true }
        });
        
        res.json({ success: true, message: 'Bot started successfully' });
    } catch (error) {
        console.error('Bot start error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/bot/stop', requireAuth, requirePremiumPlus, async (req, res) => {
    try {
        const userId = req.session.user.id;
        await botManager.stopBot(userId);
        
        await prisma.botInstance.update({
            where: { userId },
            data: { isActive: false }
        });
        
        res.json({ success: true, message: 'Bot stopped successfully' });
    } catch (error) {
        console.error('Bot stop error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/bot/restart', requireAuth, requirePremiumPlus, async (req, res) => {
    try {
        const userId = req.session.user.id;
        await botManager.restartBot(userId);
        
        res.json({ success: true, message: 'Bot restarted successfully' });
    } catch (error) {
        console.error('Bot restart error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Bot settings endpoints
router.post('/bot/settings/music', requireAuth, requirePremiumPlus, async (req, res) => {
    try {
        const { defaultVolume, enable247, enableAutoplay } = req.body;
        const userId = req.session.user.id;
        
        if (defaultVolume < 1 || defaultVolume > 100) {
            throw new ValidationError('Volume must be between 1 and 100');
        }
        
        await prisma.botInstance.update({
            where: { userId },
            data: {
                defaultVolume: parseInt(defaultVolume),
                enable247: enable247 === 'true',
                enableAutoplay: enableAutoplay === 'true'
            }
        });
        
        res.json({ success: true, message: 'Music settings updated successfully' });
    } catch (error) {
        console.error('Music settings error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post('/bot/settings/profile', requireAuth, requirePremiumPlus, async (req, res) => {
    try {
        const { botName, status, activity } = req.body;
        const userId = req.session.user.id;
        
        if (!botName || botName.length < 2 || botName.length > 32) {
            throw new ValidationError('Bot name must be between 2 and 32 characters');
        }
        
        await prisma.botInstance.update({
            where: { userId },
            data: {
                botName: botName.trim(),
                botStatus: status || 'online',
                botActivity: activity?.trim() || null
            }
        });
        
        // Apply changes to running bot
        await botManager.updateBotProfile(userId, { botName, status, activity });
        
        res.json({ success: true, message: 'Bot profile updated successfully' });
    } catch (error) {
        console.error('Bot profile error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post('/bot/settings/credentials', requireAuth, requirePremiumPlus, async (req, res) => {
    try {
        const { botToken, applicationId } = req.body;
        const userId = req.session.user.id;
        
        if (!botToken || !applicationId) {
            throw new ValidationError('Bot token and application ID are required');
        }
        
        // Validate formats
        if (!botToken.match(/^[A-Za-z0-9._-]{50,}$/)) {
            throw new ValidationError('Invalid bot token format');
        }
        
        if (!applicationId.match(/^\d{17,19}$/)) {
            throw new ValidationError('Invalid application ID format');
        }
        
        // Test bot token
        const isValid = await botManager.validateBotToken(botToken);
        if (!isValid) {
            throw new ValidationError('Invalid bot token or bot is not accessible');
        }
        
        // Encrypt and update
        const encryptedToken = await botManager.encryptToken(botToken);
        
        await prisma.botInstance.update({
            where: { userId },
            data: {
                botToken: encryptedToken,
                applicationId: applicationId
            }
        });
        
        // Restart bot with new credentials
        await botManager.restartBot(userId);
        
        res.json({ success: true, message: 'Bot credentials updated successfully' });
    } catch (error) {
        console.error('Bot credentials error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Bot statistics
router.get('/bot/stats', requireAuth, requirePremiumPlus, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const stats = await botManager.getBotStats(userId);
        res.json({ success: true, stats });
    } catch (error) {
        console.error('Bot stats error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Admin API endpoints
router.post('/admin/user/:userId/premium/grant', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const { duration } = req.body; // in days
        
        const premiumTo = new Date();
        premiumTo.setDate(premiumTo.getDate() + parseInt(duration));
        
        await prisma.user.update({
            where: { userId },
            data: {
                premiumPlus: true,
                premiumFrom: new Date(),
                premiumTo: premiumTo
            }
        });
        
        res.json({ success: true, message: 'Premium granted successfully' });
    } catch (error) {
        console.error('Grant premium error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/admin/user/:userId/premium/revoke', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Stop bot if running
        try {
            await botManager.stopBot(userId);
        } catch (e) {
            // Bot might not be running, continue
        }
        
        await prisma.user.update({
            where: { userId },
            data: {
                premiumPlus: false,
                premiumTo: new Date()
            }
        });
        
        res.json({ success: true, message: 'Premium revoked successfully' });
    } catch (error) {
        console.error('Revoke premium error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/admin/bot/:userId/control/:action', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { userId, action } = req.params;
        
        let result;
        switch (action) {
            case 'start':
                result = await botManager.startBot(userId);
                break;
            case 'stop':
                result = await botManager.stopBot(userId);
                break;
            case 'restart':
                result = await botManager.restartBot(userId);
                break;
            default:
                throw new ValidationError('Invalid action');
        }
        
        res.json({ success: true, message: `Bot ${action}ed successfully` });
    } catch (error) {
        console.error(`Admin bot ${action} error:`, error);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/admin/payment/:paymentId/approve', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { paymentId } = req.params;
        
        const payment = await prisma.payment.update({
            where: { id: paymentId },
            data: { status: 'completed' },
            include: { user: true }
        });
        
        // Grant premium
        const premiumTo = new Date();
        premiumTo.setDate(premiumTo.getDate() + payment.duration);
        
        await prisma.user.update({
            where: { userId: payment.userId },
            data: {
                premiumPlus: true,
                premiumFrom: new Date(),
                premiumTo: premiumTo
            }
        });
        
        res.json({ success: true, message: 'Payment approved and premium granted' });
    } catch (error) {
        console.error('Approve payment error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
