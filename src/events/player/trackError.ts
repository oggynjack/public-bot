import { LavalinkManager, type Track } from "lavalink-client";
import type ExtendedClient from "../../classes/ExtendedClient";
import event from "@/layouts/event";

export default event(
  "trackError",
  { once: false },
  async (client: ExtendedClient, ...args: any[]) => {
    try {
      const [player, track, payload] = args;
      
      client.logger.warn("Track error occurred", {
        guildId: player.guildId,
        track: track?.info?.title || "Unknown",
        error: payload?.error || payload?.exception || "Unknown error",
        position: player.queue?.current?.info?.position || 0
      });

      // If there are more tracks in queue, skip to next
      if (player.queue?.tracks?.length > 0) {
        client.logger.info("Skipping to next track due to error", {
          guildId: player.guildId,
          nextTrack: player.queue.tracks[0]?.info?.title
        });
        await player.skip();
      }
    } catch (error) {
      client.logger.error("Error in trackError event handler", error);
    }
  },
);
