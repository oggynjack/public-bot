import prefix from "@/layouts/prefix";
import { $Enums } from "prisma/generated";
import { addDays, addMonths } from "date-fns";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";

export default prefix(
    "quickpremium",
    {
        description: {
            content: "Quick premium commands for common operations",
            usage: "quickpremium [command] [id]",
            examples: [
                "quickpremium month 1364081078163472456",
                "quickpremium year @user",
                "quickpremium trial 1234567890"
            ],
        },
        aliases: ["qprem", "qp"],
        specialRole: "owner",
        category: Category.dev,
        hidden: true,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder();

        if (args.length < 2) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription(`⚡ **Quick Premium Commands:**\n\n\`qp month <id>\` - Add 1 month premium\n\`qp year <id>\` - Add 1 year premium+\n\`qp trial <id>\` - Add 1 week trial\n\`qp lifetime <id>\` - Add lifetime premium+\n\n**Examples:**\n\`qp month 1364081078163472456\`\n\`qp year @user\``)
                        .setColor(client.color.main),
                ],
            });
        }

        const command = args[0].toLowerCase();
        const targetId = args[1];

        let duration: string;
        let premiumTo: Date;
        let premiumPlan: $Enums.PremiumPlan;

        switch (command) {
            case "trial":
            case "t":
                duration = "1 week trial";
                premiumTo = addDays(new Date(), 7);
                premiumPlan = $Enums.PremiumPlan.TrialPremium;
                break;
            case "month":
            case "m":
                duration = "1 month";
                premiumTo = addMonths(new Date(), 1);
                premiumPlan = $Enums.PremiumPlan.Premium;
                break;
            case "year":
            case "y":
                duration = "1 year";
                premiumTo = addMonths(new Date(), 12);
                premiumPlan = $Enums.PremiumPlan.PremiumPlus;
                break;
            case "lifetime":
            case "life":
            case "l":
                duration = "lifetime";
                premiumTo = addMonths(new Date(), 1200);
                premiumPlan = $Enums.PremiumPlan.PremiumPlus;
                break;
            default:
                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription("❌ **Invalid command!** Use: `trial`, `month`, `year`, or `lifetime`")
                            .setColor(client.color.red),
                    ],
                });
        }

        try {
            // Determine if it's a guild or user ID (guilds are typically longer)
            const isGuildId = targetId.length >= 17 && !targetId.startsWith('<@');
            const cleanId = targetId.replace(/[<@!>]/g, '');

            if (isGuildId) {
                // Try to get guild
                const targetGuild = await client.guilds.fetch(cleanId).catch(() => null);
                if (!targetGuild) {
                    return await message.channel.send({
                        embeds: [
                            embed
                                .setDescription(`❌ **Guild not found!** Could not find guild with ID: \`${cleanId}\``)
                                .setColor(client.color.red),
                        ],
                    });
                }

                await client.prisma.guild.upsert({
                    where: { guildId: cleanId },
                    create: {
                        guildId: cleanId,
                        premiumFrom: new Date(),
                        premiumTo: premiumTo,
                        premiumPlan: premiumPlan,
                    },
                    update: {
                        premiumTo: premiumTo,
                        premiumPlan: premiumPlan,
                    },
                });

                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription(`⚡ **Quick Premium Added!**\n\n🏠 **Guild:** ${targetGuild.name}\n⭐ **Plan:** ${premiumPlan}\n⏰ **Duration:** ${duration}\n📅 **Expires:** <t:${Math.floor(premiumTo.getTime() / 1000)}:F>`)
                            .setColor(client.color.green),
                    ],
                });
            } else {
                // Try to get user
                const targetUser = await client.users.fetch(cleanId).catch(() => null);
                if (!targetUser) {
                    return await message.channel.send({
                        embeds: [
                            embed
                                .setDescription(`❌ **User not found!** Could not find user with ID: \`${cleanId}\``)
                                .setColor(client.color.red),
                        ],
                    });
                }

                await client.prisma.user.upsert({
                    where: { userId: cleanId },
                    create: {
                        userId: cleanId,
                        premiumFrom: new Date(),
                        premiumTo: premiumTo,
                        premiumPlan: premiumPlan,
                    },
                    update: {
                        premiumTo: premiumTo,
                        premiumPlan: premiumPlan,
                    },
                });

                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription(`⚡ **Quick Premium Added!**\n\n👤 **User:** ${targetUser.username}\n⭐ **Plan:** ${premiumPlan}\n⏰ **Duration:** ${duration}\n📅 **Expires:** <t:${Math.floor(premiumTo.getTime() / 1000)}:F>`)
                            .setColor(client.color.green),
                    ],
                });
            }
        } catch (error) {
            client.logger.error("Error in quickpremium:", error);
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription("❌ **Error!** Could not add premium. Check logs for details.")
                        .setColor(client.color.red),
                ],
            });
        }
    },
);
