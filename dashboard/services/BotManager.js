import pm2 from 'pm2';
import crypto from 'crypto';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class BotManager {
    constructor() {
        this.prisma = new PrismaClient();
        this.encryptionKey = process.env.ENCRYPTION_KEY;
        this.botScriptPath = path.resolve(__dirname, process.env.BOT_SCRIPT_PATH || '../../src/index.ts');
        
        if (!this.encryptionKey || this.encryptionKey.length !== 32) {
            throw new Error('ENCRYPTION_KEY must be exactly 32 characters long');
        }
    }
    
    // Connect to PM2
    async connectPM2() {
        return new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
    
    // Disconnect from PM2
    async disconnectPM2() {
        return new Promise((resolve) => {
            pm2.disconnect(() => {
                resolve();
            });
        });
    }
    
    // Encrypt bot token
    async encryptToken(token) {
        const algorithm = 'aes-256-cbc';
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipher(algorithm, this.encryptionKey);
        
        let encrypted = cipher.update(token, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return iv.toString('hex') + ':' + encrypted;
    }
    
    // Decrypt bot token
    async decryptToken(encryptedToken) {
        const algorithm = 'aes-256-cbc';
        const parts = encryptedToken.split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const encrypted = parts[1];
        
        const decipher = crypto.createDecipher(algorithm, this.encryptionKey);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }
    
    // Validate bot token by making a Discord API request
    async validateBotToken(token) {
        try {
            const response = await axios.get('https://discord.com/api/v10/users/@me', {
                headers: {
                    'Authorization': `Bot ${token}`
                }
            });
            
            return response.status === 200 && response.data.bot === true;
        } catch (error) {
            return false;
        }
    }
    
    // Start bot instance
    async startBot(userId, botInstance = null) {
        try {
            await this.connectPM2();
            
            if (!botInstance) {
                botInstance = await this.prisma.botInstance.findUnique({
                    where: { userId }
                });
            }
            
            if (!botInstance) {
                throw new Error('Bot instance not found');
            }
            
            // Check if bot is already running
            const existingProcess = await this.getBotProcess(userId);
            if (existingProcess && existingProcess.pm2_env.status === 'online') {
                throw new Error('Bot is already running');
            }
            
            // Decrypt bot token
            const botToken = await this.decryptToken(botInstance.botToken);
            
            // PM2 process configuration
            const processConfig = {
                name: `bot-${userId}`,
                script: this.botScriptPath,
                cwd: path.dirname(this.botScriptPath),
                interpreter: 'bun',
                env: {
                    BOT_TOKEN: botToken,
                    BOT_APPLICATION_ID: botInstance.applicationId,
                    BOT_USER_ID: userId,
                    BOT_NAME: botInstance.botName,
                    BOT_DEFAULT_VOLUME: botInstance.defaultVolume,
                    BOT_24_7: botInstance.enable247,
                    BOT_AUTOPLAY: botInstance.enableAutoplay,
                    DATABASE_URL: process.env.DATABASE_URL,
                    REDIS_URL: process.env.REDIS_URL,
                    NODE_ENV: process.env.NODE_ENV
                },
                max_memory_restart: '512M',
                instances: 1,
                exec_mode: 'fork',
                autorestart: true,
                watch: false,
                log_file: `logs/bot-${userId}.log`,
                error_file: `logs/bot-${userId}-error.log`,
                out_file: `logs/bot-${userId}-out.log`,
                merge_logs: true
            };
            
            return new Promise((resolve, reject) => {
                pm2.start(processConfig, (err, proc) => {
                    this.disconnectPM2();
                    if (err) reject(err);
                    else resolve(proc[0]);
                });
            });
            
        } catch (error) {
            await this.disconnectPM2();
            throw error;
        }
    }
    
    // Stop bot instance
    async stopBot(userId) {
        try {
            await this.connectPM2();
            
            const processName = `bot-${userId}`;
            
            return new Promise((resolve, reject) => {
                pm2.stop(processName, (err) => {
                    this.disconnectPM2();
                    if (err) reject(err);
                    else resolve();
                });
            });
            
        } catch (error) {
            await this.disconnectPM2();
            throw error;
        }
    }
    
    // Restart bot instance
    async restartBot(userId) {
        try {
            await this.connectPM2();
            
            const processName = `bot-${userId}`;
            
            return new Promise((resolve, reject) => {
                pm2.restart(processName, (err) => {
                    this.disconnectPM2();
                    if (err) reject(err);
                    else resolve();
                });
            });
            
        } catch (error) {
            await this.disconnectPM2();
            throw error;
        }
    }
    
    // Get bot process information
    async getBotProcess(userId) {
        try {
            await this.connectPM2();
            
            const processName = `bot-${userId}`;
            
            return new Promise((resolve, reject) => {
                pm2.describe(processName, (err, list) => {
                    this.disconnectPM2();
                    if (err) reject(err);
                    else resolve(list[0] || null);
                });
            });
            
        } catch (error) {
            await this.disconnectPM2();
            return null;
        }
    }
    
    // Get bot status
    async getBotStatus(userId) {
        try {
            const process = await this.getBotProcess(userId);
            
            if (!process) {
                return {
                    status: 'stopped',
                    uptime: 0,
                    restarts: 0,
                    memory: 0,
                    cpu: 0
                };
            }
            
            return {
                status: process.pm2_env.status,
                uptime: process.pm2_env.pm_uptime,
                restarts: process.pm2_env.restart_time,
                memory: process.monit.memory,
                cpu: process.monit.cpu
            };
            
        } catch (error) {
            console.error('Get bot status error:', error);
            return {
                status: 'error',
                uptime: 0,
                restarts: 0,
                memory: 0,
                cpu: 0
            };
        }
    }
    
    // Get bot statistics
    async getBotStats(userId) {
        try {
            // This would normally query your bot's database or Redis for stats
            // For now, return mock data
            return {
                guilds: 0,
                users: 0,
                songsPlayed: 0,
                uptime: '0h 0m',
                memoryUsage: '0 MB'
            };
        } catch (error) {
            console.error('Get bot stats error:', error);
            return {
                guilds: 0,
                users: 0,
                songsPlayed: 0,
                uptime: '0h 0m',
                memoryUsage: '0 MB'
            };
        }
    }
    
    // Update bot profile (name, status, activity)
    async updateBotProfile(userId, { botName, status, activity }) {
        try {
            // This would send a message to the bot process to update its profile
            // For now, just log the update
            console.log(`Updating bot profile for user ${userId}:`, { botName, status, activity });
            
            // In a real implementation, you might use Redis pub/sub or IPC
            // to communicate with the running bot process
            
            return true;
        } catch (error) {
            console.error('Update bot profile error:', error);
            throw error;
        }
    }
    
    // Get all running bots (admin function)
    async getAllBots() {
        try {
            await this.connectPM2();
            
            return new Promise((resolve, reject) => {
                pm2.list((err, list) => {
                    this.disconnectPM2();
                    if (err) reject(err);
                    else {
                        // Filter only bot processes
                        const botProcesses = list.filter(proc => 
                            proc.name && proc.name.startsWith('bot-')
                        );
                        resolve(botProcesses);
                    }
                });
            });
            
        } catch (error) {
            await this.disconnectPM2();
            throw error;
        }
    }
    
    // Stop all bots (admin function)
    async stopAllBots() {
        try {
            const bots = await this.getAllBots();
            
            for (const bot of bots) {
                const userId = bot.name.replace('bot-', '');
                await this.stopBot(userId);
            }
            
            return bots.length;
        } catch (error) {
            throw error;
        }
    }
}
