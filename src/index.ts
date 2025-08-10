import ExtendedClient, { logger } from "./classes/ExtendedClient";
import checkEnv from "./plugins/checkEnv";

console.clear();

(async () => {
    if (!checkEnv(logger)) {
        process.exit(1);
    }
    logger.success("Loaded all envs");

    const client = new ExtendedClient();
    await client.start(process.env.DISCORD_BOT_TOKEN as string);
    logger.success(`Client (hybrid mode: slash + prefix "${client.prefix}") started successfully`);
})();
