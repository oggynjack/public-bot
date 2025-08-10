import { EmbedBuilder, StringSelectMenuInteraction } from "discord.js";
import ExtendedClient from "../../../classes/ExtendedClient";
import { Language } from "../../../typings/utils";

export async function handleLanguageMenu(client: ExtendedClient, interaction: StringSelectMenuInteraction) {
  if (!interaction.isStringSelectMenu() || interaction.customId !== "language_select") return;
  
  const selectedLanguage = interaction.values[0] as Language;
  const guildId = interaction.guildId;
  
  if (!guildId) {
    await interaction.reply({ 
      content: "❌ This command can only be used in servers.", 
      ephemeral: true 
    });
    return;
  }

  const languageNames = {
    [Language.EnglishUS]: "English (US)",
    [Language.Spanish]: "Español",
    [Language.French]: "Français", 
    [Language.German]: "Deutsch",
    [Language.Japanese]: "日本語",
    [Language.Korean]: "한국어",
    [Language.Vietnamese]: "Tiếng Việt",
    [Language.Indonesian]: "Bahasa Indonesia",
    [Language.Hindi]: "हिन्दी",
    [Language.Punjabi]: "ਪੰਜਾਬੀ",
    [Language.Arabic]: "العربية",
    [Language.Portuguese]: "Português",
    [Language.Russian]: "Русский",
    [Language.Italian]: "Italiano",
    [Language.Turkish]: "Türkçe"
  };

  const languageFlags = {
    [Language.EnglishUS]: "🇺🇸",
    [Language.Spanish]: "🇪🇸",
    [Language.French]: "🇫🇷",
    [Language.German]: "🇩🇪",
    [Language.Japanese]: "🇯🇵",
    [Language.Korean]: "🇰🇷",
    [Language.Vietnamese]: "🇻🇳",
    [Language.Indonesian]: "🇮🇩",
    [Language.Hindi]: "🇮🇳",
    [Language.Punjabi]: "🇮🇳",
    [Language.Arabic]: "🇸🇦",
    [Language.Portuguese]: "🇧🇷",
    [Language.Russian]: "🇷🇺",
    [Language.Italian]: "🇮🇹",
    [Language.Turkish]: "🇹🇷"
  };

  try {
    // Update guild language in database
    await client.prisma.guild.upsert({
      where: { guildId },
      update: { language: selectedLanguage },
      create: { 
        guildId, 
        language: selectedLanguage
      }
    });

    // Update cached guild settings
    if (client.guildSettings) {
      await client.guildSettings.updateGuildSettings(guildId, {
        language: selectedLanguage
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("✅ Language Updated")
      .setDescription(`${languageFlags[selectedLanguage]} **Language changed to ${languageNames[selectedLanguage]}**\n\n` +
        "All bot messages will now be displayed in the selected language.\n" +
        "Some commands may take a moment to reflect the changes.")
      .setColor(0x00FF00)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
    
    client.logger.info(`Guild ${guildId} language changed to ${selectedLanguage} by ${interaction.user.tag}`);
  } catch (error) {
    client.logger.error(`Failed to update language for guild ${guildId}:`, error);
    
    const errorEmbed = new EmbedBuilder()
      .setTitle("❌ Language Update Failed")
      .setDescription("An error occurred while updating the language. Please try again later.")
      .setColor(0xFF0000);
    
    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
  }
}
