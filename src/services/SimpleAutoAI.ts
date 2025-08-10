import type ExtendedClient from "@/classes/ExtendedClient";
import { AIService, type MusicContext } from "./AIService";
import { PremiumService } from "./PremiumService";

// Enhanced AI state tracking
interface AIState {
  userHasPlayedOnce: boolean;
  lastPlayCommandTime: number;
  lastAutoSuggestionTime: number;
  totalAutoSuggestionsGiven: number;
  lastSkipTime: number;
  skipCount: number;
  recentSongs: string[];
  userLanguage?: string;
}

export class SimpleAutoAI {
  private client: ExtendedClient;
  private aiService: AIService;
  private premiumService: PremiumService;
  private guildStates = new Map<string, AIState>();
  
  // Reduced time threshold from 5 minutes to 2.5 minutes
  private readonly TIME_THRESHOLD = 2.5 * 60 * 1000; // 2:30 minutes

  constructor(client: ExtendedClient) {
    this.client = client;
    this.aiService = new AIService();
    this.premiumService = new PremiumService();
  }

  /**
   * Enhanced guild state management
   */
  private getGuildState(guildId: string): AIState {
    if (!this.guildStates.has(guildId)) {
      this.guildStates.set(guildId, {
        userHasPlayedOnce: false,
        lastPlayCommandTime: 0,
        lastAutoSuggestionTime: 0,
        totalAutoSuggestionsGiven: 0,
        lastSkipTime: 0,
        skipCount: 0,
        recentSongs: [],
        userLanguage: 'en'
      });
    }
    return this.guildStates.get(guildId)!;
  }

  /**
   * Record play command with enhanced context tracking
   */
  recordPlayCommand(guildId: string, songTitle?: string): void {
    const state = this.getGuildState(guildId);
    state.userHasPlayedOnce = true;
    state.lastPlayCommandTime = Date.now();
    
    // Track recent songs
    if (songTitle) {
      state.recentSongs.unshift(songTitle);
      if (state.recentSongs.length > 10) {
        state.recentSongs = state.recentSongs.slice(0, 10);
      }
    }
    
    this.logActivity(guildId, "Play Command", `User play command recorded: ${songTitle || 'Unknown'}`);
  }

  /**
   * Record skip command for auto-suggestion enhancement
   */
  recordSkipCommand(guildId: string, skipCount: number = 1): void {
    const state = this.getGuildState(guildId);
    state.lastSkipTime = Date.now();
    state.skipCount = skipCount;
    
    this.logActivity(guildId, "Skip Command", `Skip command recorded: ${skipCount} songs`);
  }

  /**
   * Enhanced auto-suggestion logic with skip-based recommendations
   */
  async shouldGetAutoSuggestions(userId: string, guildId: string): Promise<boolean> {
    const tier = await this.premiumService.getEffectiveTier(userId, guildId);
    if (tier === "free") return false;

    const state = this.getGuildState(guildId);
    
    // Must have played at least once
    if (!state.userHasPlayedOnce) return false;

    // Check if autoplay or 24/7 is enabled - if so, no limits apply
    const player = this.client.manager.getPlayer(guildId);
    if (player) {
      const has247Mode = (player as any).__247Mode ?? false;
      const hasAutoplay = (player as any).get?.("autoplay") ?? (player as any).__autoplay ?? false;
      
      if (has247Mode || hasAutoplay) {
        this.logActivity(guildId, "AI Check", "Unlimited suggestions - 24/7 or autoplay enabled");
        return true;
      }
    }

    // Enhanced limits: 12-15 suggestions instead of 5-10
    const maxSuggestions = this.getEnhancedMaxSuggestions(tier);
    const timeSinceLastPlay = Date.now() - state.lastPlayCommandTime;

    // Reset counter if it's been more than 2.5 minutes since last play command
    if (timeSinceLastPlay > this.TIME_THRESHOLD) {
      state.totalAutoSuggestionsGiven = 0;
      this.logActivity(guildId, "AI Reset", `Counter reset after ${Math.round(timeSinceLastPlay / 60000)}m`);
    }

    const canSuggest = state.totalAutoSuggestionsGiven < maxSuggestions;
    
    this.logActivity(guildId, "AI Check", 
      `Suggestions: ${state.totalAutoSuggestionsGiven}/${maxSuggestions}, ` +
      `Last play: ${Math.round(timeSinceLastPlay / 60000)}m ago, ` +
      `Can suggest: ${canSuggest}`
    );

    return canSuggest;
  }

