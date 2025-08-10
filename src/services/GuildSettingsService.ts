import type ExtendedClient from "@/classes/ExtendedClient";
import { prisma } from "@/classes/ExtendedClient";

export class GuildSettingsService {
  private client: ExtendedClient;

  constructor(client: ExtendedClient) {
    this.client = client;
  }

  /**
   * Get enhanced guild settings with premium features
   */
  async getGuildSettings(guildId: string) {
    try {
      const guild = await prisma.guild.findUnique({
        where: { guildId }
      });

      if (!guild) {
        // Create with defaults
        const newGuild = await prisma.guild.create({
          data: {
            guildId,
            language: "EnglishUS"
          }
        });
        return this.formatGuildSettings(newGuild);
      }

      return this.formatGuildSettings(guild);
    } catch (error) {
      console.error("Error getting guild settings:", error);
      throw error;
    }
  }

  /**
   * Update enhanced guild settings with premium validation
   */
  async updateGuildSettings(guildId: string, settings: any, userId?: string) {
    try {
      // Get effective tier if userId provided
      let effectiveTier = "free";
      if (userId) {
        effectiveTier = await this.client.premium.getEffectiveTier(userId, guildId);
      }

      // Validate premium features
      const validatedSettings = this.validateSettings(settings, effectiveTier as any);

      await prisma.guild.upsert({
        where: { guildId },
        create: { 
          guildId, 
          ...validatedSettings,
          language: validatedSettings.language || "EnglishUS"
        },
        update: { 
          ...validatedSettings,
          lastActivity: new Date()
        }
      });

      return { success: true, settings: validatedSettings };
    } catch (error) {
      console.error("Error updating guild settings:", error);
      throw error;
    }
  }

  /**
   * Get premium-aware feature availability
   */
  async getAvailableFeatures(guildId: string, userId?: string) {
    try {
      let effectiveTier = "free";
      if (userId) {
        effectiveTier = await this.client.premium.getEffectiveTier(userId, guildId);
      }

      return {
        tier: effectiveTier,
        features: {
          customBotName: effectiveTier !== "free",
          customEmbedColor: effectiveTier !== "free",
          enable247: effectiveTier === "premiumplus",
          advancedSettings: effectiveTier !== "free",
          prioritySupport: effectiveTier !== "free",
          betaFeatures: effectiveTier === "premiumplus"
        },
        limits: {
          maxQueueSize: effectiveTier === "free" ? 25 : effectiveTier === "premium" ? 100 : 500,
          maxPlaylists: effectiveTier === "free" ? 2 : -1,
          maxVolume: 200,
          maxCustomCommands: effectiveTier === "free" ? 0 : effectiveTier === "premium" ? 10 : 25
        }
      };
    } catch (error) {
      console.error("Error getting available features:", error);
      throw error;
    }
  }

  private validateSettings(settings: any, tier: "free" | "premium" | "premiumplus") {
    const validated: any = {};

    // Always allowed settings
    if (settings.language) validated.language = settings.language;
    if (typeof settings.defaultVolume === 'number') {
      validated.defaultVolume = Math.max(1, Math.min(200, settings.defaultVolume));
    }
    if (typeof settings.enableAutoplay === 'boolean') validated.enableAutoplay = settings.enableAutoplay;
    if (typeof settings.enableVoteSkip === 'boolean') validated.enableVoteSkip = settings.enableVoteSkip;

    // Premium features
    if (tier !== "free") {
      if (settings.customBotName) validated.customBotName = settings.customBotName.substring(0, 32);
      if (settings.embedColor) {
        // Validate hex color
        const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (colorRegex.test(settings.embedColor)) {
          validated.embedColor = settings.embedColor;
        }
      }
    }

    // Premium+ features
    if (tier === "premiumplus") {
      if (typeof settings.enable247 === 'boolean') validated.enable247 = settings.enable247;
    }

    return validated;
  }

