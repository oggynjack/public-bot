import checkPremium from "@/helpers/checkPremium";
import { PremiumErrorEmbedBuilder } from "@/interface/premium";
import prefix from "@/layouts/prefix";
import { EmbedBuilder, type VoiceBasedChannel } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "play",
    {
        description: {
            content: "desc.play",
            examples: [
                "play example",
                "play https://www.youtube.com/watch?v=example",
                "play https://open.spotify.com/track/example",
                "play http://www.example.com/example.mp3",
            ],
            usage: "play [song]",
        },
        aliases: ["p"],
        cooldown: "5s",
        voiceOnly: true,
        sameRoom: true,
        botPermissions: [
            "SendMessages",
            "ReadMessageHistory",
            "ViewChannel",
            "EmbedLinks",
            "Connect",
            "Speak",
        ],
        ignore: false,
        category: Category.music,
    },
    async (client, guild, user, message, args) => {
        let query = args.join(" ");
        const embed = new EmbedBuilder();

        // Debug helpers
        const GREEN = (s: string) => `\x1b[32m${s}\x1b[0m`;
        const YELLOW = (s: string) => `\x1b[33m${s}\x1b[0m`;
        const RED = (s: string) => `\x1b[31m${s}\x1b[0m`;
        const dbg = {
            step: (label: string, extra?: any) =>
                console.log(GREEN(`[.play] ${label}` + (extra !== undefined ? ` ${typeof extra === "string" ? extra : JSON.stringify(extra)}` : ""))),
            warn: (label: string, extra?: any) =>
                console.warn(YELLOW(`[.play] ${label}` + (extra !== undefined ? ` ${typeof extra === "string" ? extra : JSON.stringify(extra)}` : ""))),
            err: (label: string, extra?: any) =>
                console.error(RED(`[.play] ${label}` + (extra !== undefined ? ` ${typeof extra === "string" ? extra : JSON.stringify(extra)}` : ""))),
        };

        dbg.step("invoked", { guildId: message.guildId, userId: message.author.id, query });

        if (!query) {
            dbg.warn("no query provided");
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription(T(guild.language, "error.common.no_query")),
                ],
            });
        }

        const msg = await message.channel.send(T(guild.language, "use_many.searching"));
        const memberVoiceChannel = message.member?.voice.channel as VoiceBasedChannel;

        // Smart search: YouTube first, SoundCloud fallback unless user specified URL or prefix
        (() => {
            const isUrl = /^(https?:\/\/)/i.test(query);
            const hasPrefix = /^(ytmsearch:|ytsearch:|scsearch:|spsearch:)/i.test(query);
            if (!isUrl && !hasPrefix) {
                query = `ytsearch:${query}`; // Try YouTube first for better quality
            }
        })();

        dbg.step("search started", { query, voiceChannelId: memberVoiceChannel?.id });

        // Get or create player
        let player =
            client.manager.getPlayer(message.guildId) ||
            client.manager.createPlayer({
                guildId: message.guildId,
                voiceChannelId: memberVoiceChannel.id,
                textChannelId: message.channelId,
                selfMute: false,
                selfDeaf: true,
                vcRegion: memberVoiceChannel.rtcRegion!,
            });
        dbg.step(player ? "player found/created" : "player missing", {
            hasPlayer: Boolean(player),
            connected: player?.connected,
            vcRegion: memberVoiceChannel?.rtcRegion,
        });

        if (!player.connected) {
            dbg.step("connecting player");
            await player.connect();
            dbg.step("player connected", { connected: player.connected });
        }

        try {
            // First attempt: default search (typically YouTube/YouTube Music per manager config)
            dbg.step("initial search", { engine: "forced-scsearch-or-user-specified", query });
            let response = await player.search({ query }, message.author);
            dbg.step("initial search result", {
                loadType: (response as any)?.loadType,
                tracks: response?.tracks?.length ?? 0,
                playlist: (response as any)?.loadType === "playlist",
            });

            // Since we now force scsearch unless user provided URL/prefix, no fallback branch is needed.
            // Keep minimal guard to log if load failed for visibility.
            const loadType = (response as any)?.loadType as string | undefined;
            if (loadType === "LOAD_FAILED") {
                dbg.err("search load failed");
            }

            // YouTube-only search for testing
            if (!response || response.tracks?.length === 0) {
                dbg.warn("no results on YouTube", { query });
                return msg.edit({
                    content: "",
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription(T(guild.language, "error.common.no_result")),
                    ],
                });
            }

            const tracksToAdd =
                response.loadType === "playlist" ? response.tracks : response.tracks.slice(0, 3);
            dbg.step("queue add", {
                mode: response.loadType === "playlist" ? "playlist" : "single",
                addCount: tracksToAdd.length,
                first: tracksToAdd[0]?.info?.title,
            });

            if (!(await checkPremium(guild, user)) && tracksToAdd.length > 25) {
                return msg.edit({
                    content: "",
                    embeds: [
                        new PremiumErrorEmbedBuilder(
                            client,
                            guild,
                            T(guild.language, "error.premium.limit_tracks"),
                        ),
                    ],
                });
            }

            await player.queue.add(tracksToAdd);
            // Some queue implementations expose size via .size or .length or an array-like .tracks
            const qSize =
                typeof (player.queue as any).size === "number"
                    ? (player.queue as any).size
                    : Array.isArray((player.queue as any).tracks)
                    ? (player.queue as any).tracks.length
                    : (Array.isArray((player.queue as any)) ? (player.queue as any).length : undefined);
            dbg.step("queue size", { size: qSize });

            const embedDescription =
                response.loadType === "playlist"
                    ? T(guild.language, "success.added.track", {
                          amount: response.tracks.length,
                      })
                    : T(guild.language, "success.added.queue", {
                          title: response.tracks[0].info.title,
                          uri: response.tracks[0].info.uri,
                      });

            await msg.edit({
                content: "",
                embeds: [
                    embed.setColor(client.color.main).setDescription(embedDescription),
                ],
            });

            if (!player.playing) {
                dbg.step("starting playback");
                await player.play({ paused: false });
                dbg.step("playback started", { playing: player.playing });
            } else {
                dbg.step("already playing, items queued", { playing: player.playing });
            }
        } catch (error) {
            dbg.err("unhandled error", String(error));
            console.error(error);
            await msg.edit({
                content: "",
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription(T(guild.language, "error.common.error")),
                ],
            });
        }
    },
);