  /**
   * Enhanced maximum suggestions with increased limits
   */
  private getEnhancedMaxSuggestions(tier: string): number {
    switch (tier) {
      case "premium": return 12; // Increased from 5 to 12
      case "premiumplus": return 15; // Increased from 10 to 15
      default: return 0;
    }
  }

  /**
   * Enhanced AI suggestions with skip-based auto-addition
   */
  async getAutoSuggestions(songTitle: string, userId: string, guildId: string): Promise<string[]> {
    try {
      const tier = await this.premiumService.getEffectiveTier(userId, guildId);
      if (tier === "free") return [];

      const shouldSuggest = await this.shouldGetAutoSuggestions(userId, guildId);
      if (!shouldSuggest) return [];

      const state = this.getGuildState(guildId);
      
      // Get guild language preference for enhanced recommendations
      const guildLanguage = await this.getGuildLanguage(guildId);
      
      // Build enhanced music context
      const context: MusicContext = {
        currentSong: songTitle,
        recentSongs: state.recentSongs,
        userLanguage: state.userLanguage,
        guildLanguage: guildLanguage,
        skipCount: state.skipCount,
        timeOfDay: new Date().getHours() < 12 ? 'morning' : 
                   new Date().getHours() < 18 ? 'afternoon' : 'evening'
      };

      // Generate AI recommendations
      const recommendations = await this.aiService.processRequest(
        `songs similar to ${songTitle}`, 
        context
      );

      // Convert recommendations to search queries
      const suggestions = recommendations.map(rec => rec.query);
      
      // Update suggestion counter
      state.totalAutoSuggestionsGiven += suggestions.length;
      state.lastAutoSuggestionTime = Date.now();
      
      this.logActivity(guildId, "AI Suggestions", 
        `Generated ${suggestions.length} suggestions for "${songTitle}"`
      );

      return suggestions;
    } catch (error) {
      console.error("[SimpleAutoAI Error]:", error);
      return [];
    }
  }

  /**
   * Generate skip-based automatic song additions
   */
  async getSkipBasedSuggestions(userId: string, guildId: string, skipCount: number): Promise<string[]> {
    try {
      const tier = await this.premiumService.getEffectiveTier(userId, guildId);
      if (tier === "free") return [];

      const state = this.getGuildState(guildId);
      
      // Record the skip
      this.recordSkipCommand(guildId, skipCount);
      
      // Get guild language preference
      const guildLanguage = await this.getGuildLanguage(guildId);
      
      // Build context for skip-based recommendations
      const context: MusicContext = {
        currentSong: state.recentSongs[0],
        recentSongs: state.recentSongs,
        userLanguage: state.userLanguage,
        guildLanguage: guildLanguage,
        skipCount: skipCount,
        timeOfDay: new Date().getHours() < 12 ? 'morning' : 
                   new Date().getHours() < 18 ? 'afternoon' : 'evening'
      };

      // Generate skip-based recommendations
      const recommendations = await this.aiService.processRequest(
        'skip based music recommendations', 
        context
      );

      // Return same number of suggestions as skips (but cap at 5)
      const suggestions = recommendations
        .map(rec => rec.query)
        .slice(0, Math.min(skipCount * 2, 5));
      
      this.logActivity(guildId, "Skip-based AI", 
        `Generated ${suggestions.length} skip-based suggestions (${skipCount} skips)`
      );

      return suggestions;
    } catch (error) {
      console.error("[Skip-based AI Error]:", error);
      return [];
    }
  }

  /**
   * Get guild language preference
   */
  private async getGuildLanguage(guildId: string): Promise<string> {
    try {
      const settings = await this.client.guildSettings.getSettings(guildId);
      return settings?.language || 'en';
    } catch {
      return 'en';
    }
  }

  /**
   * Activity logging for debugging (optimized for production)
   */
  logActivity(guildId: string, action: string, details: string): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SimpleAutoAI] ${guildId.slice(-4)} | ${action}: ${details}`);
    }
  }
}
