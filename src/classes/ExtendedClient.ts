import config from "@/config";
import commands from "@/handlers/commands";
import events from "@/handlers/events";
import { initI18n } from "@/handlers/i18n";
import Logger from "@/helpers/logger";
import antiCrash from "@/plugins/antiCrash";
import type { Command } from "@/typings/command";
import { PrismaClient } from "prisma/generated";
import { SearchService } from "@/services/SearchService";
import { PremiumService } from "@/services/PremiumService";
import { QualityService } from "@/services/QualityService";
import { GuildSettingsService } from "@/services/GuildSettingsService";
import FeederService from "@/services/FeederService";
import { RedisClient } from "@/classes/RedisClient";
import {
    ActivityType,
    Client,
    Collection,
    Partials,
    PresenceUpdateStatus,
} from "discord.js";
import LavalinkClient from "./LavalinkClient";
import { Utils } from "./Utils";
import interactions from "@/handlers/interactions";
import registerPlay from "@/slash/play";
import registerQueue from "@/slash/queue";
import registerSkip from "@/slash/skip";
import registerPause from "@/slash/pause";
import registerResume from "@/slash/resume";
import registerVolume from "@/slash/volume";
import registerNowPlaying from "@/slash/nowplaying";
import registerJoin from "@/slash/join";
import registerLeave from "@/slash/leave";
import registerSeek from "@/slash/seek";
import registerShuffle from "@/slash/shuffle";
import registerLoop from "@/slash/loop";
import registerAutoplay from "@/slash/autoplay";
import registerRemove from "@/slash/remove";
import registerClearQueue from "@/slash/clearqueue";
import register8d from "@/slash/8d";
import registerBassboost from "@/slash/bassboost";
import registerSpeed from "@/slash/speed";
import registerPitch from "@/slash/pitch";
import registerNightcore from "@/slash/nightcore";
import registerTremolo from "@/slash/tremolo";
import registerVibrato from "@/slash/vibrato";
import registerKaraoke from "@/slash/karaoke";
import registerLowpass from "@/slash/lowpass";
import registerReset from "@/slash/reset";
import registerRotation from "@/slash/rotation";
import registerPing from "@/slash/ping";
import registerHelp from "@/slash/help";
import registerPremium from "@/slash/premium";
import registerPlaylist from "@/slash/playlist";
import registerCreate from "@/slash/create";
import registerAdd from "@/slash/add";
import registerRemovesong from "@/slash/removesong";
import registerDelete from "@/slash/delete";
import registerLoad from "@/slash/load";
import registerSteal from "@/slash/steal";
import register247 from "@/slash/247";
import registerTiers from "@/slash/tiers-new";

export const logger = new Logger();
export const prisma = new PrismaClient();

if (config.preconnect) {
    prisma
        .$connect()
        .then(() => {
            logger.info("Connected to database");
        })
        .catch((error) => {
            logger.error("Failed when connect to database", error);
        });
}

export default class ExtendedClient extends Client<true> {
    public collection = {
        // Keep prefix commands for backward compatibility
        prefixcommands: new Collection<string, Command>(),
        slashcommands: new Collection<string, any>(),
        aliases: new Collection<string, string>(),
        components: {
            buttons: new Collection<string, any>(),
            selects: new Collection<string, any>(),
            modals: new Collection<string, any>(),
            autocomplete: new Collection<string, any>(),
        },
    };

    // Prefix system enabled
    public prefix: string;

    public manager = new LavalinkClient(this);
    
    // Services (initialize Redis lazily)
    public redis!: import("@/classes/RedisClient").RedisClient;
    public search = new SearchService(this);
    public premium = new PremiumService();
    public quality = new QualityService(this);
    public guildSettings = new GuildSettingsService(this);
    public feeder = new FeederService(this);

    constructor() {
        super({
            intents: 3276799,
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.User,
                Partials.ThreadMember,
            ],
            allowedMentions: { parse: ["roles", "users"], repliedUser: false },
        });
        
