import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

/**
 * Delete one of the caller's playlists by name.
 * Uses composite unique { userId, name } to ensure ownership.
 */
export const data = new SlashCommandBuilder()
  .setName("delete")
  .setDescription("Delete one of your playlists")
  .addStringOption(opt =>
    opt.setName("name")
      .setDescription("Name of your playlist to delete")
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(true),
  );

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const userId = interaction.user.id;
    const name = interaction.options.getString("name", true).trim();

    const pl = await client.prisma.playlist.findUnique({
      where: { userId_name: { userId, name } } as any,
      select: { playlist_id: true },
    });

    if (!pl) {
      await interaction.editReply(`Playlist "${name}" not found or not owned by you.`);
      return;
    }

    // Delete the playlist. Tracks have FK with onDelete: Cascade, so they should be removed automatically.
    await client.prisma.playlist.delete({
      where: { userId_name: { userId, name } } as any,
    });

    await interaction.editReply(`Deleted playlist "${name}".`);
  } catch (err) {
    client.logger.error("slash /delete error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /delete." }); } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
