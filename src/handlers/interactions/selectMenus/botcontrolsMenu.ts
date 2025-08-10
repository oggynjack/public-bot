import { EmbedBuilder, SelectMenuInteraction, StringSelectMenuInteraction } from "discord.js";
import ExtendedClient from "../../../classes/ExtendedClient";

export async function handleBotControlsMenu(client: ExtendedClient, interaction: StringSelectMenuInteraction) {
  if (!interaction.isStringSelectMenu() || !interaction.customId.startsWith("guildowner_controls_")) return;
  
  const selectedValue = interaction.values[0];
  
  // Create response embeds based on selection
  const embeds = {
    music_controls: new EmbedBuilder()
      .setTitle("🎵 Music Controls")
      .setDescription("**Available Music Commands:**\n\n" +
        "• `.play <song>` - Play a song\n" +
        "• `.search <query>` - Search and select songs\n" +
        "• `.pause` - Pause current song\n" +
        "• `.resume` - Resume playback\n" +
        "• `.skip` - Skip current song\n" +
        "• `.stop` - Stop and clear queue\n" +
        "• `.queue` - View current queue\n" +
        "• `.volume <1-100>` - Adjust volume\n" +
        "• `.loop` - Toggle loop modes\n" +
        "• `.shuffle` - Shuffle queue\n" +
        "• `.nowplaying` - Current song info")
      .setColor(0x00FF00),

    guild_settings: new EmbedBuilder()
      .setTitle("⚙️ Guild Settings")
      .setDescription("**Server Configuration:**\n\n" +
        "• `.setlanguage` - Change bot language\n" +
        "• `.guildsettings` - Advanced guild settings\n" +
        "• `.prefix <new_prefix>` - Change command prefix\n" +
        "• `.dj` - Configure DJ role\n" +
        "• `.announce` - Toggle song announcements\n" +
        "• `.autoplay` - Toggle autoplay mode\n" +
        "• `.volume-limit <1-200>` - Set max volume\n" +
        "• `.stay` - Keep bot in voice channel")
      .setColor(0x0099FF),

    info_stats: new EmbedBuilder()
      .setTitle("� Information & Stats")
      .setDescription("**Server Information:**\n\n" +
        "• `.guildstats` - Server statistics\n" +
        "• `.botinfo` - Bot information\n" +
        "• `.premiumstatus` - Premium status\n" +
        "• `.help` - Show all commands\n" +
        "• `.ping` - Check bot latency\n" +
        "• `.invite` - Invite bot to other servers\n" +
        "• `.support` - Get support server link\n\n" +
        "**Multi-Language Support:**\n" +
        "🇺🇸 English • 🇪🇸 Spanish • 🇫🇷 French • 🇩🇪 German\n" +
        "🇮🇳 Hindi • 🇮🇳 Punjabi • 🇰🇷 Korean • 🇯🇵 Japanese")
      .setColor(0x9966CC),

    quick_actions: new EmbedBuilder()
      .setTitle("⚡ Quick Actions")
      .setDescription("**Commonly Used Commands:**\n\n" +
        "• `.play <song>` - Quick play any song\n" +
        "• `.search <query>` - Search and select\n" +
        "• `.skip` - Skip current song\n" +
        "• `.volume 50` - Set moderate volume\n" +
        "• `.queue` - Check what's playing\n" +
        "• `.setlanguage` - Change language\n" +
        "• `.help` - Get help\n" +
        "• `.botinfo` - Bot information\n\n" +
        "**Premium Features:**\n" +
        "• Advanced controls and settings\n" +
        "• Multi-language support\n" +
        "• Enhanced audio filters")
      .setColor(0xFFD700)
  };

  const embed = embeds[selectedValue as keyof typeof embeds];
  
  if (embed) {
    await interaction.reply({ embeds: [embed], ephemeral: true });
  } else {
    await interaction.reply({ 
      content: "❌ Unknown selection. Please try again.", 
      ephemeral: true 
    });
  }
}
