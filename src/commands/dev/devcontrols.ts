import prefix from "@/layouts/prefix";
import { EmbedBuilder, Message, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import type ExtendedClient from "@/classes/ExtendedClient";
import type { Guild, User } from "prisma/generated";
import { Category } from "@/typings/utils";

export default prefix(
    "devcontrols",
    {
        description: {
            content: "Developer control panel with guided premium management and bot administration",
            usage: "devcontrols",
            examples: ["devcontrols"],
        },
        aliases: ["devpanel", "devcp"],
        cooldown: "5s",
        category: Category.dev,
        specialRole: "owner",
        hidden: true,
    },
    async (client: ExtendedClient, guild: Guild, user: User, message: Message, args: string[]) => {
        const embed = new EmbedBuilder()
            .setColor(client.color.main)
            .setTitle("🔧 Developer Control Panel")
            .setDescription(`**Welcome Developer ${message.author.username}!**\n\nFull bot administration and premium management controls with guided workflows.\n\n**Available Command Categories:**`)
            .addFields([
                {
                    name: "💎 Premium Management",
                    value: "• `.addpremium` - Grant premium access\n• `.revokepremium` - Remove premium\n• `.premstatus` - Check premium status\n• `.quickpremium` - Fast premium setup",
                    inline: true
                },
                {
                    name: "🤖 Bot Administration", 
                    value: "• `.restart` - Restart bot safely\n• `.eval` - Execute code\n• `.debug` - Debug information\n• `.logs` - View system logs",
                    inline: true
                },
                {
                    name: "📊 Data & Analytics",
                    value: "• `.data` - Database statistics\n• `.botinfo` - Detailed bot info\n• `.register` - Register slash commands",
                    inline: true
                }
            ])
            .setFooter({ 
                text: "Select a category below for step-by-step command guidance",
                iconURL: message.author.displayAvatarURL() 
            })
            .setTimestamp();

        const selectMenu = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`dev_controls_${message.author.id}`)
                    .setPlaceholder('🎯 Select a developer command category...')
                    .addOptions([
                        {
                            label: 'Premium Management',
                            description: 'Add, revoke, and manage premium subscriptions',
                            value: 'premium_mgmt',
                            emoji: '💎'
                        },
                        {
                            label: 'Bot Administration',
                            description: 'Restart, debug, and manage bot operations',
                            value: 'bot_admin', 
                            emoji: '🤖'
                        },
                        {
                            label: 'Data & Analytics',
                            description: 'Database stats, bot info, and system metrics',
                            value: 'data_analytics',
                            emoji: '📊'
                        },
                        {
                            label: 'Quick Actions',
                            description: 'Commonly used developer quick actions',
                            value: 'quick_dev_actions',
                            emoji: '⚡'
                        }
                    ])
            );

        const buttonRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`dev_quick_premium_${message.author.id}`)
                    .setLabel('Quick Premium')
                    .setEmoji('💎')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`dev_system_status_${message.author.id}`)
                    .setLabel('System Status')
                    .setEmoji('📊')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(`dev_emergency_${message.author.id}`)
                    .setLabel('Emergency Controls')
                    .setEmoji('🚨')
                    .setStyle(ButtonStyle.Danger)
            );

        if (message.channel.isSendable()) {
            return message.channel.send({
                embeds: [embed],
                components: [selectMenu, buttonRow]
            });
        }
    }
);
