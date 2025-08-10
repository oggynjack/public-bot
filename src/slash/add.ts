import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

/**
 * Add a track entry to one of the caller's playlists.
 * Schema used from Prisma:
 *  - Playlist { playlist_id, userId, name, private, tracks: Track[] }
 *  - Track { track_id, uri, name, encode, duration, playlist_id }
 */
export const data = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add a track to one of your playlists")
  .addStringOption(opt =>
    opt.setName("playlist")
      .setDescription("Your playlist name")
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(true),
  )
  .addStringOption(opt =>
    opt.setName("title")
      .setDescription("Track title")
      .setMinLength(1)
      .setMaxLength(200)
      .setRequired(true),
  )
  .addStringOption(opt =>
    opt.setName("uri")
      .setDescription("Track URL/URI")
      .setMinLength(1)
      .setMaxLength(2048)
      .setRequired(true),
  )
  .addIntegerOption(opt =>
    opt.setName("duration")
      .setDescription("Duration in milliseconds (optional)")
      .setMinValue(0)
      .setRequired(false),
  )
  .addStringOption(opt =>
    opt.setName("encode")
      .setDescription("Encoded track string (optional)")
      .setRequired(false),
  );

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const userId = interaction.user.id;
    const playlistName = interaction.options.getString("playlist", true).trim();
    const title = interaction.options.getString("title", true).trim();
    const uri = interaction.options.getString("uri", true).trim();
    const duration = interaction.options.getInteger("duration", false) ?? 0;
    const encode = interaction.options.getString("encode", false) ?? "";

    const pl = await client.prisma.playlist.findUnique({
      where: { userId_name: { userId, name: playlistName } } as any,
      select: { playlist_id: true },
    });

    if (!pl) {
      await interaction.editReply(`Playlist "${playlistName}" not found.`);
      return;
    }

    await client.prisma.track.create({
      data: {
        playlist_id: pl.playlist_id,
        name: title,
        uri,
        encode,
        duration,
      } as any,
    });

    await interaction.editReply(`Added "${title}" to "${playlistName}".`);
  } catch (err) {
    client.logger.error("slash /add error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /add." }); } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
