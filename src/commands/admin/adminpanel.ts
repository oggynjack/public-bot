import type { Message } from "discord.js";
import ExtendedClient from "../../classes/ExtendedClient";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import prefix from "@/layouts/prefix";
import { Category } from "@/typings/utils";

export default prefix(
    "adminpanel",
    {
        description: {
            content: "🛠️ Complete admin control panel for bot management",
            examples: ["adminpanel"],
            usage: "adminpanel"
        },
        aliases: ["adminpanel", "acp"],
        category: Category.admin,
        specialRole: "owner",
        hidden: true,
        ignore: false
    },
    async (client, guild, user, message) => {
        const embed = new EmbedBuilder()
            .setColor(0x9966FF)
            .setTitle("🛠️ Rhythm Bot - Admin Control Panel")
            .setDescription(
                `**Welcome to the Admin Panel!**\n` +
                `Select a category below to manage the bot:\n\n` +
                `🎵 **Bot Management** - Status, restart, logs\n` +
                `⭐ **Premium Controls** - Manage user/guild tiers\n` +
                `🔧 **Bot Settings** - Avatar, name, data\n` +
                `💻 **Developer Tools** - Debug, eval, register\n` +
                `📊 **Statistics** - Bot info, premium stats\n\n` +
                `**Current Status:** ${client.ws.ping}ms ping | ${client.guilds.cache.size} servers`
            )
            .setThumbnail(client.user?.displayAvatarURL())
            .setFooter({
                text: `Admin: ${message.author.username} | Use buttons below to navigate`,
                iconURL: message.author.displayAvatarURL()
            })
            .setTimestamp();

        // Main category selection buttons
        const mainRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`admin_bot_${message.author.id}`)
                    .setLabel("Bot Management")
                    .setEmoji("🎵")
                    .setStyle(ButtonStyle.Primary),
                    
                new ButtonBuilder()
                    .setCustomId(`admin_premium_${message.author.id}`)
                    .setLabel("Premium Controls")
                    .setEmoji("⭐")
                    .setStyle(ButtonStyle.Primary),
                    
                new ButtonBuilder()
                    .setCustomId(`admin_settings_${message.author.id}`)
                    .setLabel("Bot Settings")
                    .setEmoji("🔧")
                    .setStyle(ButtonStyle.Secondary),
                    
                new ButtonBuilder()
                    .setCustomId(`admin_dev_${message.author.id}`)
                    .setLabel("Developer Tools")
                    .setEmoji("💻")
                    .setStyle(ButtonStyle.Secondary),
                    
                new ButtonBuilder()
                    .setCustomId(`admin_stats_${message.author.id}`)
                    .setLabel("Statistics")
                    .setEmoji("📊")
                    .setStyle(ButtonStyle.Success)
            );

        await message.reply({
            embeds: [embed],
            components: [mainRow]
        });
    },
);
