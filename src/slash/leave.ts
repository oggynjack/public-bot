import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("leave")
  .setDescription("Make the bot leave the current voice channel and destroy the player");

export const execute = withCommandLogging("leave", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    try {
      // Stop playback if supported, then disconnect/destroy
      if (typeof (player as any).stop === "function") {
        try { await (player as any).stop(); } catch {}
      }

      if (player.connected) {
        try { await player.disconnect(); } catch {}
      }

      if (typeof (client.manager as any).destroyPlayer === "function") {
        try { await (client.manager as any).destroyPlayer(interaction.guildId!); } catch {}
      } else if (typeof (player as any).destroy === "function") {
        try { await (player as any).destroy(); } catch {}
      }

      await interaction.editReply({ content: "Left the voice channel." });
    } catch (e) {
      client.logger.warn("leave cleanup error", e);
      await interaction.editReply({ content: "Attempted to leave, but encountered an error." });
    }
  } catch (err) {
    client.logger.error("slash /leave error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /leave." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
