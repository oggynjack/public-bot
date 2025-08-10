import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { formatDistanceToNow } from "date-fns";

export default prefix(
    "premstatus",
    {
        description: {
            content: "Check premium status of user or guild",
            usage: "premstatus [id]",
            examples: [
                "premstatus 1364081078163472456",
                "premstatus @user"
            ],
        },
        aliases: ["pstatus", "ps"],
        specialRole: "owner",
        category: Category.dev,
        hidden: true,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder();

        if (args.length < 1) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription(`📊 **Premium Status Checker**\n\n\`ps <id>\` - Check premium status\n\n**Examples:**\n\`ps 1364081078163472456\`\n\`ps @user\``)
                        .setColor(client.color.main),
                ],
            });
        }

        const targetId = args[0].replace(/[<@!>]/g, '');
        const isGuildId = targetId.length >= 17;

        try {
            if (isGuildId) {
                // Check guild premium
                const guildData = await client.prisma.guild.findUnique({
                    where: { guildId: targetId }
                });

                const targetGuild = await client.guilds.fetch(targetId).catch(() => null);

                if (!guildData) {
                    return await message.channel.send({
                        embeds: [
                            embed
                                .setDescription(`🏠 **Guild Status**\n\n**Name:** ${targetGuild?.name || 'Unknown'}\n**ID:** \`${targetId}\`\n**Premium:** ❌ No premium`)
                                .setColor(client.color.red),
                        ],
                    });
                }

                const isActive = guildData.premiumTo && guildData.premiumTo > new Date();
                const timeRemaining = guildData.premiumTo ? formatDistanceToNow(guildData.premiumTo) : 'N/A';

                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription(`🏠 **Guild Premium Status**\n\n**Name:** ${targetGuild?.name || 'Unknown'}\n**ID:** \`${targetId}\`\n**Premium:** ${isActive ? '✅ Active' : '❌ Expired'}\n**Plan:** ${guildData.premiumPlan}\n**Expires:** ${guildData.premiumTo ? `<t:${Math.floor(guildData.premiumTo.getTime() / 1000)}:F>` : 'N/A'}\n**Time Left:** ${isActive ? timeRemaining : 'Expired'}`)
                            .setColor(isActive ? client.color.green : client.color.red),
                    ],
                });
            } else {
                // Check user premium
                const userData = await client.prisma.user.findUnique({
                    where: { userId: targetId }
                });

                const targetUser = await client.users.fetch(targetId).catch(() => null);

                if (!userData) {
                    return await message.channel.send({
                        embeds: [
                            embed
                                .setDescription(`👤 **User Status**\n\n**Name:** ${targetUser?.username || 'Unknown'}\n**ID:** \`${targetId}\`\n**Premium:** ❌ No premium`)
                                .setColor(client.color.red),
                        ],
                    });
                }

                const isActive = userData.premiumTo && userData.premiumTo > new Date();
                const timeRemaining = userData.premiumTo ? formatDistanceToNow(userData.premiumTo) : 'N/A';

                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription(`👤 **User Premium Status**\n\n**Name:** ${targetUser?.username || 'Unknown'}\n**ID:** \`${targetId}\`\n**Premium:** ${isActive ? '✅ Active' : '❌ Expired'}\n**Plan:** ${userData.premiumPlan}\n**Expires:** ${userData.premiumTo ? `<t:${Math.floor(userData.premiumTo.getTime() / 1000)}:F>` : 'N/A'}\n**Time Left:** ${isActive ? timeRemaining : 'Expired'}`)
                            .setColor(isActive ? client.color.green : client.color.red),
                    ],
                });
            }
        } catch (error) {
            client.logger.error("Error checking premium status:", error);
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription("❌ **Error!** Could not check premium status. Check logs for details.")
                        .setColor(client.color.red),
                ],
            });
        }
    },
);
