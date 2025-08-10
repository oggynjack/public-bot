import { createButtonRow } from "@/functions/createButtonRow";
import createCollector from "@/functions/createCollector";
import event from "@/layouts/event";
import { EmbedBuilder, type TextChannel } from "discord.js";
import type { Player, Track, TrackStartEvent } from "lavalink-client";
import type { Requester } from "@/typings/player";
import { T } from "@/handlers/i18n";

export default event(
    "trackStart",
    { once: false },
    async (client, player: Player, track: Track | null, payload: TrackStartEvent) => {
        const guild = client.guilds.cache.get(player.guildId);
        if (!guild || !player.textChannelId || !track) return;
        const channel = guild.channels.cache.get(player.textChannelId) as TextChannel;
        if (!channel) return;

        const embed = new EmbedBuilder();

        client.utils.updateStatus(client, guild.id);

        const data = await client.prisma.guild.upsert({
            where: { guildId: guild.id },
            create: { guildId: guild.id },
            update: {},
        });

        const requester = track.requester as Requester;

        embed
            .setAuthor({
                name: T(data.language, "use_many.player.playing"),
                iconURL:
                    client.icons[track.info.sourceName] ??
                    client.user?.displayAvatarURL({ extension: "png" }),
            })
            .setColor(client.color.main)
            .setDescription(`**${track.info.title}**`)
            .setFooter({
                text: `${T(data.language, "use_many.request_by")} ${requester.username}`,
                iconURL: requester.avatarURL,
            })
            .setThumbnail(track.info.artworkUrl)
            .addFields(
                {
                    name: T(data.language, "use_many.duration"),
                    value: track.info.isStream
                        ? "LIVE"
                        : client.utils.formatTime(track.info.duration),
                    inline: true,
                },
                {
                    name: T(data.language, "use_many.author"),
                    value: track.info.author,
                    inline: true,
                },
            )
            .setTimestamp();

        // Defensive: ensure player is not paused and volume is reasonable on start
        try {
            // Some client versions' pause() takes no args; call without params and then ensure playing state.
            try {
                if (typeof player.pause === "function") await (player as any).pause();
            } catch {}
            // Try to force resume if API provides resume()
            try {
                if (typeof (player as any).resume === "function") await (player as any).resume();
            } catch {}
            // Some client versions expose volume as a property or setter without args.
            try {
                // Preferred API
                if (typeof (player as any).setVolume === "function" && (player as any).setVolume.length === 1) {
                    await (player as any).setVolume(100);
                } else if ("volume" in player) {
                    // Fallback: direct property if available
                    (player as any).volume = 100;
                }
            } catch {}
        } catch (e) {
            client.logger?.warn?.("Failed to apply defensive player settings on trackStart", e as any);
        }

        const message = await channel.send({
            embeds: [embed],
            components: createButtonRow(player, client),
        });

        // Store the NP message id so we can clean it up on end/error/skip
        try { player.set("messageId", message.id); } catch { (player as any).set?.("messageId", message.id); }

        createCollector(message, player, track, embed, client);
    },
);
