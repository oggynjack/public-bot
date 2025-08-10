import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import { checkCommandTier, sendPremiumRequiredEmbed, COMMAND_TIERS } from "@/helpers/premiumCheck";

export const data = new SlashCommandBuilder()
  .setName("shuffle")
  .setDescription("Shuffle the current queue");

export const execute = withCommandLogging("shuffle", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    // Check premium tier requirements
    const tierCheck = await checkCommandTier(interaction, client, COMMAND_TIERS["shuffle"]);
    
    if (!tierCheck.allowed) {
      await sendPremiumRequiredEmbed(interaction, client, "Queue Shuffle", tierCheck.requiredTier, tierCheck.userTier);
      return;
    }

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    // Access queue tracks array in a resilient way
    const queueRef: any =
      (player.queue as any)?.tracks ??
      (Array.isArray(player.queue as any) ? (player.queue as any) : null);

    if (!Array.isArray(queueRef) || queueRef.length < 2) {
      await interaction.editReply({ content: "Not enough tracks in the queue to shuffle." });
      return;
    }

    // Fisher–Yates shuffle
    for (let i = queueRef.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queueRef[i], queueRef[j]] = [queueRef[j], queueRef[i]];
    }

    // If the implementation uses an object wrapper, put the array back
    if ((player.queue as any)?.tracks) {
      (player.queue as any).tracks = queueRef;
    }

    await interaction.editReply({ content: "Queue shuffled." });
  } catch (err) {
    client.logger.error("slash /shuffle error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /shuffle." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
