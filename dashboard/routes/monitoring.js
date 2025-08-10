import express from 'express';
import { systemMonitor } from '../services/SystemMonitor.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get system stats (admin only)
router.get('/system/stats', requireAuth, requireAdmin, (req, res) => {
    try {
        const stats = systemMonitor.getAllStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error('System stats API error:', error);
        res.status(500).json({ success: false, message: 'Failed to get system stats' });
    }
});

// Get database stats (admin only)
router.get('/database/stats', requireAuth, requireAdmin, async (req, res) => {
    try {
        const stats = await systemMonitor.getDatabaseStats();
        res.json({ success: true, data: stats });
    } catch (error) {
        console.error('Database stats API error:', error);
        res.status(500).json({ success: false, message: 'Failed to get database stats' });
    }
});

// Get bot stats for specific user
router.get('/bot/:userId/stats', requireAuth, (req, res) => {
    try {
        const { userId } = req.params;
        
        // Check if user can access this bot's stats
        if (req.session.user.id !== userId && !req.session.user.isAdmin) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        
        const botStats = systemMonitor.getBotStats(userId);
        res.json({ success: true, data: botStats });
    } catch (error) {
        console.error('Bot stats API error:', error);
        res.status(500).json({ success: false, message: 'Failed to get bot stats' });
    }
});

// Get all bot stats (admin only)
router.get('/bots/stats', requireAuth, requireAdmin, (req, res) => {
    try {
        const allBotStats = systemMonitor.getBotStats();
        res.json({ success: true, data: allBotStats });
    } catch (error) {
        console.error('All bot stats API error:', error);
        res.status(500).json({ success: false, message: 'Failed to get all bot stats' });
    }
});

// Get real-time dashboard data
router.get('/dashboard/realtime', requireAuth, async (req, res) => {
    try {
        const isAdmin = req.session.user.isAdmin;
        const userId = req.session.user.id;
        
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
        } else {
            // Regular user gets their bot stats
            const botStats = systemMonitor.getBotStats(userId);
            data = {
                bot: botStats,
                timestamp: Date.now()
            };
        }
        
        res.json({ success: true, data });
    } catch (error) {
        console.error('Realtime dashboard API error:', error);
        res.status(500).json({ success: false, message: 'Failed to get realtime data' });
    }
});

// Server-Sent Events endpoint for real-time updates
router.get('/sse/dashboard', requireAuth, (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
    });

    const isAdmin = req.session.user.isAdmin;
    const userId = req.session.user.id;

    // Send initial data
    const sendUpdate = async () => {
        try {
            let data = {};
            
            if (isAdmin) {
                const systemStats = systemMonitor.getAllStats();
                const dbStats = await systemMonitor.getDatabaseStats();
                
                data = {
                    system: systemStats.system,
                    database: dbStats,
                    bots: systemStats.bots,
                    timestamp: Date.now()
                };
            } else {
                const botStats = systemMonitor.getBotStats(userId);
                data = {
                    bot: botStats,
                    timestamp: Date.now()
                };
            }
            
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        } catch (error) {
            console.error('SSE update error:', error);
        }
    };

    // Send updates every 5 seconds
    sendUpdate();
    const interval = setInterval(sendUpdate, 5000);

    // Cleanup on client disconnect
    req.on('close', () => {
        clearInterval(interval);
    });

    req.on('end', () => {
        clearInterval(interval);
    });
});

export default router;
