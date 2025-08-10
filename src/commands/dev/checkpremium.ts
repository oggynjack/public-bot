import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";

export default prefix(
    "checkpremium",
    {
        description: {
            content: "Check premium status for user or guild",
            usage: "checkpremium <user|guild> <id>",
            examples: [
                "checkpremium user 123456789",
                "checkpremium guild 987654321"
            ],
        },
        aliases: ["cp", "premcheck"],
        specialRole: "dev",
        category: Category.dev,
        hidden: true,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder().setColor(client.color.main);

        if (args.length < 2) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Usage:** `checkpremium <user|guild> <id>`")
                ],
            });
        }

        const type = args[0].toLowerCase();
        const id = args[1];

        if (!["user", "guild"].includes(type)) {
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Type must be either `user` or `guild`**")
                ],
            });
        }

        try {
            if (type === "user") {
                const userPremium = await client.premium.getUserPremium(id);
                
                embed
                    .setTitle(`💎 User Premium Status`)
                    .setDescription(`**User ID:** ${id}`)
                    .addFields(
                        {
                            name: "Status",
                            value: userPremium.isPremium ? "✅ **Premium Active**" : "❌ **No Premium**",
                            inline: true
                        },
                        {
                            name: "Tier",
                            value: userPremium.premiumTier,
                            inline: true
                        },
                        {
                            name: "Premium From",
                            value: userPremium.premiumFrom 
                                ? `<t:${Math.floor(userPremium.premiumFrom.getTime() / 1000)}:F>`
                                : "N/A",
                            inline: false
                        },
                        {
                            name: "Premium Until",
                            value: userPremium.premiumTo 
                                ? `<t:${Math.floor(userPremium.premiumTo.getTime() / 1000)}:F>`
                                : "N/A",
                            inline: false
                        }
                    );

                if (userPremium.isPremium && userPremium.premiumTo) {
                    const timeLeft = userPremium.premiumTo.getTime() - Date.now();
                    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    embed.addFields({
                        name: "Time Remaining",
                        value: daysLeft > 0 ? `${daysLeft} days` : "Expired",
                        inline: true
                    });
                }

            } else if (type === "guild") {
                const guildPremium = await client.premium.getGuildPremium(id);
                
                embed
                    .setTitle(`🏰 Guild Premium Status`)
                    .setDescription(`**Guild ID:** ${id}`)
                    .addFields(
                        {
                            name: "Status",
                            value: guildPremium.isPremium ? "✅ **Premium Active**" : "❌ **No Premium**",
                            inline: true
                        },
                        {
                            name: "Tier",
                            value: guildPremium.premiumTier,
                            inline: true
                        },
                        {
                            name: "Premium From",
                            value: guildPremium.premiumFrom 
                                ? `<t:${Math.floor(guildPremium.premiumFrom.getTime() / 1000)}:F>`
                                : "N/A",
                            inline: false
                        },
                        {
                            name: "Premium Until",
                            value: guildPremium.premiumTo 
                                ? `<t:${Math.floor(guildPremium.premiumTo.getTime() / 1000)}:F>`
                                : "N/A",
                            inline: false
                        }
                    );

                if (guildPremium.isPremium && guildPremium.premiumTo) {
                    const timeLeft = guildPremium.premiumTo.getTime() - Date.now();
                    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    embed.addFields({
                        name: "Time Remaining",
                        value: daysLeft > 0 ? `${daysLeft} days` : "Expired",
                        inline: true
                    });
                }
            }

            embed.setFooter({
                text: `Checked by ${message.author.tag} • ${new Date().toLocaleString()}`,
                iconURL: message.author.displayAvatarURL()
            });

            return await message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error("Error checking premium status:", error);
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Error checking premium status. Please check the ID and try again.**")
                ],
            });
        }
    },
);
