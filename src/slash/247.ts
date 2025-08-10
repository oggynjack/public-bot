import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("247")
  .setDescription("Toggle 24/7 mode (bot stays in voice channel indefinitely)");

export const execute = withCommandLogging("247", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    // Always defer first to guarantee a single response path (avoid deprecated ephemeral option)
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      // Check if user is in voice channel to create player
      const member = await interaction.guild?.members.fetch(interaction.user.id).catch(() => null);
      const voice = member?.voice?.channel;
      if (!voice) {
        const embed = new EmbedBuilder()
          .setColor(client.color.red)
          .setDescription("❌ You must be in a voice channel to enable 24/7 mode.");
        await interaction.editReply({ embeds: [embed] });
        return;
      }

      // Create player for 24/7 mode
      const newPlayer = client.manager.createPlayer({
        guildId: interaction.guildId!,
        voiceChannelId: voice.id,
        textChannelId: interaction.channelId,
        selfMute: false,
        selfDeaf: true,
        vcRegion: (voice as any).rtcRegion ?? undefined,
      });

      if (!newPlayer.connected) await newPlayer.connect();

      // Enable 24/7 mode on new player
      (newPlayer as any).__247Mode = true;
      newPlayer.set("autoplay", true); // Use proper player.set method
      (newPlayer as any).__autoplay = true; // Backup property for compatibility

      // Ensure the player is ready for audio
      // Do NOT pause; only resume if paused
      try {
        if ((newPlayer as any).paused) {
          await (newPlayer as any).resume();
        }
      } catch {}

      const embed = new EmbedBuilder()
        .setColor(client.color.green)
        .addFields(
          { name: "🔄 24/7 Mode Enabled", value: "Bot will stay in voice channel continuously", inline: false },
          { name: "🎵 Autoplay Activated", value: "Related songs will play automatically", inline: false },
          { name: "📢 Voice Channel", value: voice.name, inline: false }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    // Toggle 24/7 mode on existing player
    const current247Mode = (player as any).__247Mode ?? false;
    const new247Mode = !current247Mode;

    (player as any).__247Mode = new247Mode;

    // Log the state change for debugging
    client.logger.info(
      `247 mode ${new247Mode ? "enabled" : "disabled"} in guild ${interaction.guildId}. Player state: connected=${player.connected}, playing=${player.playing}, paused=${player.paused}`
    );

    const embed = new EmbedBuilder().setColor(client.color.main);

    if (new247Mode) {
      // Enable 24/7 - also enable autoplay
      player.set("autoplay", true); // Use proper player.set method
      (player as any).__autoplay = true; // Backup property for compatibility

      // Ensure the player continues playing when enabling 24/7 (do not pause)
      try {
        if ((player as any).paused) {
          await (player as any).resume();
        }
      } catch {}

      const messages = [
        "🔄 24/7 Mode enabled! Bot will stay in voice channel continuously",
        "⏰ Always-on mode activated! Bot won't leave voice channel",
        "🔄 Persistent playback enabled! Bot stays connected 24/7",
        "⏰ Continuous mode on! Bot will remain in voice channel",
        "🔄 24/7 operation active! Bot won't disconnect automatically"
      ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      embed.addFields(
        { name: "✅ 24/7 Mode Enabled", value: randomMessage, inline: false },
        { name: "🎵 Autoplay", value: "Automatically enabled for continuous music", inline: false }
      );
    } else {
      // Disable 24/7 - do NOT stop current audio; only disable autoplay
      player.set("autoplay", false); // Use proper player.set method
      (player as any).__autoplay = false; // Backup property for compatibility

      const messages = [
        "⏹️ 24/7 Mode disabled! Bot will leave when inactive",
        "⏰ Always-on mode deactivated! Normal disconnect behavior",
        "🔄 Persistent mode off! Bot will leave voice channel when done",
        "⏰ Continuous mode disabled! Standard timeout applies",
        "⏹️ 24/7 operation stopped! Bot will disconnect normally"
      ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      embed.addFields(
        { name: "❌ 24/7 Mode Disabled", value: randomMessage, inline: false },
        { name: "ℹ️ Behavior", value: "Bot will leave voice channel when queue ends", inline: false }
      );

      // If queue is empty and not playing, remain connected (do NOT destroy) when toggling 24/7
      // This prevents audio cut-outs or unintended disconnects; leaving VC idle is expected when 24/7 is toggled.
      // Removal from VC should be handled by normal inactivity logic elsewhere if desired.
      // No-op here to keep audio/session stable.
    }

    embed.setTimestamp();
    await interaction.editReply({ embeds: [embed] });
  } catch (err: any) {
    client.logger.error("slash /247 error", err);
    const errorEmbed = new EmbedBuilder()
      .setColor(client.color.red)
      .setDescription("❌ An error occurred while toggling 24/7 mode.");
    try {
      if (interaction.deferred && !interaction.replied) {
        await interaction.editReply({ embeds: [errorEmbed] });
      } else if (!interaction.deferred && !interaction.replied) {
        await interaction.reply({ embeds: [errorEmbed], flags: 64 }); // MessageFlags.Ephemeral = 64
      } else {
        // Already responded; avoid double-ack
        client.logger.warn("Attempted to send error after interaction was already acknowledged.");
      }
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
