import type ExtendedClient from "@/classes/ExtendedClient";
import { prisma } from "@/classes/ExtendedClient";
import type { UserTier } from "./PremiumService";
import { PremiumPlan } from "../../prisma/generated";

export class DashboardService {
  private client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  /**
   * Enhanced user authentication with premium features
   */
  async authenticateUser(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { userId }
      });

      if (!user) {
        // Create new user
        await prisma.user.create({
          data: {
            userId,
            premiumPlan: PremiumPlan.Free
          }
        });
      }

      const tier = await this.client.premium.getUserTier(userId, "");
      const isPremium = tier !== "free";

      return {
        userId,
        tier,
        isPremium,
        premiumFrom: user?.premiumFrom,
        premiumTo: user?.premiumTo
      };
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }

  /**
   * Get user's accessible guilds with premium information
   */
  async getUserGuilds(userId: string) {
    try {
      const userTier = await this.client.premium.getUserTier(userId, "");
      const guilds = [];

      for (const [guildId, guild] of this.client.guilds.cache) {
        const member = guild.members.cache.get(userId);
        if (member && member.permissions.has("Administrator")) {
          const guildData = await prisma.guild.findUnique({
            where: { guildId }
          });

          const guildTier = guildData ? 
            this.client.premium.premiumPlanToTier(guildData.premiumPlan) : "free";
          
          const effectiveTier = this.getHighestTier(userTier, guildTier);

          guilds.push({
            guildId,
            name: guild.name,
            icon: guild.iconURL(),
            memberCount: guild.memberCount,
            userTier,
            guildTier,
            effectiveTier,
            premiumFrom: guildData?.premiumFrom,
            premiumTo: guildData?.premiumTo,
            customBotName: guildData?.customBotName,
            embedColor: guildData?.embedColor,
            language: guildData?.language || "EnglishUS",
            features: this.getTierFeatures(effectiveTier)
          });
        }
      }

      return guilds;
    } catch (error) {
      console.error("Error getting user guilds:", error);
      throw error;
    }
  }

  /**
   * Get enhanced guild dashboard data with premium features
   */
  async getGuildDashboard(guildId: string, userId: string) {
    try {
      const guild = this.client.guilds.cache.get(guildId);
      if (!guild) {
        throw new Error("Guild not found");
      }

      const member = guild.members.cache.get(userId);
      if (!member || !member.permissions.has("Administrator")) {
        throw new Error("Insufficient permissions");
      }

      const [guildData, userTier] = await Promise.all([
        prisma.guild.findUnique({
          where: { guildId }
        }),
        this.client.premium.getUserTier(userId, guildId)
      ]);

      const guildTier = guildData ? 
        this.client.premium.premiumPlanToTier(guildData.premiumPlan) : "free";
      
      const effectiveTier = this.getHighestTier(userTier, guildTier);

      // Get music player status
      const player = this.client.manager.getPlayer(guildId);
      const musicStatus = player ? {
        connected: player.connected,
        playing: player.playing,
        paused: player.paused,
        queueLength: (player as any).queue?.tracks?.length || 0,
        currentTrack: (player as any).queue?.current ? {
          title: (player as any).queue.current.info.title,
          author: (player as any).queue.current.info.author,
          duration: (player as any).queue.current.info.duration || 0
        } : null
      } : null;

      return {
        guild: {
          id: guildId,
          name: guild.name,
          icon: guild.iconURL(),
          memberCount: guild.memberCount,
          ownerId: guild.ownerId
        },
        premium: {
          userTier,
          guildTier,
          effectiveTier,
          premiumFrom: guildData?.premiumFrom,
          premiumTo: guildData?.premiumTo,
          features: this.getTierFeatures(effectiveTier),
          limits: this.getTierLimits(effectiveTier)
        },
        settings: {
          language: guildData?.language || "EnglishUS",
          customBotName: guildData?.customBotName,
          embedColor: guildData?.embedColor,
          defaultVolume: guildData?.defaultVolume || 100,
          enable247: guildData?.enable247 || false,
          enableAutoplay: guildData?.enableAutoplay || false,
          enableVoteSkip: guildData?.enableVoteSkip !== false // Default true
        },
        music: musicStatus,
        stats: {
          totalCommands: guildData?.totalCommands || 0,
          lastActivity: guildData?.lastActivity || new Date(),
          isActive: guildData?.isActive !== false // Default true
        }
      };
    } catch (error) {
      console.error("Error getting guild dashboard:", error);
      throw error;
    }
  }

  /**
   * Update enhanced guild settings with premium validation
   */
  async updateGuildSettings(guildId: string, userId: string, settings: any) {
    try {
      const effectiveTier = await this.client.premium.getEffectiveTier(userId, guildId);
      
      // Validate premium features
      if (settings.customBotName && effectiveTier === "free") {
        throw new Error("Custom bot name requires premium");
      }
      
      if (settings.embedColor && effectiveTier === "free") {
        throw new Error("Custom embed color requires premium");
      }

      if (settings.enable247 && effectiveTier !== "premiumplus") {
        throw new Error("24/7 mode requires Premium+ tier");
      }

      await prisma.guild.upsert({
        where: { guildId },
        update: {
          language: settings.language,
          customBotName: effectiveTier !== "free" ? settings.customBotName : null,
          embedColor: effectiveTier !== "free" ? settings.embedColor : null,
          defaultVolume: settings.defaultVolume,
          enable247: effectiveTier === "premiumplus" ? settings.enable247 : false,
          enableAutoplay: settings.enableAutoplay,
          enableVoteSkip: settings.enableVoteSkip,
          lastActivity: new Date()
        },
        create: {
          guildId,
          language: settings.language || "EnglishUS",
          customBotName: effectiveTier !== "free" ? settings.customBotName : null,
          embedColor: effectiveTier !== "free" ? settings.embedColor : null,
          defaultVolume: settings.defaultVolume || 100,
          enable247: effectiveTier === "premiumplus" ? settings.enable247 : false,
          enableAutoplay: settings.enableAutoplay || false,
          enableVoteSkip: settings.enableVoteSkip !== false
        }
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating guild settings:", error);
      throw error;
    }
  }

  private getHighestTier(userTier: UserTier, guildTier: UserTier): UserTier {
    const tierLevels = { "free": 0, "premium": 1, "premiumplus": 2 };
    const userLevel = tierLevels[userTier] || 0;
    const guildLevel = tierLevels[guildTier] || 0;
    const highestLevel = Math.max(userLevel, guildLevel);
    
    return Object.keys(tierLevels).find(
      tier => tierLevels[tier as UserTier] === highestLevel
    ) as UserTier || "free";
  }

  private getTierFeatures(tier: UserTier) {
    const features = {
      free: [
        "Basic music commands",
        "Standard queue (25 tracks)",
        "2 playlists max",
        "Basic support"
      ],
      premium: [
        "All free features",
        "Extended queue (100 tracks)",
        "Unlimited playlists",
        "Custom embed colors",
        "Custom bot name",
        "Priority support",
        "Advanced filters"
      ],
      premiumplus: [
        "All premium features",
        "Massive queue (500 tracks)",
        "24/7 mode",
        "Auto-suggestions",
        "Premium support",
        "Multiple guild coverage",
        "Beta features access"
      ]
    };

    return features[tier] || features.free;
  }

  private getTierLimits(tier: UserTier) {
    return {
      maxQueueSize: tier === "free" ? 25 : tier === "premium" ? 100 : 500,
      maxPlaylists: tier === "free" ? 2 : -1, // -1 means unlimited
      maxAutoSuggestions: tier === "free" ? 0 : tier === "premium" ? 5 : 10,
      can247Mode: tier === "premiumplus",
      canCustomization: tier !== "free"
    };
  }
}
