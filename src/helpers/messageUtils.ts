import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type ExtendedClient from "@/classes/ExtendedClient";

/**
 * Auto-clear filter command embeds after 30 seconds
 */
export async function autoClearFilterEmbed(interaction: ChatInputCommandInteraction, client: ExtendedClient, delay: number = 30000) {
  setTimeout(async () => {
    try {
      const clearEmbed = new EmbedBuilder()
        .setColor(client.color.gray)
        .setDescription("🗑️ *Filter message cleared*");
      await interaction.editReply({ embeds: [clearEmbed] });
      
      // Delete the cleared message after 3 seconds
      setTimeout(async () => {
        try {
          await interaction.deleteReply();
        } catch {}
      }, 3000);
    } catch {}
  }, delay);
}

/**
 * Auto-clear now playing embeds after 45 seconds
 */
export async function autoClearNowPlayingEmbed(interaction: ChatInputCommandInteraction, client: ExtendedClient, delay: number = 45000) {
  setTimeout(async () => {
    try {
      const clearEmbed = new EmbedBuilder()
        .setColor(client.color.gray)
        .setDescription("🗑️ *Now playing message cleared*");
      await interaction.editReply({ embeds: [clearEmbed] });
      
      // Delete the cleared message after 3 seconds
      setTimeout(async () => {
        try {
          await interaction.deleteReply();
        } catch {}
      }, 3000);
    } catch {}
  }, delay);
}
