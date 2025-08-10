import getGuildFromArgs from "@/functions/getGuildFromArgs";
import getUserFromArgs from "@/functions/getUserFromArgs";
import prefix from "@/layouts/prefix";
import { $Enums } from "prisma/generated";
import { addDays, addMonths } from "date-fns";
import { EmbedBuilder, Guild, User } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "addpremium",
    {
        description: {
            content: "Add premium to user or guild",
            usage: "addpremium [guild/user] [duration] [id]",
            examples: [
                "addpremium guild 1month 1364081078163472456",
                "addpremium user 3months 730818959112274040",
                "addpremium guild 1week 1234567890",
                "addpremium user trial 1291013382849167542"
            ],
        },
        aliases: ["addpre"],
        specialRole: "owner",
        category: Category.dev,
        hidden: true,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder();

        // Parse arguments: addpremium [guild/user] [duration] [id]
        if (args.length < 3) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription(`❌ **Usage:** \`addpremium [guild/user] [duration] [id]\`\n\n**Examples:**\n\`addpremium guild 1month 1364081078163472456\`\n\`addpremium user 3months 730818959112274040\`\n\`addpremium guild 1week 1234567890\`\n\`addpremium user trial 1291013382849167542\``)
                        .setColor(client.color.red),
                ],
            });
        }

        const scope = args[0].toLowerCase();
        const duration = args[1].toLowerCase();
        let targetId = args[2];

        // Validate scope
        if (!["guild", "user"].includes(scope)) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription("❌ **Invalid scope!** Use `guild` or `user`")
                        .setColor(client.color.red),
                ],
            });
        }

        // Parse duration
        let premiumTo: Date;
        let premiumPlan: $Enums.PremiumPlan;
        
        switch (duration) {
            case "trial":
            case "1week":
            case "7days":
                premiumTo = addDays(new Date(), 7);
                premiumPlan = $Enums.PremiumPlan.TrialPremium;
                break;
            case "1month":
            case "month":
                premiumTo = addMonths(new Date(), 1);
                premiumPlan = $Enums.PremiumPlan.Premium;
                break;
            case "3months":
            case "3month":
                premiumTo = addMonths(new Date(), 3);
                premiumPlan = $Enums.PremiumPlan.Premium;
                break;
            case "6months":
            case "6month":
                premiumTo = addMonths(new Date(), 6);
                premiumPlan = $Enums.PremiumPlan.Premium;
                break;
            case "1year":
            case "12months":
            case "year":
                premiumTo = addMonths(new Date(), 12);
                premiumPlan = $Enums.PremiumPlan.PremiumPlus;
                break;
            case "lifetime":
            case "forever":
                premiumTo = addMonths(new Date(), 1200); // 100 years = lifetime
                premiumPlan = $Enums.PremiumPlan.PremiumPlus;
                break;
            default:
                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription("❌ **Invalid duration!** Supported: `trial`, `1week`, `1month`, `3months`, `6months`, `1year`, `lifetime`")
                            .setColor(client.color.red),
                    ],
                });
        }

        // Get target user/guild
        let target: User | Guild | null;
        if (scope === "guild") {
            target = await getGuildFromArgs(client, targetId);
        } else {
            target = await getUserFromArgs(client, targetId);
        }

        if (!target) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription(`❌ **Invalid ${scope} ID!** Could not find ${scope} with ID: \`${targetId}\``)
                        .setColor(client.color.red),
                ],
            });
        }

        try {
            if (scope === "guild") {
                // Add premium to guild
                const existing = await client.prisma.guild.findUnique({
                    where: { guildId: target.id },
                });

                await client.prisma.guild.upsert({
                    where: { guildId: target.id },
                    create: {
                        guildId: target.id,
                        premiumFrom: new Date(),
                        premiumTo: premiumTo,
                        premiumPlan: premiumPlan,
                    },
                    update: {
                        premiumFrom: existing?.premiumFrom || new Date(),
                        premiumTo: existing?.premiumTo && existing.premiumTo > new Date() 
                            ? addMonths(existing.premiumTo, duration.includes('month') ? parseInt(duration) || 1 : 1)
                            : premiumTo,
                        premiumPlan: premiumPlan,
                    },
                });

                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription(`✅ **Premium Added!**\n\n🏠 **Guild:** ${(target as Guild).name} (\`${target.id}\`)\n⭐ **Plan:** ${premiumPlan}\n⏰ **Duration:** ${duration}\n📅 **Expires:** <t:${Math.floor(premiumTo.getTime() / 1000)}:F>`)
                            .setColor(client.color.green),
                    ],
                });
            } else {
                // Add premium to user
                const existing = await client.prisma.user.findUnique({
                    where: { userId: target.id },
                });

                await client.prisma.user.upsert({
                    where: { userId: target.id },
                    create: {
                        userId: target.id,
                        premiumFrom: new Date(),
                        premiumTo: premiumTo,
                        premiumPlan: premiumPlan,
                    },
                    update: {
                        premiumFrom: existing?.premiumFrom || new Date(),
                        premiumTo: existing?.premiumTo && existing.premiumTo > new Date() 
                            ? addMonths(existing.premiumTo, duration.includes('month') ? parseInt(duration) || 1 : 1)
                            : premiumTo,
                        premiumPlan: premiumPlan,
                    },
                });

                return await message.channel.send({
                    embeds: [
                        embed
                            .setDescription(`✅ **Premium Added!**\n\n👤 **User:** ${(target as User).displayName || (target as User).username} (\`${target.id}\`)\n⭐ **Plan:** ${premiumPlan}\n⏰ **Duration:** ${duration}\n📅 **Expires:** <t:${Math.floor(premiumTo.getTime() / 1000)}:F>`)
                            .setColor(client.color.green),
                    ],
                });
            }
        } catch (error) {
            client.logger.error("Error adding premium:", error);
            return await message.channel.send({
                embeds: [
                    embed
                        .setDescription("❌ **Error adding premium!** Check logs for details.")
                        .setColor(client.color.red),
                ],
            });
        }
    },
);
