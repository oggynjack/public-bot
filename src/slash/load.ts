import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";

/**
 * Load a playlist (all tracks) into the current guild player queue.
 * It will enqueue in the current channel's guild using client.manager APIs.
 */
export const data = new SlashCommandBuilder()
  .setName("load")
  .setDescription("Load one of your playlists into the queue")
  .addStringOption(opt =>
    opt.setName("name")
      .setDescription("Name of your playlist")
      .setMinLength(1)
      .setMaxLength(50)
      .setRequired(true),
  );

export const execute = async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    if (!interaction.guildId) {
      await interaction.editReply("This command can only be used in a server.");
      return;
    }

    // Resolve invoking member's voice channel
    const voiceId =
      (interaction.member && "voice" in interaction.member && (interaction.member as any).voice?.channelId) ||
      (interaction.guild?.members?.me && (interaction.guild.members.me as any).voice?.channelId) ||
      null;
    if (!voiceId) {
      await interaction.editReply("Join a voice channel first.");
      return;
    }

    const userId = interaction.user.id;
    const name = interaction.options.getString("name", true).trim();

    const playlist = await client.prisma.playlist.findUnique({
      where: { userId_name: { userId, name } } as any,
      include: { tracks: true } as any,
    });

    if (!playlist) {
      await interaction.editReply(`Playlist "${name}" not found or not owned by you.`);
      return;
    }

    if (!playlist.tracks || playlist.tracks.length === 0) {
      await interaction.editReply(`Playlist "${name}" has no tracks to load.`);
      return;
    }

    // Create or get player
    let player = client.manager.getPlayer(interaction.guildId);
    if (!player) {
      // Create with options object as required by your PlayerOptions typing
      player = client.manager.createPlayer({
        guildId: interaction.guildId,
        textId: interaction.channelId,
        voiceId, // may be ignored by some implementations; we'll still connect below if needed
      } as any);
    }

    // Connect/join if necessary
    if (!player.connected && typeof (player as any).connect === "function") {
      await (player as any).connect(voiceId, interaction.channelId);
    } else if (!player.connected && typeof (client.manager as any).join === "function") {
      await (client.manager as any).join({
        guildId: interaction.guildId,
        voiceId,
        textId: interaction.channelId,
      });
    }

    // Enqueue tracks by searching URI or name
    let added = 0;
    for (const t of playlist.tracks) {
      try {
        const query = t.uri || t.name;
        if (!query) continue;

        // Some clients require a requester parameter (user) as second arg
        let res: any;
        if (typeof (player as any).search === "function") {
          try {
            res = await (player as any).search(query, interaction.user);
          } catch {
            res = await (player as any).search(query);
          }
        }

        const track = res?.tracks?.[0];
        if (!track) continue;

        // Different queue APIs: add/push/enqueue
        if (player.queue && typeof (player.queue as any).add === "function") {
          (player.queue as any).add(track);
          added++;
        } else if (player.queue && typeof (player.queue as any).push === "function") {
          (player.queue as any).push(track);
          added++;
        } else if (typeof (player as any).add === "function") {
          (player as any).add(track);
          added++;
        }
      } catch {
        // ignore individual failures and continue
      }
    }

    // Start playing if idle
    const qLen =
      (player.queue && typeof (player.queue as any).size === "number" && (player.queue as any).size) ||
      (player.queue && typeof (player.queue as any).length === "number" && (player.queue as any).length) ||
      0;

    if (!player.playing && !player.paused && qLen > 0 && typeof player.play === "function") {
      await player.play();
    }

    await interaction.editReply(`Loaded ${added}/${playlist.tracks.length} tracks from "${name}" into the queue.`);
  } catch (err) {
    client.logger.error("slash /load error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /load." }); } catch {}
  }
};

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
