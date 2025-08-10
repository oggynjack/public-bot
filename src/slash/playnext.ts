import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction, VoiceChannel } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import type { SearchResult } from "lavalink-client";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("playnext")
  .setDescription("Search or add a track/playlist to play next")
  .addStringOption(opt =>
    opt
      .setName("query")
      .setDescription("Keywords or URL of the track/playlist")
      .setRequired(true),
  );

export const execute = withCommandLogging("playnext", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);
    const guildId = interaction.guildId!;
    const guild = client.guilds.cache.get(guildId);
    const member = guild?.members.cache.get(interaction.user.id);
    const memberVoiceChannel = member?.voice.channel as VoiceChannel | undefined;

    const embed = new EmbedBuilder();

    if (!query) {
      await interaction.editReply({
        embeds: [embed.setColor(client.color.red).setDescription("No query provided.")],
      });
      return;
    }

    // Prepare or create player like legacy prefix command
    let player =
      client.manager.getPlayer(guildId) ||
      client.manager.createPlayer({
        guildId,
        voiceChannelId: memberVoiceChannel?.id ?? "",
        textChannelId: interaction.channelId,
        selfMute: false,
        selfDeaf: true,
        vcRegion: memberVoiceChannel?.rtcRegion || "",
      });

    if (!player.connected) await player.connect();

    const searchingMsg = await interaction.editReply("Searching...");

    try {
      const response = (await player.search({ query }, interaction.user)) as SearchResult;

      if (!response || !response.tracks || response.tracks.length === 0) {
        await interaction.editReply({
          content: "",
          embeds: [embed.setColor(client.color.red).setDescription("No results found.")],
        });
        return;
      }

      // Determine tracks to add (playlist -> all; otherwise first track)
      const tracksToAdd =
        (response as any).loadType === "playlist" ? response.tracks : [response.tracks[0]];

      // Insert at the beginning of the upcoming queue (play NEXT)
      // Prefer queue.splice if available
      const anyP = player as any;
      if (typeof anyP.queue?.splice === "function") {
        await anyP.queue.splice(0, 0, ...tracksToAdd);
      } else if (Array.isArray(anyP.queue?.tracks)) {
        anyP.queue.tracks.splice(0, 0, ...tracksToAdd);
      } else if (Array.isArray(anyP.queue)) {
        anyP.queue.unshift(...tracksToAdd);
      } else {
        // Fallback: ensure tracks array exists
        if (!anyP.queue) anyP.queue = { tracks: [] };
        if (!Array.isArray(anyP.queue.tracks)) anyP.queue.tracks = [];
        anyP.queue.tracks.splice(0, 0, ...tracksToAdd);
      }

      // Build confirmation similar to legacy; keep link only if result was a single track
      let description: string;
      if ((response as any).loadType === "playlist") {
        description = `Added ${response.tracks.length} tracks to play next.`;
      } else {
        const t = response.tracks[0];
        const title = t.info.title ?? "Unknown title";
        const uri = t.info.uri ?? "";
        // In general we avoid links, but legacy confirmed added.track with link; keep as plain text to stay consistent across slash
        description = `Added to queue (next): ${title}`;
        // If you want to preserve a link here to mirror legacy exactly, uncomment the next line:
        // description = `Added to queue (next): [${title}](${uri})`;
      }

      await interaction.editReply({
        content: "",
        embeds: [embed.setColor(client.color.main).setDescription(description)],
      });

      if (!player.playing) await player.play({ paused: false });
    } catch (e) {
      client.logger.error("slash /playnext search or queue error", e);
      await interaction.editReply({
        content: "",
        embeds: [embed.setColor(client.color.red).setDescription("An error occurred.")],
      });
    }
  } catch (err) {
    client.logger.error("slash /playnext error", err);
    try {
      await interaction.editReply({ content: "An error occurred while executing /playnext." });
    } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
