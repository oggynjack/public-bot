import { ButtonInteraction, Message, MessageFlags, EmbedBuilder } from "discord.js";
import type { Player, Track } from "lavalink-client";
import { createButtonRow } from "./createButtonRow";
import { T } from "@/handlers/i18n";
import { prisma } from "@/classes/ExtendedClient";
import type ExtendedClient from "@/classes/ExtendedClient";

export default function createCollector(
    message: Message,
    player: Player,
    track: Track,
    embed: any,
    client: ExtendedClient,
): void {
    const collector = message.createMessageComponentCollector();

    collector.on("collect", async (interaction: ButtonInteraction<"cached">) => {
        // Check if user is in the same voice channel
        if (
            interaction.guild.members.me?.voice.channelId !==
            interaction.member.voice.channelId
        ) {
            return await interaction.reply({
                content: `You need to be in ${interaction.guild.members.me?.voice.channelId ? `<#${interaction.guild.members.me.voice.channelId}>` : "the same voice channel"} to use these controls.`,
                flags: MessageFlags.Ephemeral,
            });
        }

        // Get user's premium tier for restrictions
        const userTier = await client.premium.getEffectiveTier(interaction.user.id, interaction.guildId!);

        const editMessage = async (text: string): Promise<void> => {
            if (message) {
                await message.edit({
                    embeds: [
                        embed.setFooter({
                            text,
                            iconURL: interaction.user.avatarURL(),
                        }),
                    ],
                    components: createButtonRow(player, client),
                });
            }
        };

        const sendPremiumRequired = async (feature: string) => {
            const premiumEmbed = new EmbedBuilder()
                .setColor(client.color.red)
                .setTitle("🔒 Premium Feature")
                .setDescription(
                    `**${feature}** is a premium feature!\n\n` +
                    "💎 **Premium Benefits:**\n" +
                    "• Advanced music controls\n" +
                    "• Queue management\n" +
                    "• Loop & shuffle modes\n" +
                    "• Priority support\n\n" +
                    "📞 Contact <@730818959112274040> to upgrade!"
                );
            
            await interaction.reply({
                embeds: [premiumEmbed],
                flags: MessageFlags.Ephemeral
            });
        };

        const guild = await prisma.guild.findUnique({
            where: { guildId: interaction.guild.id },
        });

        switch (interaction.customId) {
            case "previous":
                if (userTier === "free") {
                    await sendPremiumRequired("Previous Track");
                    return;
                }
                
                if (player.queue.previous) {
                    await interaction.deferUpdate();
                    const previousTrack = player.queue.previous[0];
                    player.play({
                        track: previousTrack,
                    });
                    await editMessage(
                        T(guild?.language!, "collector.previous", {
                            user: interaction.user.tag,
                        }),
                    );
                } else {
                    await interaction.reply({
                        content: T(guild?.language!, "collector.no_previous_track"),
                        flags: MessageFlags.Ephemeral,
                    });
                }
                break;
            case "resume":
                if (player.paused) {
                    player.resume();
                    await interaction.deferUpdate();
                    await editMessage(
                        T(guild?.language!, "collector.resume", {
                            user: interaction.user.tag,
                        }),
                    );
                } else {
                    player.pause();
                    await interaction.deferUpdate();
                    await editMessage(
                        T(guild?.language!, "collector.stop", {
                            user: interaction.user.tag,
                        }),
                    );
                }
                break;
            case "stop": {
                player.stopPlaying(true, false);
                await interaction.deferUpdate();
                break;
            }
            case "skip":
                if (userTier === "free") {
                    await sendPremiumRequired("Skip Control");
                    return;
                }
                
                if (player.queue.tracks.length > 0) {
                    await interaction.deferUpdate();
                    player.skip();
                    await editMessage(
                        T(guild?.language!, "collector.skip", {
                            user: interaction.user.tag,
                        }),
                    );
                } else {
                    await interaction.reply({
                        content: T(guild?.language!, "collector.no_next_track"),
                        flags: MessageFlags.Ephemeral,
                    });
                }
                break;
            case "loop": {
                if (userTier === "free") {
                    await sendPremiumRequired("Loop Mode");
                    return;
                }
                
                await interaction.deferUpdate();
                switch (player.repeatMode) {
                    case "off": {
                        player.setRepeatMode("track");
                        await editMessage(
                            T(guild?.language!, "collector.loop.track", {
                                user: interaction.user.tag,
                            }),
                        );
                        break;
                    }
                    case "track": {
                        player.setRepeatMode("queue");
                        await editMessage(
                            T(guild?.language!, "collector.loop.queue", {
                                user: interaction.user.tag,
                            }),
                        );
                        break;
                    }
                    case "queue": {
                        player.setRepeatMode("off");
                        await editMessage(
                            T(guild?.language!, "collector.loop.off", {
                                user: interaction.user.tag,
                            }),
                        );
                        break;
                    }
                }
                break;
            }

            case "shuffle": {
                if (userTier === "free") {
                    await sendPremiumRequired("Shuffle Mode");
                    return;
                }
                
                await interaction.deferUpdate();
                await player.queue.shuffle();
                await editMessage(
                    T(guild?.language!, "collector.shuffle", {
                        user: interaction.user.tag,
                    }),
                );
                break;
            }
        }
    });
}
