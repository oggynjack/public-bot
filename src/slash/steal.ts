import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction, User } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

/**
 * Copy another user's playlist into the caller's account with a chosen name.
 * Uses schema:
 *  - Playlist { playlist_id, userId, name, private, tracks: Track[] }
 *  - Track { track_id, uri, name, encode, duration, playlist_id }
 */
export const data = new SlashCommandBuilder()
  .setName("steal")
  .setDescription("Copy another user's playlist into your account")
  .addUserOption(opt =>
    opt.setName("user")
      .setDescription("Owner of the source playlist")
      .setRequired(true),
  )
  .addStringOption(opt =>
    opt.setName("name")
      .setDescription("Name of the source playlist to copy")
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(true),
  )
  .addStringOption(opt =>
    opt.setName("as")
      .setDescription("New name for your copied playlist (defaults to same name if available)")
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(false),
  )
  .addBooleanOption(opt =>
    opt.setName("private")
      .setDescription("Make the copied playlist private (default false)")
      .setRequired(false),
  );

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const sourceUser = interaction.options.getUser("user", true) as User;
    const sourceName = interaction.options.getString("name", true).trim();
    const newName = interaction.options.getString("as", false)?.trim() || sourceName;
    const makePrivate = interaction.options.getBoolean("private", false) ?? false;

    const callerId = interaction.user.id;
    if (callerId === sourceUser.id && sourceName === newName) {
      await interaction.editReply("Source and destination are the same; nothing to copy.");
      return;
    }

    // Find source playlist with tracks
    const source = await client.prisma.playlist.findUnique({
      where: { userId_name: { userId: sourceUser.id, name: sourceName } } as any,
      include: { tracks: true } as any,
    });

    if (!source) {
      await interaction.editReply(`Source playlist "${sourceName}" not found for ${sourceUser.username}.`);
      return;
    }

    // Ensure destination name is free for the caller
    const existing = await client.prisma.playlist.findUnique({
      where: { userId_name: { userId: callerId, name: newName } } as any,
      select: { playlist_id: true },
    });
    if (existing) {
      await interaction.editReply(`You already have a playlist named "${newName}". Choose another name via "as".`);
      return;
    }

    // Create destination playlist
    const dest = await client.prisma.playlist.create({
      data: {
        userId: callerId,
        name: newName,
        private: makePrivate,
      } as any,
      select: { playlist_id: true },
    });

    // Bulk copy tracks
    if (Array.isArray(source.tracks) && source.tracks.length > 0) {
      // Insert in batches to avoid exceeding parameter limits
      const batchSize = 100;
      for (let i = 0; i < source.tracks.length; i += batchSize) {
        const batch = source.tracks.slice(i, i + batchSize);
        await client.prisma.track.createMany({
          data: batch.map(t => ({
            playlist_id: dest.playlist_id,
            name: t.name,
            uri: t.uri,
            encode: t.encode,
            duration: t.duration,
          })) as any,
          skipDuplicates: true as any,
        } as any);
      }
    }

    await interaction.editReply(`Copied "${sourceName}" from ${sourceUser.username} as "${newName}"${makePrivate ? " (private)" : ""}.`);
  } catch (err) {
    client.logger.error("slash /steal error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /steal." }); } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
