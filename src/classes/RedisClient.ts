import { createClient, type RedisClientType } from "redis";
import config from "@/config";

export class RedisClient {
    private client: RedisClientType;
    private connected: boolean = false;

    constructor() {
        // Safely access Redis config with fallbacks
        const redisConfig = config.redis || {};
        
        this.client = createClient({
            url: redisConfig.url || 'redis://localhost:6379',
            password: redisConfig.password,
            database: redisConfig.database || 0,
        });

        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        this.client.on('connect', () => {
            console.log('Redis Client Connected');
            this.connected = true;
        });

        this.client.on('disconnect', () => {
            console.log('Redis Client Disconnected');
            this.connected = false;
        });
    }

    async connect(): Promise<void> {
        if (!this.connected) {
            await this.client.connect();
        }
    }

    async disconnect(): Promise<void> {
        if (this.connected) {
            await this.client.disconnect();
        }
    }

    isConnected(): boolean {
        return this.connected;
    }

    // Cache search results for 90 seconds
    async cacheSearchResult(hash: string, data: any, ttl: number = 90): Promise<void> {
        try {
            await this.client.setEx(`search:${hash}`, ttl, JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to cache search result:', error);
        }
    }

    async getCachedSearchResult(hash: string): Promise<any | null> {
        try {
            const result = await this.client.get(`search:${hash}`);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.warn('Failed to get cached search result:', error);
            return null;
        }
    }

    // Store guild settings
    async setGuildSettings(guildId: string, settings: any, ttl: number = 3600): Promise<void> {
        try {
            await this.client.setEx(`guild:${guildId}:settings`, ttl, JSON.stringify(settings));
        } catch (error) {
            console.warn('Failed to cache guild settings:', error);
        }
    }

    async getGuildSettings(guildId: string): Promise<any | null> {
        try {
            const result = await this.client.get(`guild:${guildId}:settings`);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.warn('Failed to get cached guild settings:', error);
            return null;
        }
    }

    // Store player state
    async setPlayerState(guildId: string, state: any, ttl: number = 300): Promise<void> {
        try {
            await this.client.setEx(`player:${guildId}:state`, ttl, JSON.stringify(state));
        } catch (error) {
            console.warn('Failed to cache player state:', error);
        }
    }

    async getPlayerState(guildId: string): Promise<any | null> {
        try {
            const result = await this.client.get(`player:${guildId}:state`);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.warn('Failed to get cached player state:', error);
            return null;
        }
    }

    // Distributed locks (5 second TTL)
    async acquireLock(key: string, ttl: number = 5): Promise<boolean> {
        try {
            const result = await this.client.setNX(`lock:${key}`, '1');
            if (result) {
                await this.client.expire(`lock:${key}`, ttl);
                return true;
            }
            return false;
        } catch (error) {
            console.warn('Failed to acquire lock:', error);
            return false;
        }
    }

    async releaseLock(key: string): Promise<void> {
        try {
            await this.client.del(`lock:${key}`);
        } catch (error) {
            console.warn('Failed to release lock:', error);
        }
    }

    // Store autoplay seed per guild
    async setAutoplaySeed(guildId: string, seed: any, ttl: number = 1800): Promise<void> {
        try {
            await this.client.setEx(`autoplay:${guildId}:seed`, ttl, JSON.stringify(seed));
        } catch (error) {
            console.warn('Failed to cache autoplay seed:', error);
        }
    }

    async getAutoplaySeed(guildId: string): Promise<any | null> {
        try {
            const result = await this.client.get(`autoplay:${guildId}:seed`);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.warn('Failed to get cached autoplay seed:', error);
            return null;
        }
    }

    // Rate limiting helpers
    async incrementRateLimit(key: string, ttl: number = 60): Promise<number> {
        try {
            const result = await this.client.incr(`ratelimit:${key}`);
            if (result === 1) {
                await this.client.expire(`ratelimit:${key}`, ttl);
            }
            return result;
        } catch (error) {
            console.warn('Failed to increment rate limit:', error);
            return 0;
        }
    }

    async getRateLimit(key: string): Promise<number> {
        try {
            const result = await this.client.get(`ratelimit:${key}`);
            return result ? parseInt(result) : 0;
        } catch (error) {
            console.warn('Failed to get rate limit:', error);
            return 0;
        }
    }

    // Generic get/set for any data
    async set(key: string, value: any, ttl?: number): Promise<void> {
        try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            if (ttl) {
                await this.client.setEx(key, ttl, stringValue);
            } else {
                await this.client.set(key, stringValue);
            }
        } catch (error) {
            console.warn(`Failed to set key ${key}:`, error);
        }
    }

    async get(key: string): Promise<any | null> {
        try {
            const result = await this.client.get(key);
            if (!result) return null;
            
            try {
                return JSON.parse(result);
            } catch {
                return result; // Return as string if not JSON
            }
        } catch (error) {
            console.warn(`Failed to get key ${key}:`, error);
            return null;
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.client.del(key);
        } catch (error) {
            console.warn(`Failed to delete key ${key}:`, error);
        }
    }

    async exists(key: string): Promise<boolean> {
        try {
            const result = await this.client.exists(key);
            return result === 1;
        } catch (error) {
            console.warn(`Failed to check if key ${key} exists:`, error);
            return false;
        }
    }
}

export default RedisClient;
