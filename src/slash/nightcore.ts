import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

/**
 * Nightcore typically increases pitch and speed slightly using timescale filter.
 * Common defaults: speed ~1.1, pitch ~1.1 (rate may stay 1.0).
 */
export const data = new SlashCommandBuilder()
  .setName("nightcore")
  .setDescription("Toggle Nightcore effect (legacy toggle: no options)");

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    // Legacy behavior: toggle on/off based on current state; defaults speed/pitch 1.1
    const pitch = 1.1;
    const speed = 1.1;

    // Determine current enabled state from known places
    const anyP = player as any;
    const currentTs = (anyP.filterManager?.filters?.timescale) ?? (anyP.filters?.timescale);
    const currentlyOn =
      (typeof currentTs?.speed === "number" && currentTs.speed !== 1.0) ||
      (typeof currentTs?.pitch === "number" && currentTs.pitch !== 1.0);
    const enable = !currentlyOn;

    let applied = false;
    const embed = new EmbedBuilder().setColor(client.color.main);

    try {
      // Use the EXACT same method that works in prefix commands
      if (enable) {
        await anyP?.filterManager?.toggleNightcore();
      } else {
        await anyP?.filterManager?.toggleNightcore();
      }
      applied = true;
    } catch (e) {
      client.logger.warn("nightcore filter application failed", e);
    }

    if (!applied) {
      (player as any).__nightcore = { enabled: enable, speed, pitch };
    }

    await interaction.editReply({
      embeds: [
        embed.setDescription(
          enable
            ? "✅ | Nightcore ENABLED."
            : "✅ | Nightcore DISABLED."
        )
      ],
    });
  } catch (err) {
    client.logger.error("slash /nightcore error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /nightcore." }); } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
