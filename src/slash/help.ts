import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Display help menu for available commands")
  .addStringOption(opt =>
    opt.setName("command")
      .setDescription("Specific command to get details for")
      .setRequired(false),
  );

function summarizeCommands(client: ExtendedClient) {
  const slash = (client as any).slash as Map<string, { data: any, execute: Function }>;
  const names = slash ? Array.from(slash.keys()).sort((a, b) => a.localeCompare(b)) : [];
  return names;
}

export const execute = withCommandLogging("help", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  const cmd = interaction.options.getString("command", false);

  const all = summarizeCommands(client);
  if (!cmd) {
    const chunks: string[] = [];
    const perLine = 6;
    for (let i = 0; i < all.length; i += perLine) {
      chunks.push(all.slice(i, i + perLine).map(n => "`/" + n + "`").join("  "));
    }

    const embed = new EmbedBuilder()
      .setTitle("🛠️ Help Menu")
      .setDescription("Here are the available slash commands:")
      .addFields({ name: "Commands", value: chunks.join("\n") || "No commands loaded" })
      .setColor(0x5865F2);

    await interaction.reply({ embeds: [embed] });
    return;
  }

  // Show specific command details if found
  const slash = (client as any).slash as Map<string, { data: any, execute: Function }>;
  const meta = slash?.get(cmd);
  if (!meta) {
    await interaction.reply({ content: `Command "/${cmd}" not found.`, flags: MessageFlags.Ephemeral });
    return;
  }

  const d = meta.data;
  const embed = new EmbedBuilder()
    .setTitle(`/${d.name}`)
    .setDescription(d.description ?? "No description")
    .setColor(0x5865F2);

  // Options summary if present
  const opts = d.options ?? [];
  if (Array.isArray(opts) && opts.length > 0) {
    const lines = opts.map((o: any) => {
      const req = o.required ? "required" : "optional";
      return `• ${o.name} (${o.type ?? "option"}, ${req}) — ${o.description ?? "No description"}`;
    });
    embed.addFields({ name: "Options", value: lines.join("\n") });
  }

  await interaction.reply({ embeds: [embed] });
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
