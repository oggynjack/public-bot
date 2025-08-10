import prefix from "@/layouts/prefix";
import {
    ActionRowBuilder,
    EmbedBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    VoiceChannel,
} from "discord.js";
import type { SearchResult } from "lavalink-client";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "search",
    {
        description: {
            content: "🔍 Search and select music to play or add to queue",
            examples: ["search karan aujla", "/search punjabi songs", "search bollywood hits"],
            usage: "search [song/artist/query]",
        },
        aliases: ["find", "sc"],
        cooldown: "3s",
        voiceOnly: true,
        sameRoom: true,
        botPermissions: [
            "SendMessages",
            "ReadMessageHistory",
            "ViewChannel",
            "EmbedLinks",
        ],
        ignore: false,
        category: Category.music,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder().setColor(client.color.main);
        const query = args.join(" ");
        const memberVoiceChannel = message.member?.voice.channel as VoiceChannel;

        if (!query) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription(T(guild.language, "error.common.no_keyword")),
                ],
            });
        }

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

        if (!player.connected) await player.connect();

        try {
            const response = (await player.search(
                { query },
                message.author,
            )) as SearchResult;

            if (!response || response.tracks.length === 0) {
                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription(T(guild.language, "error.common.no_result"))
                            .setColor(client.color.red),
                    ],
                });
            }

            if (response.loadType === "search" && response.tracks.length > 0) {
                const selectMenu = new StringSelectMenuBuilder({
                    custom_id: "search_select",
                    placeholder: T(guild.language, "search.placeholder"),
                });

                const trackDescriptions = response.tracks.map((track, index) => {
                    selectMenu.addOptions(
                        new StringSelectMenuOptionBuilder({
                            label: track.info.title.slice(0, 100),
                            value: index.toString(),
                            description: client.utils.formatTime(track.info.duration),
                        }),
                    );
                    return `${index + 1}. [${track.info.title}](${track.info.uri}) - \`${track.info.author}\``;
                });

                const row = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
                    selectMenu,
                );
                const msg = await message.channel.send({
                    embeds: [embed.setDescription(trackDescriptions.join("\n"))],
                    components: [row],
                });

                const collector = msg.createMessageComponentCollector({
                    filter: (interaction) => interaction.user.id === message.author.id,
                    max: 1,
                    time: 60000,
                });

                collector.on("collect", async (interaction) => {
                    if (
                        !interaction.isStringSelectMenu() ||
                        interaction.customId !== "search_select"
                    )
                        return;

                    const track = response.tracks[parseInt(interaction.values[0])];
                    await interaction.deferUpdate();
                    if (!track) return;

                    // Check if user has premium for queue limits
                    const userTier = await client.premium.getUserTier(user.userId, guild.guildId);
                    const maxTracks = userTier === "free" ? 10 : userTier === "premium" ? 100 : 200;
                    
                    if (player.queue.tracks.length >= maxTracks) {
                        return msg.edit({
                            content: "",
                            embeds: [
                                embed.setColor(0xFF0000)
                                    .setDescription(`❌ **Queue limit reached!**\n\n**Your tier:** ${userTier === "free" ? "🆓 Free" : userTier === "premium" ? "⭐ Premium" : "💎 Premium+"}\n**Max tracks:** ${maxTracks}\n\n${userTier === "free" ? `Upgrade to Premium for up to 100 tracks!\nContact <@${process.env.OWNER_ID}> for premium access.` : ""}`)
                            ],
                        });
                    }

                    player.queue.add(track);
                    if (!player.playing) await player.play({ paused: false });

                    await msg.edit({
                        embeds: [
                            embed.setDescription(
                                T(guild.language, "success.added.queue", {
                                    title: track.info.title,
                                    uri: track.info.uri,
                                }),
                            ),
                        ],
                        components: [],
                    });
                });

                collector.on("end", async () => {
                    await msg.edit({
                        components: [row.setComponents(selectMenu.setDisabled(true))],
                    });
                });
            } else {
                return await message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription(T(guild.language, "error.common.no_result")),
                    ],
                });
            }
        } catch (error) {
            console.error(error);
            await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription(T(guild.language, "error.common.error")),
                ],
            });
        }
    },
);
