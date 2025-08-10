import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pitch")
  .setDescription("Set pitch multiplier (mirrors legacy prefix)")
  .addStringOption(opt =>
    opt
      .setName("value")
      .setDescription("Pitch multiplier, e.g. 1.0, 1.25 (range 0.5 - 5.0)")
      .setRequired(true),
  );

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const embed = new EmbedBuilder().setColor(client.color.main);

    const raw = interaction.options.getString("value", true);
    const normalized = raw.replace(",", ".");
    const isValidNumber = /^[0-9]*\.?[0-9]+$/.test(normalized);
    const pitch = Number.parseFloat(normalized);

    if (!isValidNumber || Number.isNaN(pitch) || pitch < 0.5 || pitch > 5.0) {
      await interaction.editReply({
        embeds: [embed.setColor(client.color.red).setDescription("Invalid pitch value. Allowed range is 0.5 - 5.0.")],
      });
      return;
    }

    try {
      const anyP = player as any;
      if (anyP.filterManager?.setPitch) {
        await anyP.filterManager.setPitch(pitch);
      } else if (typeof anyP.setFilters === "function") {
        await anyP.setFilters({ timescale: { pitch } });
      } else {
        if (!anyP.filters) anyP.filters = {};
        anyP.filters.timescale = { ...(anyP.filters.timescale ?? {}), pitch };
        if (typeof anyP.updateFilters === "function") await anyP.updateFilters();
      }
    } catch (e) {
      client.logger.warn("pitch application failed; storing state fallback", e);
      (player as any).__pitch = pitch;
    }

    await interaction.editReply({
      embeds: [embed.setDescription(`Pitch set to ${pitch}.`)],
    });
  } catch (err) {
    client.logger.error("slash /pitch error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /pitch." }); } catch {}
  }
};

// Register
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
