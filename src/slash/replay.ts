import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("replay")
  .setDescription("Replay the current track from the beginning");

export const execute = withCommandLogging("replay", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    // Resolve current track info in a resilient way
    const current =
      (player as any).queue?.current ??
      (player as any).nowPlaying ??
      (player as any).track ??
      null;

    const info = current?.info;
    if (!info) {
      await interaction.editReply({ content: "No track is currently playing." });
      return;
    }

    const isSeekable = info.isSeekable ?? true;
    if (!isSeekable) {
      await interaction.editReply({ content: "This track cannot be replayed." });
      return;
    }

    const embed = new EmbedBuilder().setColor(client.color.main);

    // Use the EXACT same method that works in prefix commands - player.seek(0)
    if (typeof (player as any).seek === "function") {
      await (player as any).seek(0);
    } else {
      // Fallback: attempt to restart playback from start
      try {
        await player.play({ position: 0, paused: (player as any).paused ?? false } as any);
      } catch {
        await interaction.editReply({ content: "Failed to replay the current track." });
        return;
      }
    }

    const messages = [
      "🔁 Track replayed from the beginning!",
      "🎵 Restarting the current song!",
      "🔄 Replay activated - starting over!",
      "🎶 Back to the beginning of the track!",
      "🔁 Current song replayed from start!"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.editReply({ embeds: [embed.setDescription(randomMessage)] });
  } catch (err) {
    client.logger.error("slash /replay error", err);
    try { 
      await interaction.editReply({ 
        embeds: [new EmbedBuilder().setColor(client.color.red).setDescription("An error occurred while executing replay.")] 
      }); 
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
