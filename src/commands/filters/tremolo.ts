import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";
export default prefix(
    "tremolo",
    {
        description: {
            content: "desc.tremolo",
            examples: ["tremolo"],
            usage: "tremolo",
        },
        aliases: ["tr"],
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
        // Premium restriction for audio filters
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
                            "**Tremolo Filter requires Premium!**\n\n" +
                            "🎵 **Free Tier:** Basic playback only\n" +
                            "⭐ **Premium Tier:** Advanced audio filters\n" +
                            "💎 **Premium+ Tier:** All filters + priority\n\n" +
                            `Use \`${client.prefix}premium\` to upgrade!`
                        )
                ],
            });
        }

        const player = client.manager.getPlayer(message.guildId);
        const embed = new EmbedBuilder();
        const tremoloEnabled = player?.filterManager.filters.tremolo;

        if (tremoloEnabled) {
            player?.filterManager.toggleTremolo();
            await message.channel.send({
                embeds: [
                    embed
                        .setDescription(T(guild.language, "success.filters.tremolo_off"))
                        .setColor(client.color.main),
                ],
            });
        } else {
            player?.filterManager.toggleTremolo();
            await message.channel.send({
                embeds: [
                    embed
                        .setDescription(T(guild.language, "success.filters.tremolo_on"))
                        .setColor(client.color.main),
                ],
            });
        }
    },
);
