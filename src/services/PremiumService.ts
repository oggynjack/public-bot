import { PrismaClient, PremiumPlan } from "../../prisma/generated";
import { prisma } from "../classes/ExtendedClient";

export type UserTier = "free" | "premium" | "premiumplus";

export interface PremiumStatus {
  isPremium: boolean;
  premiumTier: UserTier;
  premiumFrom?: Date;
  premiumTo?: Date;
}

export class PremiumService {
  
  /**
   * Convert PremiumPlan enum to UserTier
   */
  public premiumPlanToTier(plan: PremiumPlan): UserTier {
    switch (plan) {
      case PremiumPlan.Premium:
      case PremiumPlan.TrialPremium:
        return "premium";
      case PremiumPlan.PremiumPlus:
        return "premiumplus";
      default:
        return "free";
    }
  }

  /**
   * Check if premium is currently active
   */
  private isPremiumActive(premiumTo?: Date | null): boolean {
    if (!premiumTo) return false;
    return new Date() <= premiumTo;
  }

  /**
   * Get user's premium tier
   */
  async getUserTier(userId: string, guildId: string): Promise<UserTier> {
    const user = await prisma.user.findUnique({
      where: { userId }
    });

    if (!user || !this.isPremiumActive(user.premiumTo)) {
      return "free";
    }

    return this.premiumPlanToTier(user.premiumPlan);
  }

  /**
   * Get user premium status (for debug command compatibility)
   */
  async getUserPremium(userId: string): Promise<PremiumStatus> {
    const user = await prisma.user.findUnique({
      where: { userId }
    });

    if (!user) {
      return {
        isPremium: false,
        premiumTier: "free",
        premiumFrom: undefined,
        premiumTo: undefined
      };
    }

    const isPremium = this.isPremiumActive(user.premiumTo);
    
    return {
      isPremium,
      premiumTier: isPremium ? this.premiumPlanToTier(user.premiumPlan) : "free",
      premiumFrom: user.premiumFrom || undefined,
      premiumTo: user.premiumTo || undefined
    };
  }

  /**
   * Get guild premium status (for debug command compatibility)
   */
  async getGuildPremium(guildId: string): Promise<PremiumStatus> {
    const guild = await prisma.guild.findUnique({
      where: { guildId }
    });

    if (!guild) {
      return {
        isPremium: false,
        premiumTier: "free",
        premiumFrom: undefined,
        premiumTo: undefined
      };
    }

    const isPremium = this.isPremiumActive(guild.premiumTo);
    
    return {
      isPremium,
      premiumTier: isPremium ? this.premiumPlanToTier(guild.premiumPlan) : "free",
      premiumFrom: guild.premiumFrom || undefined,
      premiumTo: guild.premiumTo || undefined
    };
  }
  
  /**
   * Get guild premium tier
   */
  async getGuildTier(guildId: string): Promise<UserTier> {
    const guild = await prisma.guild.findUnique({
      where: { guildId }
    });

    if (!guild || !this.isPremiumActive(guild.premiumTo)) {
      return "free";
    }

    return this.premiumPlanToTier(guild.premiumPlan);
  }
  
  /**
   * Get effective tier considering both user and server premium
   */
  async getEffectiveTier(userId: string, guildId: string): Promise<UserTier> {
    // Forced tier override (for dashboard-hosted bots)
    const forced = (process.env.FORCE_PREMIUM_TIER || '').toLowerCase();
    if (forced === 'premium' || forced === 'premiumplus') {
      return forced as UserTier;
    }
    // Check both user tier and guild tier, return highest
    const userTier = await this.getUserTier(userId, guildId);
    const guildTier = await this.getGuildTier(guildId);
    
    const tierLevels = {
      "free": 0,
      "premium": 1, 
      "premiumplus": 2
    };
    
    // Return the higher tier between user and guild
    return tierLevels[userTier] >= tierLevels[guildTier] ? userTier : guildTier;
  }
  
  /**
   * Check if user has specific tier or higher
   */
  async hasTier(userId: string, guildId: string, requiredTier: UserTier): Promise<boolean> {
    const userTier = await this.getEffectiveTier(userId, guildId);
    
    const tierLevels = {
      "free": 0,
      "premium": 1, 
      "premiumplus": 2
    };
    
    return tierLevels[userTier] >= tierLevels[requiredTier];
  }
  
  /**
   * Get maximum queue size for user's tier
   */
  getMaxQueueSize(tier: UserTier): number {
  if ((process.env.FORCE_PREMIUM_TIER || '').toLowerCase() === 'premiumplus') return 500;
    switch (tier) {
      case "free": return 0; // No queue for free users
      case "premium": return 100;
      case "premiumplus": return 500;
      default: return 0;
    }
  }
  
  /**
   * Get maximum auto-suggestions for user's tier
   */
  getMaxAutoSuggestions(tier: UserTier): number {
  if ((process.env.FORCE_PREMIUM_TIER || '').toLowerCase() === 'premiumplus') return 10;
    switch (tier) {
      case "free": return 0;
      case "premium": return 5;
      case "premiumplus": return 10;
      default: return 0;
    }
  }

  /**
   * Log command usage for analytics (optional implementation)
   */
  async logCommandUsage(
    commandName: string,
    userId: string,
    guildId: string,
    allowed: boolean,
    reason?: string
  ): Promise<void> {
    // This is a placeholder for command usage analytics
    // Can be implemented with database logging, external analytics, etc.
    // For now, we'll just log to console in debug mode
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Command Analytics] ${commandName} - User: ${userId}, Guild: ${guildId}, Allowed: ${allowed}${reason ? `, Reason: ${reason}` : ''}`);
    }
  }
}
