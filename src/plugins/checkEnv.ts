import Logger from "@/helpers/logger";

/**
 * Multi-tenant adaptation:
 * Only enforce absolutely critical per-process envs. User provided token/app id
 * is injected (DISCORD_BOT_TOKEN / APPLICATION_ID). Other values (lyrics, lavalink, guild id)
 * are optional and features gracefully degrade if absent.
 */
export default function checkEnv(logger: Logger) {
    const envs = process.env;
    let valid = true;

    const required: string[] = [
        // Token + DB + prefix are essential for startup
        "DISCORD_BOT_TOKEN",
        "DATABASE_URL",
        "PREFIX",
    ];

    const optional: string[] = [
        "DISCORD_BOT_ID", // nice to have but can be derived post-login
        "GUILD_ID", // single-guild specific features; optional for general bots
        "LAVALINK_SERVER_HOST",
        "LAVALINK_SERVER_PORT",
        "LAVALINK_SERVER_PASSWORD",
        "GENIUS_ACCESS_TOKEN", // lyrics feature only
    ];

    for (const key of required) {
        if (!envs[key]) {
            logger.error(`Missing required env: ${key}`);
            valid = false;
        }
    }

    for (const key of optional) {
        if (!envs[key]) {
            logger.warn(`Optional env not set (feature may degrade): ${key}`);
        }
    }

    return valid;
}
