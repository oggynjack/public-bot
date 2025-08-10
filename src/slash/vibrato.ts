import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

/**
 * Vibrato filter: modulates pitch at a given frequency/depth.
 * Lavalink v4 vibrato expects { frequency: number, depth: number } (depth: 0.0 - 1.0).
 */
export const data = new SlashCommandBuilder()
  .setName("vibrato")
  .setDescription("Toggle Vibrato effect (toggles current state)")
  .addNumberOption(opt =>
    opt.setName("frequency")
      .setDescription("Oscillation frequency (Hz), default 2.0")
      .setMinValue(0.1)
      .setMaxValue(20.0)
      .setRequired(false),
  )
  .addNumberOption(opt =>
    opt.setName("depth")
      .setDescription("Depth (0.0 - 1.0), default 0.5")
      .setMinValue(0.0)
      .setMaxValue(1.0)
      .setRequired(false),
  );

export const execute = withCommandLogging("vibrato", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const frequency = interaction.options.getNumber("frequency", false) ?? 2.0;
    const depth = interaction.options.getNumber("depth", false) ?? 0.5;

    const anyP = player as any;
    const embed = new EmbedBuilder().setColor(client.color.main);

    // Use the EXACT same method that works in prefix commands
    if (typeof anyP?.filterManager?.toggleVibrato === "function") {
      await anyP.filterManager.toggleVibrato(frequency, depth);
    } else {
      await interaction.editReply({ content: "Vibrato filter is not available on this player." });
      return;
    }

    // Randomized messages
    const messages = [
      `🎵 Vibrato effect toggled! Frequency: ${frequency}Hz, Depth: ${depth}`,
      `🎶 Vibrato modulation applied! ${frequency}Hz frequency with ${depth} depth`,
      `🎵 Pitch vibrato effect active! ${frequency}Hz @ ${depth} intensity`,
      `🎶 Vibrato oscillation set! ${frequency}Hz pitch variation, ${depth} depth`,
      `🎵 Audio vibrato enabled! Frequency ${frequency}Hz, depth ${depth}`
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.editReply({ embeds: [embed.setDescription(randomMessage)] });
  } catch (err) {
    client.logger.error("slash /vibrato error", err);
    try { 
      await interaction.editReply({ 
        embeds: [new EmbedBuilder().setColor(client.color.red).setDescription("An error occurred while executing vibrato.")] 
      }); 
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
