import { spawn } from 'child_process';
import os from 'os';
import pm2 from 'pm2';
import { PrismaClient } from '../generated/index.js';
import crypto from 'crypto';

const prisma = new PrismaClient();

export class SystemMonitor {
    constructor() {
        this.cpuUsage = 0;
        this.memoryUsage = 0;
        this.totalMemory = os.totalmem();
        this.freeMemory = os.freemem();
        this.systemUptime = 0;
        this.botProcesses = new Map();
        
        // Start monitoring
        this.startMonitoring();
    }

    startMonitoring() {
        // Update system stats every 5 seconds
        setInterval(() => {
            this.updateSystemStats();
        }, 5000);

        // Update bot stats every 10 seconds
        setInterval(() => {
            this.updateBotStats();
        }, 10000);
    }

    async updateSystemStats() {
        try {
            // Get CPU usage
            this.cpuUsage = await this.getCPUUsage();
            
            // Get memory usage
            this.freeMemory = os.freemem();
            this.memoryUsage = ((this.totalMemory - this.freeMemory) / this.totalMemory) * 100;
            
            // Get system uptime
            this.systemUptime = os.uptime();
            
        } catch (error) {
            console.error('System monitoring error:', error);
        }
    }

    async getCPUUsage() {
        return new Promise((resolve) => {
            const startMeasure = this.cpuAverage();
            
            setTimeout(() => {
                const endMeasure = this.cpuAverage();
                const idleDifference = endMeasure.idle - startMeasure.idle;
                const totalDifference = endMeasure.total - startMeasure.total;
                const percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
                resolve(percentageCPU);
            }, 1000);
        });
    }

    cpuAverage() {
        const cpus = os.cpus();
        let user = 0, nice = 0, sys = 0, idle = 0, irq = 0;
        
        for (let cpu of cpus) {
            user += cpu.times.user;
            nice += cpu.times.nice;
            sys += cpu.times.sys;
            idle += cpu.times.idle;
            irq += cpu.times.irq;
        }
        
        return {
            idle: idle,
            total: user + nice + sys + idle + irq
        };
    }

    async updateBotStats() {
        try {
            // Get all bot instances from database
            const botInstances = await prisma.botInstance.findMany({
                include: {
                    user: {
                        select: {
                            userId: true,
                            username: true
                        }
                    }
                }
            });

            // Get PM2 processes
            pm2.connect((err) => {
                if (err) {
                    console.error('PM2 connect error:', err);
                    return;
                }

                pm2.list(async (err, processes) => {
                    pm2.disconnect();
                    
                    if (err) {
                        console.error('PM2 list error:', err);
                        return;
                    }

                    // Build lookup of PM2 processes for bots (name starts with bot-)
                    const botPm2Processes = processes.filter(p => p.name && p.name.startsWith('bot-'));

                    for (const botInstance of botInstances) {
                        // Try several name patterns: bot-userId, bot-userId-appId
                        const expectedPrefix = `bot-${botInstance.userId}`;
                        const pm2Process = botPm2Processes.find(p => p.name === expectedPrefix || p.name.startsWith(expectedPrefix + '-'));

                        if (pm2Process) {
                            const discordStats = await this.getBotDiscordStats(botInstance);
                            this.botProcesses.set(botInstance.userId, {
                                userId: botInstance.userId,
                                applicationId: botInstance.applicationId,
                                botName: botInstance.botName,
                                isActive: botInstance.isActive,
                                pm2Status: {
                                    status: pm2Process.pm2_env.status,
                                    uptime: pm2Process.pm2_env.pm_uptime,
                                    restarts: pm2Process.pm2_env.restart_time,
                                    memory: Math.round(pm2Process.monit.memory / (1024 * 1024)), // MB
                                    cpu: Math.round(pm2Process.monit.cpu * 100) / 100,
                                    pid: pm2Process.pid
                                },
                                discordStats
                            });
                        } else {
                            // Mark as offline if previously present
                            if (this.botProcesses.has(botInstance.userId)) {
                                const prev = this.botProcesses.get(botInstance.userId);
                                this.botProcesses.set(botInstance.userId, {
                                    ...prev,
                                    pm2Status: {
                                        status: 'offline'
                                    }
                                });
                            }
                        }
                    }
                });
            });

        } catch (error) {
            console.error('Bot stats monitoring error:', error);
        }
    }

