import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import { checkCommandTier, sendPremiumRequiredEmbed, COMMAND_TIERS } from "@/helpers/premiumCheck";

export const data = new SlashCommandBuilder()
  .setName("volume")
  .setDescription("Set or view the player volume (0-200)")
  .addIntegerOption(opt =>
    opt.setName("level")
      .setDescription("Volume level between 0 and 200")
      .setMinValue(0)
      .setMaxValue(200)
      .setRequired(false),
  );

export const execute = withCommandLogging("volume", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    // Check premium tier requirements
    const tierCheck = await checkCommandTier(interaction, client, COMMAND_TIERS["volume"]);
    
    if (!tierCheck.allowed) {
      await sendPremiumRequiredEmbed(interaction, client, "Volume Control", tierCheck.requiredTier, tierCheck.userTier);
      return;
    }

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const level = interaction.options.getInteger("level", false);

    if (level === null || level === undefined) {
      // Show current volume; try common properties or use 100 as default
      const current =
        (player as any).volume ??
        (player as any).filters?.volume ??
        100;
      await interaction.editReply({ content: `Current volume: ${current}` });
      return;
    }

    // Apply volume. Different lavalink clients expose different ways:
    // - Some have player.setVolume(level)
    // - Others expect filter updates or options on play()
    // We'll try setVolume if it exists, otherwise fallback to play with volume filter.
    try {
      if (typeof (player as any).setVolume === "function") {
        await (player as any).setVolume(level);
      } else {
        // Fallback via filters (if supported)
        if ((player as any).filterManager?.setVolume) {
          await (player as any).filterManager.setVolume(level / 100);
        } else {
          // As a last resort, attempt a play call to nudge volume if supported
          await player.play({ volume: level, paused: (player as any).paused ?? false } as any);
        }
      }
      await interaction.editReply({ content: `Volume set to ${level}.` });
    } catch (e) {
      client.logger.warn("volume set fallback path error", e);
      await interaction.editReply({ content: "Failed to set volume with the current player implementation." });
    }
  } catch (err) {
    client.logger.error("slash /volume error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /volume." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
