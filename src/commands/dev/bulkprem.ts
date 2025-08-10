import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";

export default prefix(
    "bulkprem",
    {
        description: {
            content: "Bulk premium operations for multiple users/guilds",
            usage: "bulkprem [command] [id1,id2,id3...]",
            examples: [
                "bulkprem listactive",
                "bulkprem cleanup",
                "bulkprem count"
            ],
        },
        aliases: ["bulk", "bp"],
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
                        .setDescription(`📦 **Bulk Premium Operations**\n\n\`bp listactive\` - List all active premium users/guilds\n\`bp cleanup\` - Remove expired premium entries\n\`bp count\` - Count premium statistics\n\`bp expire <days>\` - List expiring within days`)
                        .setColor(client.color.main),
                ],
            });
        }

        const command = args[0].toLowerCase();

        try {
            switch (command) {
                case "listactive":
                case "active": {
                    const activeUsers = await client.prisma.user.findMany({
                        where: {
                            premiumTo: {
                                gt: new Date()
                            }
                        },
                        orderBy: {
                            premiumTo: 'asc'
                        }
                    });

                    const activeGuilds = await client.prisma.guild.findMany({
                        where: {
                            premiumTo: {
                                gt: new Date()
                            }
                        },
                        orderBy: {
                            premiumTo: 'asc'
                        }
                    });

                    let userList = activeUsers.slice(0, 10).map(u => 
                        `👤 \`${u.userId}\` - ${u.premiumPlan} (expires <t:${Math.floor((u.premiumTo?.getTime() || 0) / 1000)}:R>)`
                    ).join('\n');

                    let guildList = activeGuilds.slice(0, 10).map(g => 
                        `🏠 \`${g.guildId}\` - ${g.premiumPlan} (expires <t:${Math.floor((g.premiumTo?.getTime() || 0) / 1000)}:R>)`
                    ).join('\n');

                    if (!userList) userList = "No active premium users";
                    if (!guildList) guildList = "No active premium guilds";

                    return await message.channel.send({
                        embeds: [
                            embed
                                .setTitle(`📊 Active Premium (${activeUsers.length} users, ${activeGuilds.length} guilds)`)
                                .addFields(
                                    { name: "👥 Users", value: userList, inline: false },
                                    { name: "🏠 Guilds", value: guildList, inline: false }
                                )
                                .setColor(client.color.green),
                        ],
                    });
                }

                case "count":
                case "stats": {
                    const [totalUsers, totalGuilds, activeUsers, activeGuilds, trialUsers, premiumUsers, premiumPlusUsers] = await Promise.all([
                        client.prisma.user.count(),
                        client.prisma.guild.count(),
                        client.prisma.user.count({ where: { premiumTo: { gt: new Date() } } }),
                        client.prisma.guild.count({ where: { premiumTo: { gt: new Date() } } }),
                        client.prisma.user.count({ where: { premiumPlan: 'TrialPremium', premiumTo: { gt: new Date() } } }),
                        client.prisma.user.count({ where: { premiumPlan: 'Premium', premiumTo: { gt: new Date() } } }),
                        client.prisma.user.count({ where: { premiumPlan: 'PremiumPlus', premiumTo: { gt: new Date() } } })
                    ]);

                    return await message.channel.send({
                        embeds: [
                            embed
                                .setTitle("📈 Premium Statistics")
                                .addFields(
                                    { name: "📊 Total Records", value: `👥 ${totalUsers} users\n🏠 ${totalGuilds} guilds`, inline: true },
                                    { name: "✅ Active Premium", value: `👥 ${activeUsers} users\n🏠 ${activeGuilds} guilds`, inline: true },
                                    { name: "🎯 Plan Breakdown", value: `🆓 ${trialUsers} trials\n⭐ ${premiumUsers} premium\n💎 ${premiumPlusUsers} premium+`, inline: true }
                                )
                                .setColor(client.color.main),
                        ],
                    });
                }

                case "cleanup": {
                    const expiredUsers = await client.prisma.user.deleteMany({
                        where: {
                            premiumTo: {
                                lt: new Date()
                            }
                        }
                    });

                    const expiredGuilds = await client.prisma.guild.updateMany({
                        where: {
                            premiumTo: {
                                lt: new Date()
                            }
                        },
                        data: {
                            premiumPlan: 'Free'
                        }
                    });

                    return await message.channel.send({
                        embeds: [
                            embed
                                .setDescription(`🧹 **Cleanup Complete!**\n\n👥 Removed ${expiredUsers.count} expired users\n🏠 Updated ${expiredGuilds.count} expired guilds to Free`)
                                .setColor(client.color.green),
                        ],
                    });
                }

                case "expire":
                case "expiring": {
                    const days = parseInt(args[1]) || 7;
                    const futureDate = new Date();
                    futureDate.setDate(futureDate.getDate() + days);

                    const expiringUsers = await client.prisma.user.findMany({
                        where: {
                            premiumTo: {
                                gt: new Date(),
                                lt: futureDate
                            }
                        }
                    });

                    const expiringGuilds = await client.prisma.guild.findMany({
                        where: {
                            premiumTo: {
                                gt: new Date(),
                                lt: futureDate
                            }
                        }
                    });

                    let userList = expiringUsers.slice(0, 10).map(u => 
                        `👤 \`${u.userId}\` - ${u.premiumPlan} (expires <t:${Math.floor((u.premiumTo?.getTime() || 0) / 1000)}:R>)`
                    ).join('\n') || "None";

                    let guildList = expiringGuilds.slice(0, 10).map(g => 
                        `🏠 \`${g.guildId}\` - ${g.premiumPlan} (expires <t:${Math.floor((g.premiumTo?.getTime() || 0) / 1000)}:R>)`
                    ).join('\n') || "None";

                    return await message.channel.send({
                        embeds: [
                            embed
                                .setTitle(`⏰ Expiring in ${days} days (${expiringUsers.length} users, ${expiringGuilds.length} guilds)`)
                                .addFields(
                                    { name: "👥 Users", value: userList, inline: false },
                                    { name: "🏠 Guilds", value: guildList, inline: false }
                                )
                                .setColor(client.color.yellow),
                        ],
                    });
                }

                default:
                    return await message.channel.send({
                        embeds: [
                            embed
                                .setDescription("❌ **Invalid command!** Use: `listactive`, `cleanup`, `count`, or `expire`")
                                .setColor(client.color.red),
                        ],
                    });
            }
        } catch (error) {
            client.logger.error("Error in bulkprem:", error);
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription("❌ **Error!** Could not execute bulk operation. Check logs for details.")
                        .setColor(client.color.red),
                ],
            });
        }
    },
);
