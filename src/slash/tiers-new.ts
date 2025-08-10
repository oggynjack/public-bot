import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import config from "@/config";

export const data = new SlashCommandBuilder()
  .setName("tiers")
  .setDescription("View all premium tiers and their benefits");

export const execute = withCommandLogging("tiers", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    // Get user's current tier for highlighting
    const userTier = await client.premium.getEffectiveTier(
      interaction.user.id,
      interaction.guildId!
    );

    const embed = new EmbedBuilder()
      .setTitle("💎 Music Bot Premium Tiers")
      .setColor(0xFFD700)
      .setDescription(`**Your Current Tier:** ${userTier.charAt(0).toUpperCase() + userTier.slice(1)}\n\nChoose the perfect tier for your music experience!`)
      .addFields(
        {
          name: "🆓 **Free Tier**",
          value: "**Audio Quality:** 64kbps\n" +
                 "**Volume Control:** Up to 100%\n" +
                 "**Queue System:** ❌ Not Available\n" +
                 "**Playlists:** ❌ Not Available\n" +
                 "**Audio Filters:** ❌ Not Available\n" +
                 "**Commands:** Play, Pause, Resume only\n" +
                 "**Features:** Basic playback with immediate song switching\n" +
                 "**Price:** Free forever",
          inline: true
        },
        {
          name: "⭐ **Premium Tier**",
          value: "**Audio Quality:** 256kbps\n" +
                 "**Volume Control:** Up to 150%\n" +
                 "**Queue System:** ✅ Up to 100 tracks\n" +
                 "**Playlists:** ✅ Up to 10 playlists\n" +
                 "**Audio Filters:** ✅ All filters available\n" +
                 "**Simultaneous Filters:** Up to 3\n" +
                 "**Commands:** All music commands\n" +
                 "**Features:** Queue, Autoplay, Shuffle, Filters\n" +
                 "**Price:** $4.99/month",
          inline: true
        },
        {
          name: "💎 **Premium+ Tier**",
          value: "**Audio Quality:** 320kbps (Highest)\n" +
                 "**Volume Control:** Up to 200%\n" +
                 "**Queue System:** ✅ Up to 200 tracks\n" +
                 "**Playlists:** ✅ Up to 25 playlists\n" +
                 "**Audio Filters:** ✅ All filters available\n" +
                 "**Simultaneous Filters:** Up to 5\n" +
                 "**Commands:** All commands + Priority\n" +
                 "**Features:** Everything + VIP Support\n" +
                 "**Price:** $9.99/month",
          inline: true
        },
        {
          name: "🎵 **What Free Users Get**",
          value: "• Basic play/pause/resume commands\n" +
                 "• 64kbps audio quality\n" +
                 "• One song at a time (immediate switching)\n" +
                 "• Community support",
          inline: false
        },
        {
          name: "🚀 **Premium Benefits**",
          value: "• High-quality audio (256kbps/320kbps)\n" +
                 "• Queue system with multiple tracks\n" +
                 "• Create and manage playlists\n" +
                 "• Audio filters (bassboost, 8D, nightcore, etc.)\n" +
                 "• Volume control beyond 100%\n" +
                 "• Autoplay and shuffle features\n" +
                 "• Priority support",
          inline: false
        },
        {
          name: "💬 **Support & Contact**",
          value: "**Free:** Community support via Discord\n" +
                 "**Premium:** Priority support with faster response\n" +
                 "**Premium+:** VIP 24/7 support with immediate assistance\n\n" +
                 "**Bot Owners:** <@730818959112274040> & <@970958636740407306>\n" +
                 "**Contact:** @OGGY & @abhinav7777_",
          inline: false
        }
      )
      .setFooter({ 
        text: "🎵 Upgrade now for unlimited music features and crystal-clear audio quality!" 
      })
      .setTimestamp();

    const premiumButton = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel('🚀 Get Premium')
          .setStyle(ButtonStyle.Link)
          .setURL('https://bot.nav-code.com'),
        new ButtonBuilder()
          .setLabel('💬 Contact Support')
          .setStyle(ButtonStyle.Secondary)
          .setCustomId('contact_support')
      );

    await interaction.editReply({
      embeds: [embed],
      components: [premiumButton]
    });
  } catch (err) {
    client.logger.error("slash /tiers error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /tiers." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
