import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pause the currently playing track");

export const execute = withCommandLogging("pause", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const embed = new EmbedBuilder().setColor(client.color.main);

    // Check if already paused
    try {
      if ((player as any).paused === true) {
        await interaction.editReply({ 
          embeds: [embed.setDescription("🎵 Player is already paused.")] 
        });
        return;
      }
    } catch {}

    // Use the EXACT same method that works in prefix commands - player.pause()
    if (typeof (player as any).pause === "function") {
      await (player as any).pause();
    } else if (typeof (player as any).setPaused === "function") {
      await (player as any).setPaused(true);
    } else {
      // Fallback: generic pause using play({ paused: true })
      await player.play({ paused: true });
    }

    const messages = [
      "⏸️ Track paused! Use /resume to continue",
      "🔇 Playback paused! Music stopped temporarily",
      "⏸️ Music paused! Hit resume when ready",
      "🎵 Track halted! Use resume to continue playing",
      "⏸️ Playback stopped! Ready to resume anytime"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.editReply({ embeds: [embed.setDescription(randomMessage)] });
  } catch (err) {
    client.logger.error("slash /pause error", err);
    try { 
      await interaction.editReply({ 
        embeds: [new EmbedBuilder().setColor(client.color.red).setDescription("An error occurred while executing pause.")] 
      }); 
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
