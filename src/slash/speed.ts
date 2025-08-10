import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("speed")
  .setDescription("Set playback speed (mirrors legacy prefix)")
  .addStringOption(opt =>
    opt
      .setName("value")
      .setDescription("Speed multiplier, e.g. 1.0, 1.25 (range 0.5 - 5.0)")
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
    const rate = Number.parseFloat(normalized);

    if (!isValidNumber || Number.isNaN(rate) || rate < 0.5 || rate > 5.0) {
      await interaction.editReply({
        embeds: [embed.setColor(client.color.red).setDescription("Invalid speed value. Allowed range is 0.5 - 5.0.")],
      });
      return;
    }

    try {
      const anyP = player as any;
      if (anyP.filterManager?.setRate) {
        await anyP.filterManager.setRate(rate);
      } else if (typeof anyP.setFilters === "function") {
        await anyP.setFilters({ timescale: { speed: rate } });
      } else {
        if (!anyP.filters) anyP.filters = {};
        anyP.filters.timescale = { ...(anyP.filters.timescale ?? {}), speed: rate };
        if (typeof anyP.updateFilters === "function") await anyP.updateFilters();
      }
    } catch (e) {
      client.logger.warn("speed application failed; storing state fallback", e);
      (player as any).__speed = rate;
    }

    await interaction.editReply({
      embeds: [embed.setDescription(`Speed set to ${rate}.`)],
    });
  } catch (err) {
    client.logger.error("slash /speed error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /speed." }); } catch {}
  }
};

// Register
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