  private formatGuildSettings(guild: any) {
    return {
      guildId: guild.guildId,
      language: guild.language || "EnglishUS",
      customBotName: guild.customBotName,
      embedColor: guild.embedColor,
      defaultVolume: guild.defaultVolume || 100,
      enable247: guild.enable247 || false,
      enableAutoplay: guild.enableAutoplay || false,
      enableVoteSkip: guild.enableVoteSkip !== false, // Default true
      premiumFrom: guild.premiumFrom,
      premiumTo: guild.premiumTo,
      premiumPlan: guild.premiumPlan,
      isActive: guild.isActive !== false, // Default true
      lastActivity: guild.lastActivity || new Date(),
      totalCommands: guild.totalCommands || 0,
      premiumSlots: guild.premiumSlots || 1
    };
  }

  /**
   * Get current guild settings (public method for commands)
   */
  async getSettings(guildId: string): Promise<any> {
    try {
      const guild = await this.client.prisma.guild.findUnique({
        where: { guildId }
      });

      if (!guild) {
        // Create default guild settings
        const defaultGuild = await this.client.prisma.guild.create({
          data: {
            guildId,
            premiumPlan: 'Free'
          }
        });
        return this.formatGuildSettings(defaultGuild);
      }

      return this.formatGuildSettings(guild);
    } catch (error) {
      this.client.logger.error('Failed to get guild settings:', error);
      throw error;
    }
  }

  /**
   * Update guild settings with premium validation (public method for commands)
   */
  async updateSettings(guildId: string, settings: any): Promise<boolean> {
    try {
      const guild = await this.client.prisma.guild.findUnique({
        where: { guildId }
      });

      const premiumTier = guild ? this.client.premium.premiumPlanToTier(guild.premiumPlan) : "free";
      
      // Validate settings based on premium tier
      const validatedSettings = this.validateSettings(settings, premiumTier);

      // Update guild settings
      await this.client.prisma.guild.upsert({
        where: { guildId },
        create: {
          guildId,
          premiumPlan: 'Free',
          ...validatedSettings
        },
        update: validatedSettings
      });

      return true;
    } catch (error) {
      this.client.logger.error('Failed to update guild settings:', error);
      throw error;
    }
  }

  /**
   * Set custom bot avatar for guild (Premium+ feature)
   */
  async setCustomBotAvatar(guildId: string, userId: string, avatarUrl: string): Promise<{success: boolean, message: string}> {
    const guild = await this.client.prisma.guild.findUnique({
      where: { guildId }
    });

    const premiumTier = guild ? this.client.premium.premiumPlanToTier(guild.premiumPlan) : "free";
    
    if (premiumTier !== 'premiumplus') {
      return {
        success: false,
        message: 'Premium+ subscription required for custom bot avatar'
      };
    }

    try {
      await this.client.prisma.guild.upsert({
        where: { guildId },
        create: {
          guildId,
          premiumPlan: 'Free'
        },
        update: {}
      });

      return {
        success: true,
        message: 'Custom bot avatar updated successfully!'
      };
    } catch (error) {
      this.client.logger.error('Failed to set custom bot avatar:', error);
      return {
        success: false,
        message: 'Failed to update bot avatar. Please try again later.'
      };
    }
  }

  /**
   * Set custom bot name for guild (Premium+ feature)
   */
  async setCustomBotName(guildId: string, userId: string, customName: string): Promise<{success: boolean, message: string}> {
    const guild = await this.client.prisma.guild.findUnique({
      where: { guildId }
    });

    const premiumTier = guild ? this.client.premium.premiumPlanToTier(guild.premiumPlan) : "free";
    
    if (premiumTier !== 'premiumplus') {
      return {
        success: false,
        message: 'Premium+ subscription required for custom bot name'
      };
    }

    try {
      await this.client.prisma.guild.upsert({
        where: { guildId },
        create: {
          guildId,
          premiumPlan: 'Free'
        },
        update: {}
      });

      return {
        success: true,
        message: 'Custom bot name updated successfully!'
      };
    } catch (error) {
      this.client.logger.error('Failed to set custom bot name:', error);
      return {
        success: false,
        message: 'Failed to update bot name. Please try again later.'
      };
    }
  }
}
