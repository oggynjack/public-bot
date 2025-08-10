import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

/**
 * Create a playlist owned by the invoker. Uses composite unique (userId, name).
 */
export const data = new SlashCommandBuilder()
  .setName("create")
  .setDescription("Create a new playlist")
  .addStringOption(opt =>
    opt.setName("name")
      .setDescription("Playlist name (unique per user)")
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(true))
  .addBooleanOption(opt =>
    opt.setName("private")
      .setDescription("Whether the playlist is private (default false)")
      .setRequired(false));

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const userId = interaction.user.id;
    const name = interaction.options.getString("name", true).trim();
    const isPrivate = interaction.options.getBoolean("private", false) ?? false;

    // Check if already exists
    const existing = await client.prisma.playlist.findUnique({
      where: { userId_name: { userId, name } } as any,
      select: { playlist_id: true },
    });

    if (existing) {
      await interaction.editReply(`A playlist named "${name}" already exists for you.`);
      return;
    }

    await client.prisma.playlist.create({
      data: {
        userId,
        name,
        private: isPrivate,
      } as any,
    });

    await interaction.editReply(`Created playlist "${name}" ${isPrivate ? "(private)" : ""}.`);
  } catch (err) {
    client.logger.error("slash /create error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /create." }); } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
