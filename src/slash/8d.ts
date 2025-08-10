import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import { autoClearFilterEmbed } from "@/helpers/messageUtils";
import { checkCommandTier, sendPremiumRequiredEmbed, COMMAND_TIERS } from "@/helpers/premiumCheck";

export const data = new SlashCommandBuilder()
  .setName("8d")
  .setDescription("Toggle 8D audio effect (spatial rotation)");

export const execute = withCommandLogging("8d", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    // Check premium tier requirements
    const tierCheck = await checkCommandTier(interaction, client, COMMAND_TIERS["8d"]);
    
    if (!tierCheck.allowed) {
      await sendPremiumRequiredEmbed(interaction, client, "8D Audio Effect", tierCheck.requiredTier, tierCheck.userTier);
      return;
    }

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const anyP = player as any;
    const embed = new EmbedBuilder().setColor(client.color.main);

    // Check current state - look for rotation filter
    const isCurrentlyEnabled = Boolean(anyP?.filterManager?.filters?.rotation);

    // Use the EXACT same method that works in prefix commands
    if (typeof anyP?.filterManager?.toggleRotation === "function") {
      await anyP.filterManager.toggleRotation(0.2);
    } else {
      await interaction.editReply({ content: "8D filter is not available on this player." });
      return;
    }

    // Randomized messages
    const messages = [
      "🌀 8D audio effect toggled! Experience spatial sound rotation",
      "🎵 8D spatial audio activated! Feel the music move around you",
      "🌀 Audio rotation effect applied! Immersive 8D experience",
      "🎶 8D surround sound toggled! Music flows in all directions",
      "🌀 Spatial audio rotation enabled! 360° sound experience"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    await interaction.editReply({ embeds: [embed.setDescription(randomMessage)] });

    // Auto-clear after 30 seconds
    autoClearFilterEmbed(interaction, client);
  } catch (err) {
    client.logger.error("slash /8d error", err);
    try { 
      await interaction.editReply({ 
        embeds: [new EmbedBuilder().setColor(client.color.red).setDescription("An error occurred while executing 8D.")] 
      }); 
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