    async getBotDiscordStats(botInstance) {
        try {
            if (!botInstance.botToken) return null;

            // Decrypt simple prefix format encrypted_<base64>
            let token = botInstance.botToken;
            if (token.startsWith('encv1_')) {
                try {
                    const secret = (process.env.BOT_TOKEN_SECRET || 'change_this_secret_change_this_secret').slice(0,32).padEnd(32,'0');
                    const raw = Buffer.from(token.replace('encv1_', ''), 'base64');
                    const iv = raw.subarray(0,12);
                    const tag = raw.subarray(12,28);
                    const enc = raw.subarray(28);
                    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(secret), iv);
                    decipher.setAuthTag(tag);
                    token = decipher.update(enc, undefined, 'utf8') + decipher.final('utf8');
                } catch {}
            } else if (token.startsWith('encrypted_')) {
                try { token = Buffer.from(token.replace('encrypted_',''), 'base64').toString('utf8'); } catch {}
            }

            // Get bot info from Discord API
            const response = await fetch('https://discord.com/api/v10/users/@me', {
                headers: {
                    'Authorization': `Bot ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return null;

            const botInfo = await response.json();

            // Get guild count
            const guildsResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
                headers: {
                    'Authorization': `Bot ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            let guildCount = 0;
            let userCount = 0;

            if (guildsResponse.ok) {
                const guilds = await guildsResponse.json();
                guildCount = guilds.length;
                // Estimate user count (average 100 users per server for music bots)
                userCount = guildCount * 100;
            }

            return {
                id: botInfo.id,
                username: botInfo.username,
                discriminator: botInfo.discriminator,
                avatar: botInfo.avatar,
                verified: botInfo.verified || false,
                guildCount,
                userCount,
                isOnline: true
            };

        } catch (error) {
            console.error('Discord stats error for bot:', botInstance.userId, error);
            return null;
        }
    }

    getSystemStats() {
        return {
            cpu: Math.round(this.cpuUsage * 100) / 100,
            memory: Math.round(this.memoryUsage * 100) / 100,
            totalMemory: Math.round(this.totalMemory / (1024 * 1024 * 1024) * 100) / 100, // GB
            freeMemory: Math.round(this.freeMemory / (1024 * 1024 * 1024) * 100) / 100, // GB
            uptime: this.systemUptime,
            timestamp: Date.now()
        };
    }

    getBotStats(userId = null) {
        if (userId) {
            return this.botProcesses.get(userId) || null;
        }
        return Array.from(this.botProcesses.values());
    }

    getAllStats() {
        const totalBots = this.botProcesses.size;
        const activeBots = Array.from(this.botProcesses.values())
            .filter(bot => bot.pm2Status?.status === 'online').length;
        
        const totalGuilds = Array.from(this.botProcesses.values())
            .reduce((sum, bot) => sum + (bot.discordStats?.guildCount || 0), 0);
        
        const totalUsers = Array.from(this.botProcesses.values())
            .reduce((sum, bot) => sum + (bot.discordStats?.userCount || 0), 0);

            return {
                system: this.getSystemStats(),
                bots: {
                    total: totalBots,
                    active: activeBots,
                    inactive: totalBots - activeBots,
                    totalGuilds,
                    totalUsers,
                    list: Array.from(this.botProcesses.values()).map(b => ({
                        userId: b.userId,
                        applicationId: b.applicationId,
                        botName: b.botName,
                        pm2Status: b.pm2Status,
                        discordStats: b.discordStats
                    }))
                }
            };
    }

    async getDatabaseStats() {
        try {
            const [totalUsers, premiumUsers, totalBots, totalAdmins] = await Promise.all([
                prisma.user.count(),
                prisma.user.count({ where: { premiumPlus: true } }),
                prisma.botInstance.count(),
                prisma.admin.count()
            ]);

            return {
                totalUsers,
                premiumUsers,
                totalBots,
                totalAdmins,
                activeBots: Array.from(this.botProcesses.values())
                    .filter(bot => bot.pm2Status?.status === 'online').length
            };
        } catch (error) {
            console.error('Database stats error:', error);
            return {
                totalUsers: 0,
                premiumUsers: 0,
                totalBots: 0,
                totalAdmins: 0,
                activeBots: 0
            };
        }
    }
}

// Create singleton instance
export const systemMonitor = new SystemMonitor();
