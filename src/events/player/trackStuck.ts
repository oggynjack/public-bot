import event from "@/layouts/event";
import type { Player, Track, TrackStuckEvent } from "lavalink-client";

export default event(
    "trackStuck",
    { once: false },
    async (client, player: Player, track: Track | null, payload: TrackStuckEvent) => {
      
      client.logger.warn("Track stuck detected", {
        guildId: player.guildId,
        track: track?.info?.title || "Unknown",
        source: track?.info?.sourceName || "Unknown",
        queueLength: player.queue?.tracks?.length || 0
      });

      // If there are more tracks in queue, skip to next immediately
      if (player.queue?.tracks?.length > 0) {
        client.logger.info("Skipping stuck track to next in queue", {
          guildId: player.guildId,
          stuckTrack: track?.info?.title,
          nextTrack: player.queue.tracks[0]?.info?.title
        });
        
        await player.skip();
      } else {
        client.logger.warn("No more tracks available after stuck track", {
          guildId: player.guildId
        });
      }
    });
