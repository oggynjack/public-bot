import prefix from "@/layouts/prefix";
import { EmbedBuilder, Message } from "discord.js";
import type ExtendedClient from "@/classes/ExtendedClient";
import type { Guild, User } from "prisma/generated";

export default prefix(
    "setbotname",
    {
        description: {
            content: "Set the bot's display name in this guild only",
            usage: "setbotname <new_name>",
            examples: ["setbotname NAVCODE Music", "setbotname DJ Bot"],
        },
        aliases: ["sbn", "setname"],
        cooldown: "5s",
        category: "dev" as any,
        specialRole: "owner",
        hidden: true
    },
    async (client: ExtendedClient, guild: Guild, user: User, message: Message, args: string[]) => {
        const embed = new EmbedBuilder().setColor(client.color.default);

        if (!args[0]) {
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription("❌ Please provide a new bot name")
                    ]
                });
            }
            return;
        }

        const newName = args.join(" ");
        
        if (newName.length > 32) {
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription("❌ Bot name cannot exceed 32 characters")
                    ]
                });
            }
            return;
        }

        try {
            const oldName = message.guild?.members.me?.displayName || client.user.username;
            await message.guild?.members.me?.setNickname(newName);
            
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.green)
                            .setDescription(`✅ Bot name changed from \`${oldName}\` to \`${newName}\``)
                    ]
                });
            }
        } catch (error) {
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription("❌ Failed to change bot name. Make sure I have proper permissions.")
                    ]
                });
            }
        }
    }
);
