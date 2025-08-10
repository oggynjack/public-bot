import event from "@/layouts/event";
import type { Client } from "discord.js";
import { Routes } from "discord-api-types/v10";

export default event("ready", { once: true }, async (_, client: Client<true>) => {
    // Colorized logger wrappers
    const GREEN = (s: string) => `\x1b[32m${s}\x1b[0m`;
    const YELLOW = (s: string) => `\x1b[33m${s}\x1b[0m`;
    const RED = (s: string) => `\x1b[31m${s}\x1b[0m`;

    // Patch logger output colors: info->yellow, warn->yellow, success->green, error->red, default->yellow
    try {
        const base = _.logger;
        const wrap = (fn: (...args: any[]) => any, color: (s: string) => string) =>
            (...args: any[]) => fn.call(base, color(args.map(a => (typeof a === "string" ? a : JSON.stringify(a))).join(" ")));
        if ((base as any).info) (base as any).info = wrap((base as any).info, YELLOW);
        if ((base as any).warn) (base as any).warn = wrap((base as any).warn, YELLOW);
        if ((base as any).success) (base as any).success = wrap((base as any).success, GREEN);
        if ((base as any).error) (base as any).error = wrap((base as any).error, RED);
        // Fallback console as well, to catch any direct console logs
        const _cl = console.log.bind(console);
        const _ce = console.error.bind(console);
        const _cw = console.warn.bind(console);
        console.log = (...args: any[]) => _cl(GREEN(args.join(" ")));
        console.error = (...args: any[]) => _ce(RED(args.join(" ")));
        console.warn = (...args: any[]) => _cw(YELLOW(args.join(" ")));
    } catch {}

    _.logger.success("Logged in as: " + client.user.tag);

    // OGGY banner loop (every 20s)
    (function OGGY_BANNER_LOOP() {
        // Center-align banner with consistent left padding (10 spaces)
        const banner =
`           #######   ######    ######   ##    ## 
          ##     ## ##    ##  ##    ##   ##  ##  
          ##     ## ##        ##          ####   
          ##     ## ##   #### ##   ####    ##    
          ##     ## ##    ##  ##    ##     ##    
          ##     ## ##    ##  ##    ##     ##    
           #######   ######    ######      ##`;
        const green = (s: string) => `\x1b[32m${s}\x1b[0m`;

        // Heartbeat info (Discord WebSocket ping + REST latency fallback)
        const heartbeat = async () => {
            try {
                // Prefer WS ping if valid
                const wsPing = client.ws.ping;
                if (Number.isFinite(wsPing) && wsPing >= 0) return `${wsPing.toFixed(0)}ms`;

                // Fallback: measure REST round-trip latency with a lightweight call
                const started = Date.now();
                await client.rest.get(Routes.oauth2CurrentApplication()); // very small/authenticated
                const rt = Date.now() - started;
                return `${rt}ms`;
            } catch {
                return "N/A";
            }
        };

        const print = async () => {
            try {
                const hb = await heartbeat();
                // banner already contains color codes for full-green rendering
                console.log(banner);
                console.log(green(`          Heartbeat: ${hb}`));
            } catch {}
        };

        // initial print and repeat every 120s
        print();
        setInterval(() => { void print(); }, 120000);
    })();

    await _.manager.init({
        id: client.user.id,
        username: client.user.username,
        shards: "auto",
    });
});
