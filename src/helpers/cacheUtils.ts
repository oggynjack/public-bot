import crypto from "crypto";

/**
 * Generate a hash for search queries to use as cache keys
 */
export function generateSearchHash(query: string, source?: string): string {
    const input = `${query}:${source || 'default'}`;
    return crypto.createHash('md5').update(input).digest('hex');
}

/**
 * Generate a hash for any object/data
 */
export function generateDataHash(data: any): string {
    const stringified = typeof data === 'string' ? data : JSON.stringify(data);
    return crypto.createHash('md5').update(stringified).digest('hex');
}

/**
 * Validate if a cache key exists and is not expired
 */
export function isCacheValid(timestamp: number, ttl: number): boolean {
    return Date.now() - timestamp < ttl * 1000;
}

/**
 * Create a cache entry with metadata
 */
export function createCacheEntry(data: any, ttl: number = 90): any {
    return {
        data,
        timestamp: Date.now(),
        ttl,
        expires: Date.now() + (ttl * 1000)
    };
}

/**
 * Extract data from cache entry and check validity
 */
export function extractCacheData(cacheEntry: any): any | null {
    if (!cacheEntry || !cacheEntry.data) return null;
    
    // Check if cache entry has expired
    if (cacheEntry.expires && Date.now() > cacheEntry.expires) {
        return null;
    }
    
    return cacheEntry.data;
}

export default {
    generateSearchHash,
    generateDataHash,
    isCacheValid,
    createCacheEntry,
    extractCacheData
};
