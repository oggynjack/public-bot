import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("karaoke")
  .setDescription("Toggle Karaoke filter (mirrors legacy prefix)");

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();
    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const embed = new EmbedBuilder().setColor(client.color.main);
    const anyP = player as any;

    // Check current state and toggle
    const filterEnabled = anyP?.filterManager?.filters?.karaoke;
    const willEnable = !filterEnabled;

    let applied = false;
    try {
      // Use the EXACT same method that works in prefix commands
      await anyP?.filterManager?.toggleKaraoke();
      applied = true;
    } catch (e) {
      client.logger.warn("karaoke filter application failed", e);
    }

    if (!applied) {
      anyP.__karaoke = willEnable;
    }

    const messages = willEnable 
      ? ["🎤 Karaoke mode activated!", "🎵 Ready to sing along!", "🎶 Vocals reduced - time to shine!"]
      : ["🎤 Karaoke mode deactivated!", "🎵 Back to normal audio!", "🎶 Full vocals restored!"];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    await interaction.editReply({
      embeds: [embed.setDescription(randomMessage)],
    });
  } catch (err) {
    client.logger.error("slash /karaoke error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /karaoke." }); } catch {}
  }
};

// Register
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
