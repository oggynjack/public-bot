import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

/**
 * /playlist command:
 * - list: lists your playlists
 * - show: shows details for one of your playlists (track count)
 */
export const data = new SlashCommandBuilder()
  .setName("playlist")
  .setDescription("Manage or view your playlists")
  .addSubcommand(sc =>
    sc.setName("list")
      .setDescription("List your playlists"))
  .addSubcommand(sc =>
    sc.setName("show")
      .setDescription("Show details of one of your playlists")
      .addStringOption(opt =>
        opt.setName("name")
          .setDescription("Playlist name")
          .setRequired(true)));

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    const sub = interaction.options.getSubcommand(true);
    const userId = interaction.user.id;

    if (sub === "list") {
      await interaction.deferReply();
      const lists = await client.prisma.playlist.findMany({
        where: { userId },
        select: { name: true, private: true, _count: { select: { tracks: true } } } as any,
      });

      if (!lists.length) {
        await interaction.editReply("You have no playlists.");
        return;
      }

      const lines = lists.map((p: any) => `• ${p.name} — ${p._count?.tracks ?? 0} tracks ${p.private ? "(private)" : ""}`);
      const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s Playlists`)
        .setColor(0x5865F2)
        .setDescription(lines.join("\n"));

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    if (sub === "show") {
      await interaction.deferReply();
      const name = interaction.options.getString("name", true);

      const pl = await client.prisma.playlist.findUnique({
        where: { userId_name: { userId, name } } as any,
        include: { _count: { select: { tracks: true } } } as any,
      });

      if (!pl) {
        await interaction.editReply(`Playlist "${name}" not found.`);
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`Playlist — ${pl.name}`)
        .addFields(
          { name: "Owner", value: `<@${userId}>`, inline: true },
          { name: "Private", value: pl.private ? "Yes" : "No", inline: true },
          { name: "Tracks", value: String((pl as any)._count?.tracks ?? 0), inline: true },
        )
        .setColor(0x5865F2);

      await interaction.editReply({ embeds: [embed] });
      return;
    }
  } catch (err) {
    client.logger.error("slash /playlist error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /playlist." }); } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
