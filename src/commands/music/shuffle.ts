import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "shuffle",
    {
        description: {
            content: "desc.shuffle",
            examples: ["shuffle"],
            usage: "shuffle",
        },
        aliases: ["sh"],
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
        // Premium restriction for queue shuffle
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
                            "**Queue Shuffle requires Premium!**\n\n" +
                            "🎵 **Free Tier:** Basic playback controls\n" +
                            "⭐ **Premium Tier:** Shuffle, advanced queue\n" +
                            "💎 **Premium+ Tier:** All features + priority\n\n" +
                            `Use \`${client.prefix}premium\` to upgrade!`
                        )
                ],
            });
        }

        const player = client.manager.getPlayer(message.guildId);

        if (player.queue.tracks.length === 0) {
            return await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color.red)
                        .setDescription(
                            T(guild.language, "error.player.no_song_in_queue"),
                        ),
                ],
            });
        }

        await player.queue.shuffle();
        return await message.react(client.emoji.done);
    },
);
