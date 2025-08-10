import type { Player } from "lavalink-client";
import type ExtendedClient from "@/classes/ExtendedClient";
import { generateSearchHash, createCacheEntry, extractCacheData } from "@/helpers/cacheUtils";

export class SearchService {
    private client: ExtendedClient;

    constructor(client: ExtendedClient) {
        this.client = client;
    }

    /**
     * Cached search with Redis support
     */
    async search(player: Player, searchQuery: { query: string; source?: any }, requester: any): Promise<any> {
        try {
            // Generate cache key
            const cacheKey = generateSearchHash(searchQuery.query, searchQuery.source);
            
            // Check Redis cache first
            if (this.client.redis.isConnected()) {
                const cachedResult = await this.client.redis.getCachedSearchResult(cacheKey);
                if (cachedResult) {
                    const data = extractCacheData(cachedResult);
                    if (data) {
                        this.client.logger.debug(`Cache hit for search: ${searchQuery.query}`);
                        return data;
                    }
                }
            }

            // If not in cache, perform actual search
            this.client.logger.debug(`Cache miss for search: ${searchQuery.query}, performing search`);
            const result = await player.search(searchQuery, requester);

            // Cache the result if Redis is available and result is valid
            if (this.client.redis.isConnected() && result && result.tracks && result.tracks.length > 0) {
                const cacheEntry = createCacheEntry(result, 90); // 90 seconds cache
                await this.client.redis.cacheSearchResult(cacheKey, cacheEntry);
                this.client.logger.debug(`Cached search result for: ${searchQuery.query}`);
            }

            return result;
        } catch (error) {
            this.client.logger.error("Error in cached search:", error);
            // Fallback to direct search if caching fails
            return await player.search(searchQuery, requester);
        }
    }

    /**
     * Clear search cache for a specific query
     */
    async clearSearchCache(query: string, source?: string): Promise<void> {
        if (!this.client.redis.isConnected()) return;
        
        try {
            const cacheKey = generateSearchHash(query, source);
            await this.client.redis.del(`search:${cacheKey}`);
            this.client.logger.debug(`Cleared search cache for: ${query}`);
        } catch (error) {
            this.client.logger.warn("Failed to clear search cache:", error);
        }
    }

    /**
     * Get search cache statistics
     */
    async getCacheStats(): Promise<{ hits: number; misses: number } | null> {
        if (!this.client.redis.isConnected()) return null;
        
        try {
            const hits = await this.client.redis.get("stats:search:hits") || 0;
            const misses = await this.client.redis.get("stats:search:misses") || 0;
            return { hits: parseInt(hits.toString()), misses: parseInt(misses.toString()) };
        } catch (error) {
            this.client.logger.warn("Failed to get cache stats:", error);
            return null;
        }
    }
}

export default SearchService;
