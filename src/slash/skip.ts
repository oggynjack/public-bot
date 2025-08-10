import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import { checkCommandTier, sendPremiumRequiredEmbed, COMMAND_TIERS } from "@/helpers/premiumCheck";

export const data = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Skip (optionally to a specific queue position)")
  .addIntegerOption(opt =>
    opt.setName("to")
      .setDescription("Skip to a specific queue position (1-based index)")
      .setMinValue(1)
      .setRequired(false),
  );

export const execute = withCommandLogging("skip", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    // Check premium tier requirements
    const tierCheck = await checkCommandTier(interaction, client, COMMAND_TIERS["skip"]);
    
    if (!tierCheck.allowed) {
      await sendPremiumRequiredEmbed(interaction, client, "Skip Control", tierCheck.requiredTier, tierCheck.userTier);
      return;
    }

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const to = interaction.options.getInteger("to", false);
    const embedPrefix = (msg: string) => ({ content: msg });

    // Mirror legacy: if an index provided, validate and skip N
    if (to && to > 0) {
      const q: any[] =
        Array.isArray((player.queue as any)?.tracks)
          ? (player.queue as any).tracks
          : (Array.isArray(player.queue as any) ? (player.queue as any) : []);

      if (to > q.length) {
        await interaction.editReply(embedPrefix(`Cannot skip to ${to}; queue has only ${q.length} item(s).`));
        return;
      }

      // Preferred path: if player.skip supports an index argument, use it
      if (typeof (player as any).skip === "function" && (player as any).skip.length >= 1) {
        await (player as any).skip(to);
      } else {
        // Fallback: slice queue to the target (1-based), then advance
        if (Array.isArray((player.queue as any)?.tracks)) {
          (player.queue as any).tracks = q.slice(to - 1);
        } else if (Array.isArray(player.queue as any)) {
          (player as any).queue = q.slice(to - 1);
        }
        if (typeof (player as any).skip === "function") {
          await (player as any).skip();
        } else if (typeof (player as any).stop === "function") {
          await (player as any).stop();
        } else {
          await player.play({ paused: false });
        }
      }

      await interaction.editReply(embedPrefix(`Skipped ${to} item(s).`));
      return;
    }

    // Default: skip current
    if (typeof (player as any).skip === "function") {
      await (player as any).skip();
    } else if (typeof (player as any).stop === "function") {
      await (player as any).stop();
    } else {
      await player.play({ paused: false });
    }
    await interaction.editReply(embedPrefix("Skipped."));
  } catch (err) {
    client.logger.error("slash /skip error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /skip." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
