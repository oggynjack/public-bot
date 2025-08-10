import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import { checkCommandTier, sendPremiumRequiredEmbed, COMMAND_TIERS } from "@/helpers/premiumCheck";

export const data = new SlashCommandBuilder()
  .setName("queue")
  .setDescription("Show the current music queue");

export const execute = withCommandLogging("queue", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    // Check premium tier requirements
    const tierCheck = await checkCommandTier(interaction, client, COMMAND_TIERS["queue"]);
    
    if (!tierCheck.allowed) {
      await sendPremiumRequiredEmbed(interaction, client, "Queue Display", tierCheck.requiredTier, tierCheck.userTier);
      return;
    }

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      const embed = new EmbedBuilder()
        .setColor(client.color.red)
        .setDescription("❌ No active player in this guild.");
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    const tracks: any[] =
      Array.isArray((player.queue as any)?.tracks)
        ? (player.queue as any).tracks
        : (Array.isArray(player.queue as any) ? (player.queue as any) : []);

    const embed = new EmbedBuilder().setColor(client.color.main);

    if (!tracks.length) {
      embed.setDescription("📭 Queue is currently empty.");
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    // Derive "now playing" from the first item or the player's internal state if available
    const lines: string[] = [];
    const now = (player as any).queue?.current ?? (player as any).nowPlaying ?? (player as any).track ?? null;

    if (now?.info) {
      lines.push(`🎵 **Now Playing:** ${now.info.title}\n`);
    }

    lines.push(`📋 **Queue (${tracks.length} tracks):**`);
    const listed = tracks.slice(0, 10);
    for (let i = 0; i < listed.length; i++) {
      const t = listed[i]?.info;
      if (!t) continue;
      lines.push(`\`${i + 1}.\` ${t.title}`);
    }

    const extra = tracks.length - listed.length;
    if (extra > 0) lines.push(`\n*...and ${extra} more tracks*`);

    embed.setDescription(lines.join("\n"));
    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    client.logger.error("slash /queue error", err);
    // Only attempt to reply if the interaction hasn't expired
    if (!interaction.replied && !interaction.deferred) {
      try {
        const errorEmbed = new EmbedBuilder()
          .setColor(client.color.red)
          .setDescription("❌ An error occurred while showing the queue.");
        await interaction.reply({ embeds: [errorEmbed], flags: 64 }); // MessageFlags.Ephemeral = 64
      } catch {}
    } else if (interaction.deferred && !interaction.replied) {
      try {
        const errorEmbed = new EmbedBuilder()
          .setColor(client.color.red)
          .setDescription("❌ An error occurred while showing the queue.");
        await interaction.editReply({ embeds: [errorEmbed] });
      } catch {}
    }
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
