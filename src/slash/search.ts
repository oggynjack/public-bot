import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction, StringSelectMenuInteraction } from "discord.js";
import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import type { SearchResult } from "lavalink-client";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search for a track and select one to queue")
  .addStringOption(opt =>
    opt
      .setName("query")
      .setDescription("Keywords to search for")
      .setRequired(true),
  );

export const execute = withCommandLogging("search", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);
    const guildId = interaction.guildId!;
    const guild = client.guilds.cache.get(guildId);
    const member = guild?.members.cache.get(interaction.user.id);
    const memberVc = member?.voice.channel;

    if (!memberVc) {
      await interaction.editReply({ content: "You must join a voice channel first." });
      return;
    }

    // Ensure player exists/connected similarly to prefix behavior
    let player =
      client.manager.getPlayer(guildId) ||
      client.manager.createPlayer({
        guildId,
        voiceChannelId: memberVc?.id ?? "",
        textChannelId: interaction.channelId,
        selfMute: false,
        selfDeaf: true,
        vcRegion: ((memberVc as any)?.rtcRegion ?? undefined) as any,
      });

    if (!player.connected) await player.connect();

    const embed = new EmbedBuilder().setColor(client.color.main);

    // YouTube-only search for testing
    const isUrl = /^(https?:\/\/)/i.test(query);
    const hasPrefix = /^(ytmsearch:|ytsearch:|scsearch:|spsearch:)/i.test(query);
    
    let searchQuery = query;
    if (!isUrl && !hasPrefix) {
      // Force YouTube search only
      searchQuery = `ytsearch:${query}`;
    }

    // Perform search
    let response = (await player.search({ query: searchQuery }, interaction.user)) as SearchResult;

    if (!response || response.tracks.length === 0) {
      await interaction.editReply({
        embeds: [embed.setDescription("No results found on any platform.").setColor(client.color.red)],
      });
      return;
    }

    // Build selection list using links (allowed for search only)
    const selectMenu = new StringSelectMenuBuilder({
      custom_id: "search_select",
      placeholder: "Select a track to queue",
    });

    const lines: string[] = [];
    response.tracks.forEach((track, index) => {
      const title = track.info.title ?? "Unknown title";
      const uri = track.info.uri ?? "";
      const author = track.info.author ?? "Unknown";
      const durMs = (typeof track.info.duration === "number" ? track.info.duration : (track.info as any).length) ?? 0;
      const fmt = (ms: number) => {
        if (!ms || ms < 0) return "LIVE";
        const s = Math.floor(ms / 1000);
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}` : `${m}:${sec.toString().padStart(2, "0")}`;
      };

      // Keep links in search only (per user direction)
      lines.push(`${index + 1}. [${title}](${uri}) - \`${author}\` • ${fmt(durMs)}`);

      selectMenu.addOptions(
        new StringSelectMenuOptionBuilder({
          label: title.slice(0, 100),
          value: index.toString(),
          description: fmt(durMs),
        }),
      );
    });

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

    const msg = await interaction.editReply({
      embeds: [embed.setDescription(lines.join("\n"))],
      components: [row],
    });

    // Create collector for 60 seconds for the user who triggered the command
    const message = await interaction.fetchReply();
    const collector = (message as any).createMessageComponentCollector({
      filter: (i: StringSelectMenuInteraction) =>
        i.user.id === interaction.user.id && i.customId === "search_select",
      max: 1,
      time: 60_000,
    });

    collector.on("collect", async (i: StringSelectMenuInteraction) => {
      try {
        await i.deferUpdate();
      } catch {}

      const index = parseInt(i.values[0], 10);
      const track = response.tracks[index];
      if (!track) return;

      // Premium/limit checks are handled elsewhere in prefix; keep queue length guard minimal if needed
      try {
        // Add to queue and start if not playing
        player.queue.add(track);
        if (!player.playing) await player.play({ paused: false });

        await interaction.editReply({
          embeds: [
            embed.setDescription(
              `🎵 Added to queue: **${track.info.title}**`,
            ),
          ],
          components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu.setDisabled(true))],
        });
      } catch (e) {
        client.logger.warn("search selection failed", e);
        try {
          await interaction.editReply({
            embeds: [embed.setDescription("Failed to add the selected track.").setColor(client.color.red)],
            components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu.setDisabled(true))],
          });
        } catch {}
      }
    });

    collector.on("end", async (collected: any, reason: string) => {
      // Only try to update if the interaction is still valid and we haven't processed a selection
      if (reason === "time" && collected.size === 0) {
        try {
          await interaction.editReply({
            components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu.setDisabled(true))],
          });
        } catch {}
      }
    });
  } catch (err) {
    client.logger.error("slash /search error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /search." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
