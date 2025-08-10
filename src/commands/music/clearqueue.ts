import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "clearqueue",
    {
        description: {
            content: "desc.clearqueue",
            examples: ["clearqueue"],
            usage: "clearqueue",
        },
        aliases: ["cq"],
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
        // Premium restriction for advanced queue management
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
                            "**Advanced Queue Management requires Premium!**\n\n" +
                            "🎵 **Free Tier:** Basic skip, pause, resume\n" +
                            "⭐ **Premium Tier:** Clear queue, remove songs\n" +
                            "💎 **Premium+ Tier:** Advanced queue controls\n\n" +
                            `Use \`${client.prefix}premium\` to upgrade!`
                        )
                ],
            });
        }

        const player = client.manager.getPlayer(message.guildId);
        const embed = new EmbedBuilder();

        if (!player) {
            embed
                .setColor(client.color.red)
                .setDescription(T(guild.language, "error.player.no_player"));
            return await message.channel.send({ embeds: [embed] });
        }

        if (player.queue.tracks.length === 0) {
            embed
                .setColor(client.color.red)
                .setDescription(T(guild.language, "error.player.no_song_in_queue"));
            return await message.channel.send({ embeds: [embed] });
        }

        player.queue.tracks.splice(0, player.queue.tracks.length);

        await message.react(client.emoji.done);
    },
);
