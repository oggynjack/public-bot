import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

/**
 * Tremolo filter: oscillates volume at a given frequency/depth.
 * Lavalink v4 tremolo expects { frequency: number, depth: number } with 0-1 ranges for depth.
 */
export const data = new SlashCommandBuilder()
  .setName("tremolo")
  .setDescription("Toggle Tremolo effect (toggles current state)")
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

export const execute = withCommandLogging("tremolo", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
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
    if (typeof anyP?.filterManager?.toggleTremolo === "function") {
      await anyP.filterManager.toggleTremolo(frequency, depth);
    } else {
      await interaction.editReply({ content: "Tremolo filter is not available on this player." });
      return;
    }

    // Randomized messages
    const messages = [
      `🎵 Tremolo effect toggled! Frequency: ${frequency}Hz, Depth: ${depth}`,
      `🎶 Tremolo oscillation applied! ${frequency}Hz frequency with ${depth} depth`,
      `🎵 Volume tremolo effect active! ${frequency}Hz @ ${depth} intensity`,
      `🎶 Tremolo modulation set! ${frequency}Hz oscillation, ${depth} depth`,
      `🎵 Audio tremolo enabled! Frequency ${frequency}Hz, depth ${depth}`
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.editReply({ embeds: [embed.setDescription(randomMessage)] });
  } catch (err) {
    client.logger.error("slash /tremolo error", err);
    try { 
      await interaction.editReply({ 
        embeds: [new EmbedBuilder().setColor(client.color.red).setDescription("An error occurred while executing tremolo.")] 
      }); 
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
