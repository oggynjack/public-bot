import express from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const DISCORD_API_BASE = 'https://discord.com/api/v10';
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

// Discord OAuth2 login
router.get('/login', (req, res) => {
    const state = Math.random().toString(36).substring(7);
    req.session.oauthState = state;
    
    const scope = 'identify email';
    const discordAuthURL = `${DISCORD_API_BASE}/oauth2/authorize?` +
        `client_id=${CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(scope)}&` +
        `state=${state}`;
    
    res.redirect(discordAuthURL);
});

// Discord OAuth2 callback
router.get('/callback', async (req, res) => {
    try {
        const { code, state } = req.query;
        
        // Verify state parameter
        if (state !== req.session.oauthState) {
            return res.status(400).render('errors/error', {
                title: 'Authentication Error',
                status: 400,
                message: 'Invalid state parameter'
            });
        }
        
        // Exchange code for access token
        const tokenResponse = await axios.post(`${DISCORD_API_BASE}/oauth2/token`, 
            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        
        const { access_token } = tokenResponse.data;
        
        // Get user information
        const userResponse = await axios.get(`${DISCORD_API_BASE}/users/@me`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        
        const discordUser = userResponse.data;
        
        // Check or create user in database
        let user = await prisma.user.findUnique({
            where: { userId: discordUser.id }
        });
        
        if (!user) {
            user = await prisma.user.create({
                data: {
                    userId: discordUser.id,
                    username: discordUser.username,
                    discriminator: discordUser.discriminator || '0',
                    avatar: discordUser.avatar,
                    email: discordUser.email,
                    premiumPlus: false,
                    premiumFrom: null,
                    premiumTo: null
                }
            });
        } else {
            // Update user information
            user = await prisma.user.update({
                where: { userId: discordUser.id },
                data: {
                    username: discordUser.username,
                    discriminator: discordUser.discriminator || '0',
                    avatar: discordUser.avatar,
                    email: discordUser.email
                }
            });
        }
        
        // Store user in session
        req.session.user = {
            id: user.userId,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
            email: user.email,
            premiumPlus: user.premiumPlus,
            premiumFrom: user.premiumFrom,
            premiumTo: user.premiumTo,
            isAdmin: process.env.ADMIN_IDS?.split(',').includes(user.userId) || false
        };
        
        // Clear OAuth state
        delete req.session.oauthState;
        
        // Redirect based on premium status
        if (user.premiumPlus) {
            // Check if user has a bot setup
            const botInstance = await prisma.botInstance.findUnique({
                where: { userId: user.userId }
            });
            
            if (botInstance) {
                res.redirect('/dashboard');
            } else {
                res.redirect('/dashboard/setup');
            }
        } else {
            res.redirect('/dashboard/plans');
        }
        
    } catch (error) {
        console.error('OAuth callback error:', error);
        res.status(500).render('errors/error', {
            title: 'Authentication Error',
            status: 500,
            message: 'Failed to authenticate with Discord'
        });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('premiumplus.sid');
        res.redirect('/');
    });
});

// Get logout (for convenience)
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.clearCookie('premiumplus.sid');
        res.redirect('/');
    });
});

export default router;
