import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("rotation")
  .setDescription("Toggle Rotation filter (mirrors legacy prefix)");

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

    // Mirror prefix behavior: toggleRotation() if available; otherwise flip state
    // Use a sensible default frequency if needed; prefix toggled without changing intensity.
    const defaults = { rotationHz: 0.2 };

    // Determine current state
    const current = (anyP.filterManager?.filters?.rotation) ?? (anyP.filters?.rotation) ?? null;
    const willEnable = current ? false : true;

    let applied = false;
    try {
      if (typeof anyP.filterManager?.toggleRotation === "function") {
        await anyP.filterManager.toggleRotation();
        applied = true;
      } else if (typeof anyP.filterManager?.setRotation === "function") {
        await anyP.filterManager.setRotation(willEnable ? defaults : null);
        applied = true;
      } else if (typeof anyP.setFilters === "function") {
        await anyP.setFilters({ rotation: willEnable ? defaults : undefined });
        applied = true;
      } else {
        if (!anyP.filters) anyP.filters = {};
        anyP.filters.rotation = willEnable ? defaults : undefined;
        if (typeof anyP.updateFilters === "function") await anyP.updateFilters();
        applied = true;
      }
    } catch (e) {
      client.logger.warn("rotation filter toggle/apply failed; storing state fallback", e);
    }

    if (!applied) anyP.__rotation = willEnable ? defaults : null;

    await interaction.editReply({
      embeds: [embed.setDescription(willEnable ? "Rotation ENABLED." : "Rotation DISABLED.")],
    });
  } catch (err) {
    client.logger.error("slash /rotation error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /rotation." }); } catch {}
  }
};

// Register
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
