import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("loop")
  .setDescription("Toggle loop mode for current track (on/off)");

export const execute = withCommandLogging("loop", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    // Determine current track repeat mode in a resilient way
    const anyP = player as any;
    const isCurrentlyRepeating = anyP.trackRepeat ?? anyP.repeatMode === "track" ?? anyP.loop === "track" ?? false;

    const embed = new EmbedBuilder().setColor(client.color.main);

    // Toggle track repeat mode
    const newMode = !isCurrentlyRepeating;

    // Try different API patterns for setting track repeat
    let applied = false;
    try {
      if (typeof anyP.setLoop === "function") {
        await anyP.setLoop(newMode ? "track" : "off");
        applied = true;
      } else if (typeof anyP.setTrackRepeat === "function") {
        await anyP.setTrackRepeat(newMode);
        applied = true;
      } else if (typeof anyP.setRepeatMode === "function") {
        await anyP.setRepeatMode(newMode ? "track" : "off");
        applied = true;
      } else if ("trackRepeat" in anyP) {
        anyP.trackRepeat = newMode;
        applied = true;
      } else if ("repeatMode" in anyP) {
        anyP.repeatMode = newMode ? "track" : "off";
        applied = true;
      }
    } catch (e) {
      client.logger.warn("loop set failed via primary paths", e);
    }

    if (!applied) {
      // Fallback: store on player for custom handling
      anyP.__trackRepeat = newMode;
    }

    const messages = newMode ? [
      "🔁 Current track will loop infinitely!",
      "🎵 Track repeat enabled! This song will keep playing",
      "🔄 Loop mode activated for current song!",
      "🎶 Infinite repeat on! Current track loops forever",
      "🔁 Track looping enabled! Song will replay endlessly"
    ] : [
      "⏹️ Track loop disabled! Song will play once",
      "🎵 Repeat mode off! Track will end normally",
      "🔄 Loop deactivated! Song plays through once only",
      "🎶 Track repeat off! Normal playback resumed",
      "⏹️ Infinite loop disabled! Song won't repeat"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.editReply({ embeds: [embed.setDescription(randomMessage)] });
  } catch (err) {
    client.logger.error("slash /loop error", err);
    try { 
      await interaction.editReply({ 
        embeds: [new EmbedBuilder().setColor(client.color.red).setDescription("An error occurred while executing loop.")] 
      }); 
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
