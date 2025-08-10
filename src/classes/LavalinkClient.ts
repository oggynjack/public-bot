import { autoPlayFunction, requesterTransformer } from "@/helpers/player";
import { LavalinkManager, type SearchPlatform, type SearchResult } from "lavalink-client";
import type ExtendedClient from "./ExtendedClient";

export default class LavalinkClient extends LavalinkManager {
    constructor(public client: ExtendedClient) {
        super({
            nodes: [
                {
                    id: "node-01",
                    host: process.env.LAVALINK_SERVER_HOST || "localhost",
                    port: Number(process.env.LAVALINK_SERVER_PORT || 2333),
                    authorization: process.env.LAVALINK_SERVER_PASSWORD || "youshallnotpass",
                    secure: false,
                },
            ],
            sendToShard: (guildId, payload) =>
                client.guilds.cache.get(guildId)?.shard?.send(payload),
            queueOptions: {
                maxPreviousTracks: 25,
                // queueStore: new CustomStore(client),
                // queueChangesWatcher: new CustomWatcher(client),
            },
            playerOptions: {
                defaultSearchPlatform: "youtube music",
                onDisconnect: {
                    autoReconnect: true,
                    destroyPlayer: false,
                },
                requesterTransformer,
                onEmptyQueue: { destroyAfterMs: 3 * 60000, autoPlayFunction },
            },
            autoSkipOnResolveError: true,
            emitNewSongsOnly: true,
        });
    }

    public async search(
        query: string,
        user: unknown,
        source?: SearchPlatform,
    ): Promise<SearchResult> {
        const nodes = this.nodeManager.leastUsedNodes();
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        const result = await node.search({ query, source }, user, false);
        return result;
    }
}
