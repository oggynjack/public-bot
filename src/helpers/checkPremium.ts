import type { FullUser } from "@/typings";
import type { Guild } from "prisma/generated";
import { PremiumService } from "@/services/PremiumService";

const premiumService = new PremiumService();

/**
 * Enhanced premium check using the PremiumService for accurate tier detection
 */
async function checkPremium(guild: Guild, user: FullUser): Promise<boolean> {
    try {
        // Get the effective tier (highest between user and guild premium)
        const effectiveTier = await premiumService.getEffectiveTier(user.userId, guild.guildId);
        
        // Return true if user has any premium tier
        return effectiveTier !== "free";
    } catch (error) {
        console.error("Error checking premium status:", error);
        
        // Fallback to old method if service fails
        const currentDateTime = Date.now();

        if (guild.premiumTo && currentDateTime < guild.premiumTo.getTime()) {
            return true;
        } else if (user.premiumTo && currentDateTime < user.premiumTo.getTime()) {
            return true;
        }

        return false;
    }
}

/**
 * Check if user/guild has specific tier or higher
 */
async function checkPremiumTier(guild: Guild, user: FullUser, requiredTier: "premium" | "premiumplus"): Promise<boolean> {
    try {
        return await premiumService.hasTier(user.userId, guild.guildId, requiredTier);
    } catch (error) {
        console.error("Error checking premium tier:", error);
        return false;
    }
}

/**
 * Get the effective premium tier for user/guild combination
 */
async function getPremiumTier(guild: Guild, user: FullUser): Promise<"free" | "premium" | "premiumplus"> {
    try {
        return await premiumService.getEffectiveTier(user.userId, guild.guildId);
    } catch (error) {
        console.error("Error getting premium tier:", error);
        return "free";
    }
}

export default checkPremium;
export { checkPremiumTier, getPremiumTier };
