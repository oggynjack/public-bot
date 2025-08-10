import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("clearqueue")
  .setDescription("Clear all songs from the queue (keeps the current track)");

export const execute = withCommandLogging("clearqueue", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    // Access queue tracks array in a resilient way
    const queueObj = (player.queue as any);
    const isArrayQueue = Array.isArray(queueObj);
    const isWrapped = queueObj && Array.isArray(queueObj.tracks);

    if (isWrapped) {
      queueObj.tracks = [];
    } else if (isArrayQueue) {
      (player as any).queue = [];
    } else if (queueObj?.clear) {
      // Some libs expose a clear() method
      try { queueObj.clear(); } catch {}
    } else {
      // Fallback: try replacing with an empty list if possible
      try { (player as any).queue = { tracks: [] }; } catch {}
    }

    await interaction.editReply({ content: "Cleared the queue." });
  } catch (err) {
    client.logger.error("slash /clearqueue error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /clearqueue." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
