import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";
export default prefix(
    "autoplay",
    {
        description: {
            content: "cmd.autoplay",
            examples: ["autoplay"],
            usage: "autoplay",
        },
        aliases: ["ap"],
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
    async (client, guild, user, message) => {
        // Premium restriction for autoplay feature
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
                            "**Autoplay Feature requires Premium!**\n\n" +
                            "🎵 **Free Tier:** Manual queue management\n" +
                            "⭐ **Premium Tier:** Automatic song suggestions\n" +
                            "💎 **Premium+ Tier:** Advanced AI recommendations\n\n" +
                            `Use \`${client.prefix}premium\` to upgrade!`
                        )
                ],
            });
        }

        const player = client.manager.getPlayer(message.guildId);
        const embed = new EmbedBuilder();

        if (!player) {
            embed
                .setDescription(T(guild.language, "error.player.no_player"))
                .setColor(client.color.red);
            return await message.channel.send({ embeds: [embed] });
        }

        const autoplayEnabled = player.get<boolean>("autoplay");
        player.set("autoplay", !autoplayEnabled);

        const statusMessage = T(
            guild.language,
            autoplayEnabled
                ? "success.player.autoplay_off"
                : "success.player.autoplay_on",
        );

        embed.setDescription(`✅ | ${statusMessage}`).setColor(client.color.main);

        await message.channel.send({ embeds: [embed] });
    },
);
