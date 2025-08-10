import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("resume")
  .setDescription("Resume playback if paused");

export const execute = withCommandLogging("resume", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      const embed = new EmbedBuilder()
        .setColor(client.color.red)
        .setDescription("❌ No active player in this guild.");
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    const embed = new EmbedBuilder().setColor(client.color.main);

    try {
      if ((player as any).paused === false) {
        embed.setDescription("🎵 Player is already playing.");
        await interaction.editReply({ embeds: [embed] });
        return;
      }
    } catch {}

    // Use the EXACT same method that works in prefix commands - player.resume()
    if (typeof (player as any).resume === "function") {
      await (player as any).resume();
    } else if (typeof (player as any).setPaused === "function") {
      await (player as any).setPaused(false);
    } else {
      // Fallback: generic resume using play({ paused: false })
      await player.play({ paused: false });
    }

    const messages = [
      "▶️ Playback resumed! Music continues from where it paused",
      "🎵 Track resumed! Back to the music",
      "▶️ Music unpaused! Continuing playback",
      "🎶 Resumed successfully! Audio restored",
      "▶️ Playback restored! Music flows again"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    embed.setDescription(randomMessage);
    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    client.logger.error("slash /resume error", err);
    const errorEmbed = new EmbedBuilder()
      .setColor(client.color.red)
      .setDescription("❌ An error occurred while resuming playback.");
    try { await interaction.editReply({ embeds: [errorEmbed] }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
