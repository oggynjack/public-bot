import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("remove")
  .setDescription("Remove a song from the queue by its position (1-based)")
  .addIntegerOption(opt =>
    opt.setName("position")
      .setDescription("Queue position to remove (1-based index)")
      .setMinValue(1)
      .setRequired(true),
  );

export const execute = withCommandLogging("remove", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const pos = interaction.options.getInteger("position", true);
    const anyP = player as any;

    // Access queue tracks array in a resilient way
    const queueRef: any =
      (anyP.queue?.tracks) ??
      (Array.isArray(anyP.queue) ? anyP.queue : null);

    if (!Array.isArray(queueRef) || queueRef.length === 0) {
      await interaction.editReply({ content: "Queue is empty." });
      return;
    }

    if (pos < 1 || pos > queueRef.length) {
      await interaction.editReply({ content: `Invalid position. Queue has ${queueRef.length} item(s).` });
      return;
    }

    let removed: any = null;

    // Prefer built-in queue.remove if available (0-based index)
    if (typeof anyP.queue?.remove === "function") {
      removed = await anyP.queue.remove(pos - 1);
    } else {
      removed = queueRef.splice(pos - 1, 1)[0];
      // If the implementation uses an object wrapper, put the array back
      if (anyP.queue?.tracks) {
        anyP.queue.tracks = queueRef;
      } else if (Array.isArray(anyP.queue)) {
        anyP.queue = queueRef;
      }
    }

    const title = removed?.info?.title ?? removed?.title ?? "Unknown title";
    await interaction.editReply({ content: `Removed: ${title}` });
  } catch (err) {
    client.logger.error("slash /remove error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /remove." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
