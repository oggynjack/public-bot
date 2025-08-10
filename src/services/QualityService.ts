import type ExtendedClient from "@/classes/ExtendedClient";
import type { UserTier } from "./PremiumService";
import type { Player } from "lavalink-client";

export interface QualityTier {
    name: string;
    maxBitrate: number;
    maxVolume: number;
    allowedFilters: string[];
    simultaneousFilters: number;
    queueLimit: number;
    playlistLimit: number;
    seekAccuracy: 'low' | 'medium' | 'high';
}

export interface AudioQualityConfig {
    free: QualityTier;
    premium: QualityTier;
    premiumplus: QualityTier;
}

export class QualityService {
    private client: ExtendedClient;
    private qualityConfig: AudioQualityConfig;

    constructor(client: ExtendedClient) {
        this.client = client;
        this.qualityConfig = {
            free: {
                name: "Basic Quality",
                maxBitrate: 64000, // 64kbps - lowest quality
                maxVolume: 100,
                allowedFilters: [], // NO FILTERS for free users
                simultaneousFilters: 0,
                queueLimit: 1, // Only 1 song at a time - immediate switch
                playlistLimit: 0, // NO PLAYLISTS
                seekAccuracy: 'low'
            },
            premium: {
                name: "High Quality", 
                maxBitrate: 256000, // 256kbps
                maxVolume: 150,
                allowedFilters: [
                    "volume", "bassboost_low", "bassboost_medium", 
                    "nightcore", "8d", "karaoke", "lowpass"
                ],
                simultaneousFilters: 3,
                queueLimit: 100,
                playlistLimit: 10,
                seekAccuracy: 'medium'
            },
            premiumplus: {
                name: "Ultra Quality",
                maxBitrate: 320000, // 320kbps
                maxVolume: 200,
                allowedFilters: [
                    "volume", "bassboost_low", "bassboost_medium", "bassboost_high",
                    "nightcore", "8d", "karaoke", "lowpass", "rotation", 
                    "tremolo", "vibrato", "pitch", "speed"
                ],
                simultaneousFilters: 5,
                queueLimit: 500,
                playlistLimit: 50,
                seekAccuracy: 'high'
            }
        };
    }

    /**
     * Get quality tier configuration for premium level
     */
    getQualityTier(UserTier: UserTier): QualityTier {
        return this.qualityConfig[UserTier];
    }

    /**
     * Check if user can use a specific filter
     */
    async canUseFilter(userId: string, guildId: string, filterName: string): Promise<{
        allowed: boolean;
        reason?: string;
        tier: UserTier;
    }> {
        const effectiveTier = await this.client.premium.getEffectiveTier(userId, guildId);
        const qualityTier = this.getQualityTier(effectiveTier);

        const allowed = qualityTier.allowedFilters.includes(filterName);
        
        return {
            allowed,
            reason: allowed ? undefined : `Filter '${filterName}' requires ${this.getRequiredTierForFilter(filterName)} tier`,
            tier: effectiveTier
        };
    }

    /**
     * Check if user can apply multiple filters simultaneously
     */
    async canApplyMultipleFilters(userId: string, guildId: string, activeFilters: string[]): Promise<{
        allowed: boolean;
        reason?: string;
        maxAllowed: number;
    }> {
        const effectiveTier = await this.client.premium.getEffectiveTier(userId, guildId);
        const qualityTier = this.getQualityTier(effectiveTier);

        const allowed = activeFilters.length <= qualityTier.simultaneousFilters;

        return {
            allowed,
            reason: allowed ? undefined : `You can only use ${qualityTier.simultaneousFilters} filters simultaneously with ${qualityTier.name}`,
            maxAllowed: qualityTier.simultaneousFilters
        };
    }

    /**
     * Get maximum volume for user's tier
     */
    async getMaxVolume(userId: string, guildId: string): Promise<{
        maxVolume: number;
        tier: UserTier;
    }> {
        const effectiveTier = await this.client.premium.getEffectiveTier(userId, guildId);
        const qualityTier = this.getQualityTier(effectiveTier);

        return {
            maxVolume: qualityTier.maxVolume,
            tier: effectiveTier
        };
    }

    /**
     * Check if volume setting is allowed for user
     */
    async canSetVolume(userId: string, guildId: string, volume: number): Promise<{
        allowed: boolean;
        reason?: string;
        maxVolume: number;
    }> {
        const { maxVolume } = await this.getMaxVolume(userId, guildId);
        const allowed = volume <= maxVolume;

        return {
            allowed,
            reason: allowed ? undefined : `Maximum volume for your tier is ${maxVolume}%`,
            maxVolume
        };
    }

    /**
     * Get queue limit for user's tier
     */
    async getQueueLimit(userId: string, guildId: string): Promise<{
        queueLimit: number;
        tier: UserTier;
    }> {
        const effectiveTier = await this.client.premium.getEffectiveTier(userId, guildId);
        const qualityTier = this.getQualityTier(effectiveTier);

        return {
            queueLimit: qualityTier.queueLimit,
            tier: effectiveTier
        };
    }

