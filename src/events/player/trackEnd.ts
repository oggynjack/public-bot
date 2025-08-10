import event from "@/layouts/event";
import type { TextChannel } from "discord.js";
import { EmbedBuilder } from "discord.js";
import type { Player, Track, TrackStartEvent } from "lavalink-client";

export default event(
    "trackEnd",
    { once: false },
    async (client, player: Player, track: Track | null, payload: TrackStartEvent) => {
        const guild = client.guilds.cache.get(player.guildId);
        if (!guild) return;

        const channel = guild.channels.cache.get(player.textChannelId!) as TextChannel;
        if (!channel) return;

        // Always remove the previous Now Playing message, if any
        const messageId = player.get<string | undefined>("messageId");
        if (messageId) {
            try {
                const message = await channel.messages.fetch(messageId);
                if (message) await message.delete();
            } catch {}
            // Clear stored messageId so we don't act on stale IDs
            try { (player as any).set?.("messageId", undefined); } catch {}
        }

        const anyP = player as any;
        const hasQueue =
            anyP.queue?.tracks?.length > 0 || (Array.isArray(anyP.queue) && anyP.queue.length > 0);
        const autoplayEnabled =
            anyP.__autoplay || anyP.autoplay || anyP.get?.("autoplay");
        const isLooping =
            anyP.trackRepeat ||
            anyP.repeatMode === "track" ||
            anyP.loop === "track" ||
            anyP.__trackRepeat;
        const is247Mode = anyP.__247Mode;

        // Policy:
        // 1) If 24/7 is enabled: NEVER send "song finished" embeds.
        if (is247Mode) {
            return;
        }

        // 2) If autoplay is enabled: only send a single "queue finished" embed when the entire queue is done.
        // That means only when there is no next track queued and nothing else will autoplay now.
        if (autoplayEnabled) {
            // If there are still items queued or we're looping, do nothing.
            if (hasQueue || isLooping) {
                return;
            }
            // At this point, autoplay is on but there is no queue and the track just ended.
            // This means autoplay flow has no more items to play -> send a single "queue finished" embed.
            try {
                const embed = new EmbedBuilder()
                    .setColor(client.color.main)
                    .setTitle("✅ Queue Finished")
                    .setDescription(
                        "Autoplay is enabled, but there are no more related tracks to play. Playback has ended."
                    )
                    .setTimestamp()
                    .setFooter({
                        text: "Use /play to start again or /autoplay to toggle autoplay.",
                    });

                await channel.send({ embeds: [embed] });
            } catch {}
            return;
        }

        // 3) If autoplay is disabled:
        // - Do not spam per-track finished embeds; only send when this final track finishes and nothing else is queued or looping.
        if (!autoplayEnabled) {
            if (hasQueue || isLooping) {
                return;
            }

            if (track?.info) {
                const embed = new EmbedBuilder()
                    .setColor(client.color.main)
                    .setTitle("🏁 Song Finished")
                    .addFields(
                        { name: "Track", value: track.info.title || "Unknown", inline: true },
                        { name: "Artist", value: track.info.author || "Unknown", inline: true },
                        { name: "Status", value: "Queue empty - playback stopped", inline: false }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: "Use /play to add more songs or /autoplay to enable continuous music",
                    });

                try {
                    const sentMessage = await channel.send({ embeds: [embed] });
                    // Auto-clear after 30 seconds
                    setTimeout(async () => {
                        try {
                            const clearEmbed = new EmbedBuilder()
                                .setColor(client.color.gray)
                                .setDescription("🗑️ *Song finished message cleared*");
                            await sentMessage.edit({ embeds: [clearEmbed] });

                            setTimeout(async () => {
                                try {
                                    await sentMessage.delete();
                                } catch {}
                            }, 3000);
                        } catch {}
                    }, 30000);
                } catch {}
            }
        }
    },
);
