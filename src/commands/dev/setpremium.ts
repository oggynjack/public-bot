import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { PremiumPlan } from "prisma/generated";

export default prefix(
    "setpremium",
    {
        description: {
            content: "Set premium tier for user or guild",
            usage: "setpremium <user|guild> <id> <tier> <days>",
            examples: [
                "setpremium user 123456789 premium 30",
                "setpremium guild 987654321 premiumplus 60"
            ],
        },
        aliases: ["sp", "premset"],
        specialRole: "dev",
        category: Category.dev,
        hidden: true,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder().setColor(client.color.main);

        if (args.length < 4) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Usage:** `setpremium <user|guild> <id> <tier> <days>`\n**Tiers:** `free`, `premium`, `premiumplus`")
                ],
            });
        }

        const type = args[0].toLowerCase();
        const targetId = args[1];
        const tier = args[2].toLowerCase() as "free" | "premium" | "premiumplus";
        const days = parseInt(args[3]);

        if (!["user", "guild"].includes(type)) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Type must be either `user` or `guild`**")
                ],
            });
        }

        if (!["free", "premium", "premiumplus"].includes(tier)) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Tier must be `free`, `premium`, or `premiumplus`**")
                ],
            });
        }

        if (isNaN(days) || days < 0) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Days must be a valid number (0 or higher)**")
                ],
            });
        }

        const now = new Date();
        const expiresAt = tier === "free" ? null : new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
        
        // Convert tier to PremiumPlan enum
        let premiumPlan: PremiumPlan = PremiumPlan.Free;
        switch (tier) {
            case "premium":
                premiumPlan = PremiumPlan.Premium;
                break;
            case "premiumplus":
                premiumPlan = PremiumPlan.PremiumPlus;
                break;
            default:
                premiumPlan = PremiumPlan.Free;
                break;
        }

        try {
            if (type === "user") {
                await client.prisma.user.upsert({
                    where: { userId: targetId },
                    update: {
                        premiumFrom: tier === "free" ? null : now,
                        premiumTo: expiresAt,
                        premiumPlan: premiumPlan,
                    },
                    create: {
                        userId: targetId,
                        premiumFrom: tier === "free" ? null : now,
                        premiumTo: expiresAt,
                        premiumPlan: premiumPlan,
                    },
                });

                embed
                    .setTitle("✅ User Premium Updated")
                    .setDescription(`Successfully set premium for user \`${targetId}\``)
                    .addFields(
                        { name: "Tier", value: tier, inline: true },
                        { name: "Duration", value: tier === "free" ? "N/A" : `${days} days`, inline: true },
                        { name: "Expires", value: expiresAt ? `<t:${Math.floor(expiresAt.getTime() / 1000)}:F>` : "N/A", inline: true }
                    );

            } else if (type === "guild") {
                await client.prisma.guild.upsert({
                    where: { guildId: targetId },
                    update: {
                        premiumFrom: tier === "free" ? null : now,
                        premiumTo: expiresAt,
                        premiumPlan: premiumPlan,
                    },
                    create: {
                        guildId: targetId,
                        premiumFrom: tier === "free" ? null : now,
                        premiumTo: expiresAt,
                        premiumPlan: premiumPlan,
                    },
                });

                embed
                    .setTitle("✅ Guild Premium Updated")
                    .setDescription(`Successfully set premium for guild \`${targetId}\``)
                    .addFields(
                        { name: "Tier", value: tier, inline: true },
                        { name: "Duration", value: tier === "free" ? "N/A" : `${days} days`, inline: true },
                        { name: "Expires", value: expiresAt ? `<t:${Math.floor(expiresAt.getTime() / 1000)}:F>` : "N/A", inline: true }
                    );
            }

            embed.setFooter({
                text: `Set by ${message.author.tag} • ${new Date().toLocaleString()}`,
                iconURL: message.author.displayAvatarURL()
            });

            return await message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error("Error setting premium:", error);
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Error setting premium. Please check the ID and try again.**")
                ],
            });
        }
    },
);