    /**
     * Check if user can add more tracks to queue
     */
    async canAddToQueue(userId: string, guildId: string, currentQueueSize: number, tracksToAdd: number = 1): Promise<{
        allowed: boolean;
        reason?: string;
        remaining: number;
    }> {
        const { queueLimit } = await this.getQueueLimit(userId, guildId);
        const newSize = currentQueueSize + tracksToAdd;
        const allowed = newSize <= queueLimit;
        const remaining = Math.max(0, queueLimit - currentQueueSize);

        return {
            allowed,
            reason: allowed ? undefined : `Queue limit is ${queueLimit} tracks for your tier`,
            remaining
        };
    }

    /**
     * Apply quality settings to Lavalink player
     */
    async applyQualitySettings(player: Player, userId: string, guildId: string): Promise<void> {
        try {
            const effectiveTier = await this.client.premium.getEffectiveTier(userId, guildId);
            const qualityTier = this.getQualityTier(effectiveTier);

            // Apply bitrate settings through player options
            // Note: This depends on your Lavalink configuration
            const qualitySettings = {
                bitrate: qualityTier.maxBitrate,
                maxVolume: qualityTier.maxVolume,
                seekAccuracy: qualityTier.seekAccuracy
            };

            // Store quality settings in player data for reference
            player.set("qualitySettings", qualitySettings);
            player.set("qualityTier", effectiveTier);

            this.client.logger.debug(`Applied ${qualityTier.name} settings to player in guild ${guildId}`);
        } catch (error) {
            this.client.logger.error("Error applying quality settings:", error);
        }
    }

    /**
     * Get required tier for a specific filter
     */
    private getRequiredTierForFilter(filterName: string): string {
        for (const [tier, config] of Object.entries(this.qualityConfig)) {
            if (config.allowedFilters.includes(filterName)) {
                return config.name;
            }
        }
        return "Premium Plus";
    }

    /**
     * Get tier comparison for display
     */
    getTierComparison(): { [key in UserTier]: QualityTier } {
        return this.qualityConfig as { [key in UserTier]: QualityTier };
    }

    /**
     * Generate quality tier embed info
     */
    generateTierInfo(tier: UserTier) {
        const config = this.getQualityTier(tier);
        return {
            name: config.name,
            bitrate: `${config.maxBitrate / 1000}kbps`,
            volume: `${config.maxVolume}%`,
            filters: config.allowedFilters.length,
            simultaneousFilters: config.simultaneousFilters,
            queueLimit: config.queueLimit,
            playlistLimit: config.playlistLimit,
            seekAccuracy: config.seekAccuracy
        };
    }

    /**
     * Check if user needs premium upgrade for feature
     */
    async checkPremiumRequirement(userId: string, guildId: string, feature: 'filter' | 'volume' | 'queue' | 'playlist', value?: any): Promise<{
        hasAccess: boolean;
        currentTier: UserTier;
        requiredTier?: UserTier;
        upgradeMessage?: string;
    }> {
        const currentTier = await this.client.premium.getEffectiveTier(userId, guildId);
        const currentConfig = this.getQualityTier(currentTier);

        let hasAccess = true;
        let requiredTier: UserTier | undefined;
        let upgradeMessage: string | undefined;

        switch (feature) {
            case 'filter':
                if (value && !currentConfig.allowedFilters.includes(value)) {
                    hasAccess = false;
                    requiredTier = this.getMinimumTierForFilter(value);
                    upgradeMessage = `Filter '${value}' requires ${this.getQualityTier(requiredTier).name} or higher`;
                }
                break;
            case 'volume':
                if (value && value > currentConfig.maxVolume) {
                    hasAccess = false;
                    requiredTier = this.getMinimumTierForVolume(value);
                    upgradeMessage = `Volume ${value}% requires ${this.getQualityTier(requiredTier).name} or higher`;
                }
                break;
            case 'queue':
                if (value && value > currentConfig.queueLimit) {
                    hasAccess = false;
                    requiredTier = this.getMinimumTierForQueue(value);
                    upgradeMessage = `Queue size ${value} requires ${this.getQualityTier(requiredTier).name} or higher`;
                }
                break;
        }

        return {
            hasAccess,
            currentTier,
            requiredTier,
            upgradeMessage
        };
    }

    /**
     * Get minimum tier required for filter
     */
    private getMinimumTierForFilter(filterName: string): UserTier {
        for (const [tier, config] of Object.entries(this.qualityConfig)) {
            if (config.allowedFilters.includes(filterName)) {
                return tier as UserTier;
            }
        }
        return "premiumplus";
    }

    /**
     * Get minimum tier required for volume
     */
    private getMinimumTierForVolume(volume: number): UserTier {
        if (volume <= this.qualityConfig.free.maxVolume) return "free";
        if (volume <= this.qualityConfig.premium.maxVolume) return "premium";
        return "premiumplus";
    }

    /**
     * Get minimum tier required for queue size
     */
    private getMinimumTierForQueue(queueSize: number): UserTier {
        if (queueSize <= this.qualityConfig.free.queueLimit) return "free";
        if (queueSize <= this.qualityConfig.premium.queueLimit) return "premium";
        return "premiumplus";
    }
}

export default QualityService;
