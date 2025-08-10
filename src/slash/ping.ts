import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Display bot latency");

export const execute = withCommandLogging("ping", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  const sent = await interaction.reply({ content: "Pinging..." });
  const ws = Math.round(client.ws.ping ?? 0);
  const rtt = sent.createdTimestamp - interaction.createdTimestamp;
  const average = Math.round((ws + rtt) / 2);
  
  const embed = new EmbedBuilder()
    .setColor(client.color.main)
    .setDescription(`🏓 **Pong!**\n\n📡 **Average Response:** ${average}ms`);
    
  await interaction.editReply({ content: "", embeds: [embed] });
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
