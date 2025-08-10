import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("lowpass")
  .setDescription("Toggle Lowpass filter (mirrors legacy prefix)");

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();
    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const embed = new EmbedBuilder().setColor(client.color.main);
    const anyP = player as any;

    // Check current state and toggle
    const filterEnabled = anyP?.filterManager?.filters?.lowPass;
    const willEnable = !filterEnabled;

    let applied = false;
    try {
      // Use the EXACT same method that works in prefix commands
      if (willEnable) {
        await anyP?.filterManager?.toggleLowPass(20);
      } else {
        await anyP?.filterManager?.toggleLowPass();
      }
      applied = true;
    } catch (e) {
      client.logger.warn("lowpass filter application failed", e);
    }

    if (!applied) {
      anyP.__lowPass = willEnable;
    }

    const enabledMessages = ["🔇 Low-pass filter activated!", "🎵 High frequencies filtered!", "🔊 Smooth bass sounds enabled!"];
    const disabledMessages = ["🔇 Low-pass filter deactivated!", "🎵 Full frequency range restored!", "🔊 Crisp highs are back!"];
    
    const messages = willEnable ? enabledMessages : disabledMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    await interaction.editReply({
      embeds: [embed.setDescription(randomMessage)],
    });
  } catch (err) {
    client.logger.error("slash /lowpass error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /lowpass." }); } catch {}
  }
};

// Register
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
