import prefix from "@/layouts/prefix";
import { EmbedBuilder, Message, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import type ExtendedClient from "@/classes/ExtendedClient";
import type { Guild, User } from "prisma/generated";

export default prefix(
    "botcontrols",
    {
        description: {
            content: "Interactive bot control panel for guild owners - shows all available controls with guided options",
            usage: "botcontrols",
            examples: ["botcontrols"],
        },
        aliases: ["controls", "panel"],
        cooldown: "3s",
        category: "guildowner" as any,
        specialRole: "owner"
    },
    async (client: ExtendedClient, guild: Guild, user: User, message: Message, args: string[]) => {
        // Check premium status
        const userTier = await client.premium.getUserTier(message.author.id, message.guildId!);
        
        if (userTier === "free") {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle("🔒 Premium Feature")
                .setDescription("**Bot Controls Panel requires Premium access**\n\n" +
                    "This advanced control panel is available for Premium and Premium Plus subscribers only.\n\n" +
                    "**Premium Benefits:**\n" +
                    "• Advanced bot control panels\n" +
                    "• Extended music features\n" +
                    "• Priority support\n" +
                    "• Custom settings\n\n" +
                    `Contact <@${process.env.OWNER_ID}> to upgrade to Premium!`)
                .setFooter({ text: "Upgrade to Premium for advanced features" });
            
            return message.reply({ embeds: [embed] });
        }
        const embed = new EmbedBuilder()
            .setColor(client.color.main)
            .setTitle("🎛️ Guild Owner Control Panel")
            .setDescription(`**Welcome ${message.author.username}!**\n\nAs a guild owner, you have access to these bot controls. Select an option below to see detailed instructions and fill required parameters.\n\n**Available Commands:**`)
            .addFields([
                {
                    name: "🎵 Music Controls",
                    value: "• `.setbotname` - Change bot display name\n• `.setbotavatar` - Change bot avatar\n• `.botcontrol` - Quick music controls",
                    inline: true
                },
                {
                    name: "⚙️ Settings & Configuration", 
                    value: "• `.guildsettings` - Guild configuration\n• `.setlanguage` - Change bot language\n• `.musicchannel` - Set music channel",
                    inline: true
                },
                {
                    name: "📊 Information & Status",
                    value: "• `.guildstats` - Server statistics\n• `.botinfo` - Bot information\n• `.premiumstatus` - Premium status",
                    inline: true
                }
            ])
            .setFooter({ 
                text: "Select a category below to see detailed command options with step-by-step guidance",
                iconURL: message.author.displayAvatarURL() 
            })
            .setTimestamp();

        const selectMenu = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`guildowner_controls_${message.author.id}`)
                    .setPlaceholder('🎯 Select a command category for detailed options...')
                    .addOptions([
                        {
                            label: 'Music Controls',
                            description: 'Bot name, avatar, and music player controls',
                            value: 'music_controls',
                            emoji: '🎵'
                        },
                        {
                            label: 'Guild Settings',
                            description: 'Language, channels, permissions, and configuration',
                            value: 'guild_settings', 
                            emoji: '⚙️'
                        },
                        {
                            label: 'Information & Stats',
                            description: 'View bot info, server stats, and premium status',
                            value: 'info_stats',
                            emoji: '📊'
                        },
                        {
                            label: 'Quick Actions',
                            description: 'Commonly used quick control actions',
                            value: 'quick_actions',
                            emoji: '⚡'
                        }
                    ])
            );

        const buttonRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`guildowner_language_${message.author.id}`)
                    .setLabel('Change Language')
                    .setEmoji('🌍')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`guildowner_premium_${message.author.id}`)
                    .setLabel('Premium Status')
                    .setEmoji('💎')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(`guildowner_help_${message.author.id}`)
                    .setLabel('Full Help')
                    .setEmoji('❓')
                    .setStyle(ButtonStyle.Success)
            );

        if (message.channel.isSendable()) {
            return message.channel.send({
                embeds: [embed],
                components: [selectMenu, buttonRow]
            });
        }
    }
);
