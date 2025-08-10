import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

/**
 * Shows premium status for the current guild or a specific user.
 * This integrates with prisma schema used in the project (bot, user, guild tables).
 * If your actual premium storage differs, adjust the prisma queries accordingly.
 */
export const data = new SlashCommandBuilder()
  .setName("info")
  .setDescription("Display premium status for this guild or a specific user")
  .addUserOption(opt =>
    opt.setName("user")
      .setDescription("User to check (optional). If omitted, checks this guild's premium")
      .setRequired(false),
  );

export const execute = withCommandLogging("info", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const targetUser = interaction.options.getUser("user", false);

    if (targetUser) {
      // Check premium for a specific user
      // Adjust collection/table names based on your prisma schema
      const user = await client.prisma.user.findUnique({ where: { userId: targetUser.id } }).catch(() => null);
      // Detected schema fields: premiumFrom, premiumTo, premiumPlan[]
      const from = (user as any)?.premiumFrom ?? null;
      const to = (user as any)?.premiumTo ?? null;
      const plansArr = (user as any)?.premiumPlan ?? [];
      const status = !!to && new Date(to).getTime() > Date.now();
      const plans = Array.isArray(plansArr) ? plansArr.join(", ") : (plansArr ?? "N/A");

      const embed = new EmbedBuilder()
        .setTitle(`Premium — ${targetUser.username}`)
        .setColor(status ? 0x57F287 : 0xED4245)
        .setDescription([
          `- Status: ${status ? "Active" : "Inactive"}`,
          `- Registered since: ${from ? new Date(from).toLocaleString() : "N/A"}`,
          `- Expires on: ${to ? new Date(to).toLocaleString() : "N/A"}`,
          `- Registered plans: ${plans ?? "N/A"}`,
        ].join("\n"));

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    // Otherwise, check premium for the current guild
    const guildId = interaction.guildId!;
    const guild = await client.prisma.guild.findUnique({ where: { guildId } }).catch(() => null);
    // Based on detected schema fields: premiumFrom, premiumTo, premiumPlan[]
    const from = (guild as any)?.premiumFrom ?? null;
    const to = (guild as any)?.premiumTo ?? null;
    const plansArr = (guild as any)?.premiumPlan ?? [];
    const status = !!to && new Date(to).getTime() > Date.now();
    const plans = Array.isArray(plansArr) ? plansArr.join(", ") : (plansArr ?? "N/A");

    const embed = new EmbedBuilder()
      .setTitle(`Premium — ${interaction.guild?.name ?? guildId}`)
      .setColor(status ? 0x57F287 : 0xED4245)
      .setDescription([
        `- Status: ${status ? "Active" : "Inactive"}`,
        `- Registered since: ${from ? new Date(from).toLocaleString() : "N/A"}`,
        `- Expires on: ${to ? new Date(to).toLocaleString() : "N/A"}`,
        `- Registered plans: ${plans ?? "N/A"}`,
      ].join("\n"));

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    client.logger.error("slash /info error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /info." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
