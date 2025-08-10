import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { EQList } from "lavalink-client";

export const data = new SlashCommandBuilder()
  .setName("bassboost")
  .setDescription("Set bassboost level (high, medium, low, or off)")
  .addStringOption((opt) =>
    opt
      .setName("level")
      .setDescription("Bassboost level")
      .setRequired(true)
      .addChoices(
        { name: "high", value: "high" },
        { name: "medium", value: "medium" },
        { name: "low", value: "low" },
        { name: "off", value: "off" },
      ),
  );

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const level = interaction.options.getString("level", true) as "high" | "medium" | "low" | "off";
    const embed = new EmbedBuilder().setColor(client.color.main);

    try {
      // Use the EXACT same method that works in prefix commands
      if (level === "high") {
        await (player as any)?.filterManager?.setEQ(EQList.BassboostHigh);
      } else if (level === "medium") {
        await (player as any)?.filterManager?.setEQ(EQList.BassboostMedium);
      } else if (level === "low") {
        await (player as any)?.filterManager?.setEQ(EQList.BassboostLow);
      } else if (level === "off") {
        await (player as any)?.filterManager?.clearEQ();
      }
    } catch (e) {
      client.logger.warn("bassboost application failed", e);
    }

    await interaction.editReply({
      embeds: [
        embed.setDescription(`Bassboost set to ${level}.`),
      ],
    });
  } catch (err) {
    client.logger.error("slash /bassboost error", err);
    try {
      await interaction.editReply({ content: "An error occurred while executing /bassboost." });
    } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
