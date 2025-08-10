import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import { resetFilters as pfReset } from "@/helpers/playerFilters";

export const data = new SlashCommandBuilder()
  .setName("reset")
  .setDescription("Clear all audio filters (mirrors legacy prefix)");

export const execute = withCommandLogging("reset", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    // Use the EXACT same method that works in prefix commands
    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const embed = new EmbedBuilder().setColor(client.color.main);

    // Use the same direct calls as the working prefix command
    (player as any)?.filterManager?.resetFilters();
    (player as any)?.filterManager?.clearEQ();

    await interaction.editReply({
      embeds: [embed.setDescription("All filters cleared.")],
    });
  } catch (err) {
    client.logger.error("slash /reset error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /reset." }); } catch {}
  }
});

// Register
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
