import prefix from "@/layouts/prefix";
import { EmbedBuilder, Message, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import type ExtendedClient from "@/classes/ExtendedClient";
import type { Guild, User } from "prisma/generated";
import { Language } from "@/typings/utils";

export default prefix(
    "setlanguage",
    {
        description: {
            content: "Change the bot language for this guild - affects all embeds and messages",
            usage: "setlanguage [language_code]",
            examples: ["setlanguage", "setlanguage hindi", "setlanguage punjabi", "setlanguage english"],
        },
        aliases: ["language", "changelang", "setlang"],
        cooldown: "5s",
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
                .setDescription("**Language Settings require Premium access**\n\n" +
                    "Multi-language support is available for Premium and Premium Plus subscribers only.\n\n" +
                    "**Available for Premium:**\n" +
                    "• 15 international languages\n" +
                    "• Real-time language switching\n" +
                    "• Native script support\n" +
                    "• Cultural translations\n\n" +
                    `Contact <@${process.env.OWNER_ID}> to upgrade to Premium!`)
                .setFooter({ text: "Upgrade to Premium for multi-language support" });
            
            return message.reply({ embeds: [embed] });
        }
        const embed = new EmbedBuilder().setColor(client.color.default);

        // Language mapping for user-friendly names
        const languageMap: { [key: string]: Language } = {
            'english': Language.EnglishUS,
            'spanish': Language.Spanish,
            'french': Language.French,
            'german': Language.German,
            'indonesian': Language.Indonesian,
            'japanese': Language.Japanese,
            'korean': Language.Korean,
            'vietnamese': Language.Vietnamese,
            'arabic': Language.Arabic,
            'hindi': Language.Hindi,
            'punjabi': Language.Punjabi,
            'portuguese': Language.Portuguese,
            'russian': Language.Russian,
            'italian': Language.Italian,
            'turkish': Language.Turkish
        };

        const languageFlags: { [key in Language]: string } = {
            [Language.EnglishUS]: "🇺🇸",
            [Language.Spanish]: "🇪🇸", 
            [Language.French]: "🇫🇷",
            [Language.German]: "🇩🇪",
            [Language.Indonesian]: "🇮🇩",
            [Language.Japanese]: "🇯🇵",
            [Language.Korean]: "🇰🇷",
            [Language.Vietnamese]: "🇻🇳",
            [Language.Arabic]: "🇸🇦",
            [Language.Hindi]: "🇮🇳",
            [Language.Punjabi]: "🟡", // Using yellow circle as Punjabi doesn't have specific flag
            [Language.Portuguese]: "🇧🇷",
            [Language.Russian]: "🇷🇺",
            [Language.Italian]: "🇮🇹",
            [Language.Turkish]: "🇹🇷"
        };

        if (!args[0]) {
            // Show current language and selection menu
            const currentSettings = await client.guildSettings.getSettings(message.guildId!);
            const currentLang = currentSettings.language || Language.EnglishUS;
            const currentLangTyped = currentLang as Language;
            
            const selectMenu = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(`language_select_${message.author.id}`)
                        .setPlaceholder('🌍 Select your preferred language...')
                        .addOptions([
                            {
                                label: 'English (US)',
                                description: 'Default - English United States',
                                value: Language.EnglishUS,
                                emoji: '🇺🇸'
                            },
                            {
                                label: 'हिंदी (Hindi)', 
                                description: 'Hindi - India',
                                value: Language.Hindi,
                                emoji: '🇮🇳'
                            },
                            {
                                label: 'ਪੰਜਾਬੀ (Punjabi)',
                                description: 'Punjabi - India/Pakistan',
                                value: Language.Punjabi,
                                emoji: '🟡'
                            },
                            {
                                label: 'Español (Spanish)',
                                description: 'Spanish - Spain/Latin America', 
                                value: Language.Spanish,
                                emoji: '🇪🇸'
                            },
                            {
                                label: 'Français (French)',
                                description: 'French - France',
                                value: Language.French,
                                emoji: '🇫🇷'
                            },
                            {
                                label: 'Deutsch (German)',
                                description: 'German - Germany',
                                value: Language.German,
                                emoji: '🇩🇪'
                            },
                            {
                                label: '日本語 (Japanese)',
                                description: 'Japanese - Japan',
                                value: Language.Japanese,
                                emoji: '🇯🇵'
                            },
                            {
                                label: '한국어 (Korean)',
                                description: 'Korean - South Korea',
                                value: Language.Korean,
                                emoji: '🇰🇷'
                            },
                            {
                                label: 'العربية (Arabic)',
                                description: 'Arabic - Middle East',
                                value: Language.Arabic,
                                emoji: '🇸🇦'
                            },
                            {
                                label: 'Português (Portuguese)',
                                description: 'Portuguese - Brazil/Portugal',
                                value: Language.Portuguese,
                                emoji: '🇧🇷'
                            },
                            {
                                label: 'Русский (Russian)',
                                description: 'Russian - Russia',
                                value: Language.Russian,
                                emoji: '🇷🇺'
                            },
                            {
                                label: 'Italiano (Italian)',
                                description: 'Italian - Italy',
                                value: Language.Italian,
                                emoji: '🇮🇹'
                            },
                            {
                                label: 'Türkçe (Turkish)',
                                description: 'Turkish - Turkey',
                                value: Language.Turkish,
                                emoji: '🇹🇷'
                            },
                            {
                                label: 'Indonesian',
                                description: 'Indonesian - Indonesia', 
                                value: Language.Indonesian,
                                emoji: '🇮🇩'
                            },
                            {
                                label: 'Tiếng Việt (Vietnamese)',
                                description: 'Vietnamese - Vietnam',
                                value: Language.Vietnamese,
                                emoji: '🇻🇳'
                            }
                        ])
                );

            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setTitle("🌍 Guild Language Settings")
                            .setDescription(`**Current Language:** ${languageFlags[currentLangTyped]} ${currentLangTyped}\n\n` +
                                          `Select a new language below. This will change:\n` +
                                          `• All bot messages and embeds\n` +
                                          `• Command responses\n` +
                                          `• Music recommendations (AI will prefer songs in selected language)\n` +
                                          `• Error messages and notifications\n\n` +
                                          `**Supported Languages:** 15 international languages including Punjabi, Hindi, Arabic, and more!`)
                            .addFields([
                                {
                                    name: "🎵 Music Impact",
                                    value: "AI suggestions will prioritize songs in your selected language",
                                    inline: true
                                },
                                {
                                    name: "⚡ Instant Effect", 
                                    value: "Changes apply immediately after selection",
                                    inline: true
                                }
                            ])
                    ],
                    components: [selectMenu]
                });
            }
            return;
        }

        // Direct language setting via command
        const requestedLang = args[0].toLowerCase();
        const selectedLanguage = languageMap[requestedLang];

        if (!selectedLanguage) {
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setTitle("❌ Invalid Language")
                            .setDescription(`Language \`${args[0]}\` is not supported.\n\n**Available languages:**\n${Object.keys(languageMap).join(', ')}`)
                    ]
                });
            }
            return;
        }

        try {
            // Update guild language setting
            await client.guildSettings.updateSettings(message.guildId!, {
                language: selectedLanguage
            });

            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.green)
                            .setTitle("✅ Language Updated Successfully")
                            .setDescription(`Guild language has been changed to ${languageFlags[selectedLanguage]} **${selectedLanguage}**\n\n` +
                                          `• All bot messages will now appear in ${selectedLanguage}\n` +
                                          `• AI music suggestions will prioritize ${selectedLanguage} songs\n` +
                                          `• Command responses updated instantly`)
                            .setFooter({ text: `Changed by ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
                    ]
                });
            }
        } catch (error) {
            client.logger.error("Error updating guild language:", error);
            if (message.channel.isSendable()) {
                return message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription("❌ Failed to update language settings. Please try again.")
                    ]
                });
            }
        }
    }
);
