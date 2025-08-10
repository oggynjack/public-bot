import type ExtendedClient from "@/classes/ExtendedClient";
import { prisma } from "@/classes/ExtendedClient";
import type { UserTier } from "./PremiumService";
import { PremiumPlan } from "../../prisma/generated";

export class AdminService {
  private client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  /**
   * Get enhanced dashboard statistics with premium features
   */
  async getDashboardStats() {
    try {
      const [guilds, users, premiumUsers, premiumGuilds] = await Promise.all([
        prisma.guild.count(),
        prisma.user.count(),
        prisma.user.count({
          where: {
            premiumPlan: {
              not: PremiumPlan.Free
            }
          }
        }),
        prisma.guild.count({
          where: {
            premiumPlan: {
              not: PremiumPlan.Free
            }
          }
        })
      ]);

      const premiumStats = {
        totalPremiumUsers: premiumUsers,
        totalPremiumGuilds: premiumGuilds,
        premiumPercentage: users > 0 ? ((premiumUsers / users) * 100).toFixed(2) : "0.00"
      };

      return {
        totalGuilds: guilds,
        totalUsers: users,
        premiumStats,
        botInfo: {
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
          nodeVersion: process.version,
          discordJSVersion: require("discord.js").version
        }
      };
    } catch (error) {
      console.error("Error getting dashboard stats:", error);
      throw error;
    }
  }

  /**
   * Get enhanced guild list with premium information
   */
  async getGuilds(page = 1, limit = 50, search?: string) {
    try {
      const skip = (page - 1) * limit;
      
      const where = search ? {
        OR: [
          { guildId: { contains: search } }
        ]
      } : {};

      const [guilds, total] = await Promise.all([
        prisma.guild.findMany({
          where,
          skip,
          take: limit,
          orderBy: { totalCommands: 'desc' }
        }),
        prisma.guild.count({ where })
      ]);

      const enrichedGuilds = await Promise.all(guilds.map(async (guild) => {
        const discordGuild = this.client.guilds.cache.get(guild.guildId);
        const premiumTier = this.client.premium.premiumPlanToTier(guild.premiumPlan);

        return {
          guildId: guild.guildId,
          name: discordGuild?.name || 'Unknown Guild',
          memberCount: discordGuild?.memberCount || 0,
          premiumTier,
          premiumFrom: guild.premiumFrom,
          premiumTo: guild.premiumTo,
          language: guild.language,
          isActive: guild.isActive,
          lastActivity: guild.lastActivity,
          totalCommands: guild.totalCommands,
          customBotName: guild.customBotName,
          embedColor: guild.embedColor
        };
      }));

      return {
        guilds: enrichedGuilds,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error("Error getting guilds:", error);
      throw error;
    }
  }

  /**
   * Get enhanced user list with premium information
   */
  async getUsers(page = 1, limit = 50, search?: string) {
    try {
      const skip = (page - 1) * limit;
      
      const where = search ? {
        OR: [
          { userId: { contains: search } }
        ]
      } : {};

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { premiumTo: 'desc' }
        }),
        prisma.user.count({ where })
      ]);

        const enrichedUsers = await Promise.all(users.map(async (user) => {
        const discordUser = await this.client.users.fetch(user.userId).catch(() => null);
        const premiumTier = await this.client.premium.getUserTier(user.userId, "");

        return {
          userId: user.userId,
          username: discordUser?.username || 'Unknown User',
          avatar: discordUser?.displayAvatarURL() || null,
          premiumTier,
          premiumFrom: user.premiumFrom,
          premiumTo: user.premiumTo,
          isActive: Boolean(discordUser),
          playlistCount: 0 // Will be populated separately if needed
        };
      }));      return {
        users: enrichedUsers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  }

  /**
   * Enhanced premium management
   */
  async setPremium(type: 'user' | 'guild', targetId: string, tier: UserTier, days: number) {
    try {
      const now = new Date();
      const expiresAt = tier === "free" ? null : new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
      
      let premiumPlan: PremiumPlan = PremiumPlan.Free;
      switch (tier) {
        case "premium":
          premiumPlan = PremiumPlan.Premium;
          break;
        case "premiumplus":
          premiumPlan = PremiumPlan.PremiumPlus;
          break;
        default:
          premiumPlan = PremiumPlan.Free;
          break;
      }

      if (type === 'user') {
        await prisma.user.upsert({
          where: { userId: targetId },
          update: {
            premiumFrom: tier === "free" ? null : now,
            premiumTo: expiresAt,
            premiumPlan: premiumPlan,
          },
          create: {
            userId: targetId,
            premiumFrom: tier === "free" ? null : now,
            premiumTo: expiresAt,
            premiumPlan: premiumPlan,
          },
        });
      } else {
        await prisma.guild.upsert({
          where: { guildId: targetId },
          update: {
            premiumFrom: tier === "free" ? null : now,
            premiumTo: expiresAt,
            premiumPlan: premiumPlan,
          },
          create: {
            guildId: targetId,
            premiumFrom: tier === "free" ? null : now,
            premiumTo: expiresAt,
            premiumPlan: premiumPlan,
          },
        });
      }

      return { success: true, tier, expiresAt };
    } catch (error) {
      console.error("Error setting premium:", error);
      throw error;
    }
  }

  /**
   * Get enhanced system analytics
   */
  async getSystemAnalytics() {
    try {
      const memUsage = process.memoryUsage();
      const uptimeSeconds = process.uptime();

      return {
        system: {
          uptime: {
            seconds: uptimeSeconds,
            formatted: this.formatUptime(uptimeSeconds)
          },
          memory: {
            heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
            heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
            rss: Math.round(memUsage.rss / 1024 / 1024)
          },
          process: {
            pid: process.pid,
            nodeVersion: process.version,
            platform: process.platform
          }
        },
        discord: {
          guilds: this.client.guilds.cache.size,
          users: this.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
          ping: this.client.ws.ping,
          shards: this.client.shard?.count || 1
        },
        music: {
          players: this.client.manager.players.size,
          activePlayers: Array.from(this.client.manager.players.values()).filter((p: any) => p.playing).length,
          totalTracks: Array.from(this.client.manager.players.values()).reduce((acc: number, p: any) => acc + (p.queue.tracks.length || 0), 0)
        }
      };
    } catch (error) {
      console.error("Error getting system analytics:", error);
      throw error;
    }
  }

  private formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  }
}
