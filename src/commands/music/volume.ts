import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "volume",
    {
        description: {
            content: ".",
            examples: ["volume 100"],
            usage: "volume [0 - 200]",
        },
        aliases: ["v", "vol"],
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
        category: Category.music,
    },
    async (client, guild, user, message, args) => {
        const player = client.manager.getPlayer(message.guildId);
        const number = Number(args[0]);

        if (Number.isNaN(number) || number < 0 || number > 200) {
            let description = "";
            if (Number.isNaN(number)) {
                description = T(guild.language, "error.common.invalid_number");
            } else if (number < 0) {
                description = T(guild.language, "error.volume.minium");
            } else if (number > 200) {
                description = T(guild.language, "error.volume.maxium");
            }

            return await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color.red)
                        .setDescription(description),
                ],
            });
        }

        // Premium restriction for high volume (above 100%)
        if (number > 100) {
            const userTier = await client.premium.getUserTier(user.userId, guild.guildId);
            const guildTier = await client.premium.getGuildTier(guild.guildId);
            
            // Convert tier strings to numbers for comparison
            const userTierNum = userTier === "free" ? 0 : userTier === "premium" ? 1 : 2;
            const guildTierNum = guildTier === "free" ? 0 : guildTier === "premium" ? 1 : 2;
            const highestTier = Math.max(userTierNum, guildTierNum);
            
            if (highestTier === 0) { // Free tier
                return await message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(0xFFD700)
                            .setTitle("⭐ Premium Required")
                            .setDescription(
                                "**High Volume Control (100%+) requires Premium!**\n\n" +
                                "🎵 **Free Tier:** Volume up to 100%\n" +
                                "⭐ **Premium Tier:** Volume up to 200%\n\n" +
                                `Use \`${client.prefix}premium\` to upgrade!`
                            )
                    ],
                });
            }
        }

        await player.setVolume(number);

        return await message.react(client.emoji.done);
    },
);
