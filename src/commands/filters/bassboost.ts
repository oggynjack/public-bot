import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { EQList } from "lavalink-client";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "bassboost",
    {
        description: {
            content: "desc.bassboost",
            examples: [
                "bassboost high",
                "bassboost medium",
                "bassboost low",
                "bassboost off",
            ],
            usage: "bassboost [hight | medium | low | off]",
        },
        aliases: ["bb"],
        cooldown: "5s",
        voiceOnly: true,
        sameRoom: true,
        botPermissions: [
            "SendMessages",
            "ReadMessageHistory",
            "ViewChannel",
            "EmbedLinks",
        ],
        ignore: false,
        category: Category.filters,
    },
    async (client, guild, user, message, args) => {
        // Check premium status for filters
        const userTier = await client.premium.getUserTier(message.author.id, message.guildId!);
        
        if (userTier === "free") {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle("🔒 Premium Feature")
                .setDescription("**Audio Filters require Premium access**\n\n" +
                    "Bass boost and other audio filters are available for Premium and Premium Plus subscribers only.\n\n" +
                    "**Premium Audio Features:**\n" +
                    "• Bass boost (high, medium, low)\n" +
                    "• 8D surround sound\n" +
                    "• Nightcore and speed effects\n" +
                    "• Karaoke mode\n" +
                    "• All audio filters\n\n" +
                    `Contact <@${process.env.OWNER_ID}> to upgrade to Premium!`)
                .setFooter({ text: "Upgrade to Premium for audio filters" });
            
            return message.reply({ embeds: [embed] });
        }
        
        const player = client.manager.getPlayer(message.guildId);
        const types = ["high", "medium", "low", "off"];

        if (!args[0] || !types.includes(args[0])) {
            const embed = new EmbedBuilder();

            return await message.channel.send({
                embeds: [
                    embed.setColor(client.color.red).setDescription(
                        T(guild.language, "error.bassboost_type", {
                            type: types.join(", "),
                        }),
                    ),
                ],
            });
        }

        if (!args[0]) {
            return message.reply(
                "❌ **|** You need to provide a bassboost type. Example: `low`, `medium`, `high`",
            );
        }
        switch (args[0].toLowerCase()) {
            case "high": {
                await player?.filterManager.setEQ(EQList.BassboostHigh);
                return await message.react(client.emoji.done);
            }
            case "medium": {
                await player?.filterManager.setEQ(EQList.BassboostMedium);
                return await message.react(client.emoji.done);
            }
            case "low": {
                await player?.filterManager.setEQ(EQList.BassboostLow);
                return await message.react(client.emoji.done);
            }
            case "off": {
                await player?.filterManager.clearEQ();
                return await message.react(client.emoji.done);
            }
        }
    },
);