        // Initialize prefix from environment
        this.prefix = process.env.PREFIX || ".";
    }

    public prisma = prisma;

    public logger = logger;

    public utils = new Utils(this);

    public emoji = config.emoji;

    public icons = config.icons;

    public color = config.color;

    // Hybrid mode startup (both slash and prefix)
    public start = async (token: string) => {
        // Initialize Redis first
        try {
            const { RedisClient } = await import("@/classes/RedisClient");
            this.redis = new RedisClient();
            await this.redis.connect();
            this.logger.info("Connected to Redis");
        } catch (error) {
            this.logger.warn("Failed to connect to Redis:", error);
        }
        
        // load events and other systems (prefix commands enabled)
        commands(this);
        events(this);
        // Start feeder maintenance on startup (will manage all active players via events)
        try {
            this.feeder; // ensure constructed
            this.logger.info("FeederService initialized");
        } catch (e) {
            this.logger.warn("FeederService init failed:", e);
        }
        // shardStart(this, token);
        antiCrash(this);
        initI18n(this);

        // Wire slash interaction router and register initial slash handlers
        interactions(this);
        registerPlay(this);
        registerQueue(this);
        registerSkip(this);
        registerPause(this);
        registerResume(this);
        registerVolume(this);
        registerNowPlaying(this);
        registerJoin(this);
        registerLeave(this);
        registerSeek(this);
        registerShuffle(this);
        registerLoop(this);
        registerAutoplay(this);
        registerRemove(this);
        registerClearQueue(this);
        register8d(this);
        registerBassboost(this);
        registerSpeed(this);
        registerPitch(this);
        registerNightcore(this);
        registerTremolo(this);
        registerVibrato(this);
        registerKaraoke(this);
        registerLowpass(this);
        registerReset(this);
        registerRotation(this);
        // Info commands
        registerPing(this);
        registerHelp(this);
        registerPremium(this);
        registerPlaylist(this);
        registerCreate(this);
        registerAdd(this);
        registerRemovesong(this);
        registerDelete(this);
        registerLoad(this);
        registerSteal(this);
        register247(this);
        registerTiers(this);

        await this.login(token);
        const bot = await this.prisma.bot.findUnique({ where: { botId: this.user.id } });
        if (!bot) await this.prisma.bot.create({ data: { botId: this.user.id } });
        // If autoplay default requested, hook into player creation
        if (process.env.ENABLE_AUTOPLAY_DEFAULT === '1') {
            try {
                this.manager.on('playerCreate', (player: any) => {
                    try {
                        player.set?.('autoplay', true);
                        (player as any).__autoplay = true;
                    } catch {}
                });
            } catch {}
        }

        // IPC listener for dashboard runtime updates
        try {
            process.on('message', async (packet: any) => {
                if (!packet || packet.type !== 'process:msg' || !packet.data) return;
                const { action } = packet.data;
                const requestId = packet.data.requestId;
                const reply = (data: any) => {
                    try { (process as any).send?.({ type: 'process:msg', data }); } catch {}
                };
                if (action === 'updateProfile') {
                    const { botName, avatarUrl } = packet.data;
                    if (botName && this.user?.username !== botName && typeof this.user?.setUsername === 'function') {
                        try { await this.user.setUsername(botName); } catch {}
                    }
                    if (avatarUrl && typeof this.user?.setAvatar === 'function') {
                        try { await this.user.setAvatar(avatarUrl); } catch {}
                    }
                    reply({ action: 'profileData', requestId, username: this.user?.username, avatar: this.user?.avatar, applied: true });
                } else if (action === 'updatePresence') {
                    const { status, activity, activityType } = packet.data;
                    try { if (status) this.user?.setStatus(status as any); } catch {}
                    try {
                        if (activity) this.user?.setActivity(activity, { type: (activityType || 'PLAYING') as any });
                    } catch {}
                    reply({ action: 'presenceData', requestId, status: this.user?.presence?.status, activity, activityType });
                } else if (action === 'queryProfile') {
                    reply({
                        action: 'profileData',
                        requestId,
                        username: this.user?.username,
                        avatar: this.user?.avatar,
                        status: this.user?.presence?.status,
                        activities: this.user?.presence?.activities?.map(a => ({ name: a.name, type: a.type })) || []
                    });
                } else if (action === 'queryMetrics') {
                    const mem = process.memoryUsage();
                    const cpu = process.cpuUsage();
                    reply({
                        action: 'metricsData',
                        requestId,
                        memory: { rss: mem.rss, heapUsed: mem.heapUsed },
                        cpu: { user: cpu.user, system: cpu.system },
                        uptime: process.uptime()
                    });
                }
            });
        } catch {}
        await this.application?.fetch();

        // One-time profile updates (guarded to avoid rate limit thrashing)
        try {
            const desiredName = "NAVCODE Rhythm";
            if (this.user?.username !== desiredName && typeof this.user?.setUsername === "function") {
                await this.user.setUsername(desiredName);
            }
        } catch (e) {
            this.logger.warn("Unable to set username (rate limit or permission):", e);
        }
        try {
            const avatarUrl = "https://i.postimg.cc/8Cft6rnc/profile.gif";
            if (typeof this.user?.setAvatar === "function") {
                await this.user.setAvatar(avatarUrl);
            }
        } catch (e) {
            this.logger.warn("Unable to set avatar (rate limit or invalid asset):", e);
        }

        // Set minimal presence (no branding text)
        this.user?.setStatus(PresenceUpdateStatus.Online);
    };
}

type CustomClient = ExtendedClient;
declare global {
    interface ExtendedClient extends CustomClient {}
}
