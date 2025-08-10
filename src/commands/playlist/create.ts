import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "create",
    {
        description: {
            content: "Create a new music playlist (Premium feature)",
            examples: ["create KPop", "create Punjabi Hits", "create My Favorites"],
            usage: "create [playlist_name]",
        },
        cooldown: "5s",
        botPermissions: [
            "SendMessages",
            "ReadMessageHistory",
            "ViewChannel",
            "EmbedLinks",
        ],
        ignore: false,
        category: Category.playlist,
    },
    async (client, guild, user, message, args) => {
        // Check premium status for playlists
        const userTier = await client.premium.getUserTier(message.author.id, message.guildId!);
        
        if (userTier === "free") {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle("🔒 Premium Feature")
                .setDescription("**Playlists require Premium access**\n\n" +
                    "Create and manage custom playlists with Premium!\n\n" +
                    "**Premium Playlist Features:**\n" +
                    "• Create up to 10 playlists (Premium)\n" +
                    "• Create up to 25 playlists (Premium+)\n" +
                    "• Save your favorite songs\n" +
                    "• Share playlists with others\n" +
                    "• Advanced playlist management\n\n" +
                    `Contact <@${process.env.OWNER_ID}> to upgrade to Premium!`)
                .setFooter({ text: "Upgrade to Premium for playlists" });
            
            return message.reply({ embeds: [embed] });
        }
        
        const embed = new EmbedBuilder();
        const name = args[0];
        
        // Check playlist limits based on tier
        const maxPlaylists = userTier === "premium" ? 10 : 25;
        if (user.playlists.length >= maxPlaylists) {
            return message.channel.send({
                embeds: [
                    embed.setColor(0xFF0000)
                        .setDescription(`❌ **Playlist limit reached!**\n\n**Your tier:** ${userTier === "premium" ? "⭐ Premium" : "💎 Premium+"}\n**Max playlists:** ${maxPlaylists}\n\n${userTier === "premium" ? "Upgrade to Premium+ for up to 25 playlists!" : ""}`)
                ],
            });
        }

        if (!name) {
            return message.channel.send({
                embeds: [
                    embed
                        .setDescription(T(guild.language, "error.playlist.no_playlist"))
                        .setColor(client.color.red),
                ],
            });
        }

        if (name.length > 50) {
            return message.channel.send({
                embeds: [
                    embed
                        .setDescription(T(guild.language, "error.create.limit_length"))
                        .setColor(client.color.red),
                ],
            });
        }

        const playlistExists = user.playlists.find((f) => f.name === name);

        if (playlistExists) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription(T(guild.language, "error.create.playlist_exist")),
                ],
            });
        }

        try {
            await client.prisma.playlist.create({
                data: { name, userId: message.author.id },
            });
            return message.channel.send({
                embeds: [
                    embed
                        .setDescription(T(guild.language, "success.create", { name }))
                        .setColor(client.color.green),
                ],
            });
        } catch (error) {
            console.error(error);
            return message.channel.send({
                embeds: [
                    embed
                        .setDescription(T(guild.language, "error.common.error"))
                        .setColor(client.color.red),
                ],
            });
        }
    },
);
