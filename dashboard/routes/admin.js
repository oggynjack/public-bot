import express from 'express';
import { PrismaClient } from '@prisma/client';
import { BotManager } from '../services/BotManager.js';

const router = express.Router();
const prisma = new PrismaClient();
const botManager = new BotManager();

// Admin dashboard
router.get('/', async (req, res) => {
    try {
        // Get overview statistics
        const totalUsers = await prisma.user.count();
        const premiumUsers = await prisma.user.count({
            where: { premiumPlus: true }
        });
        const activeBots = await prisma.botInstance.count({
            where: { isActive: true }
        });
        const totalRevenue = await prisma.payment.aggregate({
            _sum: { amount: true },
            where: { status: 'completed' }
        });
        
        const stats = {
            totalUsers,
            premiumUsers,
            activeBots,
            totalRevenue: totalRevenue._sum.amount || 0
        };
        
        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            user: req.session.user,
            stats
        });
        
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).render('errors/error', {
            title: 'Admin Dashboard Error',
            status: 500,
            message: 'Failed to load admin dashboard'
        });
    }
});

// User management
router.get('/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || '';
        const filter = req.query.filter || 'all'; // all, premium, free
        
        let whereClause = {};
        
        if (search) {
            whereClause.OR = [
                { username: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
            ];
        }
        
        if (filter === 'premium') {
            whereClause.premiumPlus = true;
        } else if (filter === 'free') {
            whereClause.premiumPlus = false;
        }
        
        const users = await prisma.user.findMany({
            where: whereClause,
            include: {
                botInstance: true,
                payments: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit
        });
        
        const totalUsers = await prisma.user.count({ where: whereClause });
        const totalPages = Math.ceil(totalUsers / limit);
        
        res.render('admin/users', {
            title: 'User Management',
            user: req.session.user,
            users,
            pagination: {
                page,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            },
            filters: { search, filter }
        });
        
    } catch (error) {
        console.error('User management error:', error);
        res.status(500).render('errors/error', {
            title: 'User Management Error',
            status: 500,
            message: 'Failed to load users'
        });
    }
});

// Bot management
router.get('/bots', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || '';
        const status = req.query.status || 'all'; // all, active, inactive
        
        let whereClause = {};
        
        if (search) {
            whereClause.OR = [
                { botName: { contains: search, mode: 'insensitive' } },
                { user: { username: { contains: search, mode: 'insensitive' } } }
            ];
        }
        
        if (status === 'active') {
            whereClause.isActive = true;
        } else if (status === 'inactive') {
            whereClause.isActive = false;
        }
        
        const botInstances = await prisma.botInstance.findMany({
            where: whereClause,
            include: {
                user: true
            },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit
        });
        
        // Get bot statuses from PM2
        const botsWithStatus = await Promise.all(
            botInstances.map(async (bot) => {
                const status = await botManager.getBotStatus(bot.userId);
                return { ...bot, pm2Status: status };
            })
        );
        
        const totalBots = await prisma.botInstance.count({ where: whereClause });
        const totalPages = Math.ceil(totalBots / limit);
        
        res.render('admin/bots', {
            title: 'Bot Management',
            user: req.session.user,
            bots: botsWithStatus,
            pagination: {
                page,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            },
            filters: { search, status }
        });
        
    } catch (error) {
        console.error('Bot management error:', error);
        res.status(500).render('errors/error', {
            title: 'Bot Management Error',
            status: 500,
            message: 'Failed to load bots'
        });
    }
});

// Payment management
router.get('/payments', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const status = req.query.status || 'all'; // all, pending, completed, failed
        
        let whereClause = {};
        
        if (status !== 'all') {
            whereClause.status = status;
        }
        
        const payments = await prisma.payment.findMany({
            where: whereClause,
            include: {
                user: true
            },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: limit
        });
        
        const totalPayments = await prisma.payment.count({ where: whereClause });
        const totalPages = Math.ceil(totalPayments / limit);
        
        res.render('admin/payments', {
            title: 'Payment Management',
            user: req.session.user,
            payments,
            pagination: {
                page,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            },
            filters: { status }
        });
        
    } catch (error) {
        console.error('Payment management error:', error);
        res.status(500).render('errors/error', {
            title: 'Payment Management Error',
            status: 500,
            message: 'Failed to load payments'
        });
    }
});

// Plans management
router.get('/plans', async (req, res) => {
    try {
        const plans = await prisma.plan.findMany({
            orderBy: { price: 'asc' }
        });
        
        res.render('admin/plans', {
            title: 'Plans Management',
            user: req.session.user,
            plans
        });
        
    } catch (error) {
        console.error('Plans management error:', error);
        res.status(500).render('errors/error', {
            title: 'Plans Management Error',
            status: 500,
            message: 'Failed to load plans'
        });
    }
});

// System settings
router.get('/settings', (req, res) => {
    res.render('admin/settings', {
        title: 'System Settings',
        user: req.session.user
    });
});

export default router;
