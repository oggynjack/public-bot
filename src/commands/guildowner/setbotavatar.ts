import prefix from "@/layouts/prefix";
import { EmbedBuilder, Message, AttachmentBuilder } from "discord.js";
import type ExtendedClient from "@/classes/ExtendedClient";
import type { Guild, User } from "prisma/generated";

export default prefix(
    "setbotavatar",
    {
        description: {
            content: "Set the bot's avatar (Note: Discord bots have global avatars only)",
            usage: "setbotavatar <image_url_or_attachment>",
            examples: ["setbotavatar https://example.com/avatar.png", "setbotavatar (with attachment)"],
        },
        aliases: ["sba"],
        cooldown: "10s",
        category: "dev" as any,
        specialRole: "owner",
        hidden: true
    },
    async (client: ExtendedClient, guild: Guild, user: User, message: Message, args: string[]) => {
        const embed = new EmbedBuilder().setColor(client.color.default);

        let imageUrl: string | null = null;

        // Check for attachment
        if (message.attachments.size > 0) {
            const attachment = message.attachments.first();
            if (attachment && attachment.contentType?.startsWith('image/')) {
                imageUrl = attachment.url;
            }
        }
        
        // Check for URL in args
        if (!imageUrl && args[0]) {
            const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
            if (urlRegex.test(args[0])) {
                imageUrl = args[0];
            }
        }

        if (!imageUrl) {
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription("❌ Please provide an image URL or attach an image file")
                    ]
                });
            }
            return;
        }

        try {
            // Fetch the image
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const buffer = await response.arrayBuffer();
            
            // Update bot avatar
            await client.user.setAvatar(Buffer.from(buffer));
            
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.green)
                            .setDescription("✅ Bot avatar updated successfully!")
                            .setThumbnail(imageUrl)
                    ]
                });
            }
        } catch (error) {
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription("❌ Failed to update bot avatar. Please check the image URL and try again.")
                    ]
                });
            }
        }
    }
);
