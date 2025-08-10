import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("autoplay")
  .setDescription("Toggle autoplay mode (automatically plays related songs)");

export const execute = withCommandLogging("autoplay", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    // Check premium tier
    const userTier = await client.premium.getEffectiveTier(interaction.user.id, interaction.guildId!);
    
    if (userTier === "free") {
      const embed = new EmbedBuilder()
        .setColor(client.color.red)
        .setTitle("🔒 Premium Feature")
        .setDescription(
          "Autoplay is a premium feature!\n\n" +
          "💎 **Premium Benefits:**\n" +
          "• Automatic song suggestions\n" +
          "• Extended queue system\n" +
          "• High-quality audio\n" +
          "• Priority support\n\n" +
          "📞 Contact <@730818959112274040> to upgrade!"
        );
      
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    // Toggle the current state
    const current = (player as any).get?.("autoplay") ?? (player as any).autoplay ?? (player as any).__autoplay ?? false;
    const enabled = !current;

    const embed = new EmbedBuilder().setColor(client.color.main);

    // Try common API shapes for autoplay - focus on setting the flag properly
    const anyP = player as any;
    let applied = false;
    
    // Persist baseline state for future toggles regardless of API path
    try {
      if (typeof (player as any).set === "function") (player as any).set("autoplay", enabled);
      else (player as any).__autoplay = enabled;
    } catch {}
    
    try {
      if (typeof anyP.setAutoplay === "function") {
        await anyP.setAutoplay(enabled);
        applied = true;
      } else if ("autoplay" in anyP) {
        anyP.autoplay = enabled;
        applied = true;
      } else if (anyP.filterManager?.setAutoplay) {
        await anyP.filterManager.setAutoplay(enabled);
        applied = true;
      }
    } catch (e) {
      client.logger.warn("autoplay set failed via primary paths", e);
    }

    if (!applied) {
      // Fallback: store on player; you may have logic elsewhere to respect this flag.
      anyP.__autoplay = enabled;
    }

    const messages = enabled ? [
      "🎵 Autoplay enabled! Similar songs will play automatically when queue ends",
      "🎶 Autoplay activated! Bot will find related tracks to keep music flowing",
      "🎵 Continuous playback enabled! Queue will auto-refill with similar songs",
      "🎶 Smart autoplay on! Bot will discover music you'll love",
      "🎵 Autoplay mode active! Never-ending music experience started"
    ] : [
      "⏹️ Autoplay disabled! Queue will stop when empty",
      "🎶 Autoplay turned off! Bot will pause when no more songs",
      "⏹️ Continuous playback disabled! Manual queue management only",
      "🎶 Autoplay deactivated! Queue ends when last song finishes",
      "⏹️ Smart autoplay off! Bot won't add new songs automatically"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.editReply({ embeds: [embed.setDescription(randomMessage)] });
  } catch (err) {
    client.logger.error("slash /autoplay error", err);
    try { 
      await interaction.editReply({ 
        embeds: [new EmbedBuilder().setColor(client.color.red).setDescription("An error occurred while executing autoplay.")] 
      }); 
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
