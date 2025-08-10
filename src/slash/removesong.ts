import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

/**
 * Remove a track from one of the caller's playlists, by index or by matching title/uri.
 * Index is 1-based when provided.
 */
export const data = new SlashCommandBuilder()
  .setName("removesong")
  .setDescription("Remove a song from one of your playlists")
  .addStringOption(opt =>
    opt.setName("playlist")
      .setDescription("Your playlist name")
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(true),
  )
  .addIntegerOption(opt =>
    opt.setName("index")
      .setDescription("1-based index of the song to remove")
      .setMinValue(1)
      .setRequired(false),
  )
  .addStringOption(opt =>
    opt.setName("title")
      .setDescription("Match by title if index not supplied")
      .setRequired(false),
  )
  .addStringOption(opt =>
    opt.setName("uri")
      .setDescription("Match by uri if index not supplied")
      .setRequired(false),
  );

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const userId = interaction.user.id;
    const playlistName = interaction.options.getString("playlist", true).trim();
    const idx = interaction.options.getInteger("index", false);
    const title = interaction.options.getString("title", false)?.trim();
    const uri = interaction.options.getString("uri", false)?.trim();

    const pl = await client.prisma.playlist.findUnique({
      where: { userId_name: { userId, name: playlistName } } as any,
      select: { playlist_id: true },
    });
    if (!pl) {
      await interaction.editReply(`Playlist "${playlistName}" not found.`);
      return;
    }

    // If index provided: fetch ordered tracks and delete the one at position
    if (typeof idx === "number") {
      // No explicit position column exists; use created order by track_id as fallback
      const tracks = await client.prisma.track.findMany({
        where: { playlist_id: pl.playlist_id },
        orderBy: { track_id: "asc" } as any,
        select: { track_id: true, name: true },
      });
      if (idx < 1 || idx > tracks.length) {
        await interaction.editReply(`Invalid index. This playlist has ${tracks.length} tracks.`);
        return;
      }
      const target = tracks[idx - 1];
      await client.prisma.track.delete({ where: { track_id: target.track_id } });
      await interaction.editReply(`Removed track #${idx} (${target.name}) from "${playlistName}".`);
      return;
    }

    // Otherwise match by title or uri
    if (!title && !uri) {
      await interaction.editReply("Provide either index or a title/uri to remove.");
      return;
    }

    const where: any = { playlist_id: pl.playlist_id };
    if (title) where.name = title;
    if (uri) where.uri = uri;

    // Attempt to delete the first match
    const first = await client.prisma.track.findFirst({
      where,
      select: { track_id: true, name: true },
      orderBy: { track_id: "asc" } as any,
    });

    if (!first) {
      await interaction.editReply("No matching track found to remove.");
      return;
    }

    await client.prisma.track.delete({ where: { track_id: first.track_id } });
    await interaction.editReply(`Removed "${first.name}" from "${playlistName}".`);
  } catch (err) {
    client.logger.error("slash /removesong error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /removesong." }); } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
