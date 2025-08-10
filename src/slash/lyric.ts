import type ExtendedClient from "@/classes/ExtendedClient";
import type {
  ChatInputCommandInteraction,
  ButtonInteraction,
} from "discord.js";
import {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import axios from "axios";
import * as cheerio from "cheerio";
import _ from "lodash";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("lyric")
  .setDescription("Fetch lyrics for the current track or a specified song")
  .addStringOption(opt =>
    opt
      .setName("song")
      .setDescription("Song name to search lyrics for (defaults to current track)")
      .setRequired(false),
  );

export const execute = withCommandLogging("lyric", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  if (!process.env.GENIUS_ACCESS_TOKEN) {
    return interaction.reply({
      content: "Lyrics feature is disabled (missing GENIUS access token).",
      ephemeral: true
    });
  }
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    // Resolve current track title or provided song argument
    const argTitle = interaction.options.getString("song", false)?.trim();
    const currentInfo: any =
      (player as any).queue?.current?.info ??
      (player as any).nowPlaying?.info ??
      (player as any).track?.info ??
      null;

    if (!argTitle && !currentInfo?.title) {
      await interaction.editReply({ content: "No track title available to search lyrics for." });
      return;
    }

    const trackTitle = (argTitle ?? String(currentInfo.title)).trim();

    // Send "searching..." feedback first (mirrors prefix UX)
    await interaction.editReply("Searching...");

    try {
      const data = await getLyricsArray(trackTitle);
      const embed = new EmbedBuilder();

      if (data && Array.isArray(data.lyrics) && data.lyrics.length > 0) {
        let currentPage = 0;

        const prev = new ButtonBuilder()
          .setCustomId("lyric_prev")
          .setEmoji(client.emoji?.page?.back ?? "◀️")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true);

        const next = new ButtonBuilder()
          .setCustomId("lyric_next")
          .setEmoji(client.emoji?.page?.next ?? "▶️")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(data.lyrics.length <= 1);

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(prev, next);

        await interaction.editReply({
          embeds: [
            embed
              .setAuthor({
                name: trackTitle,
                iconURL: client.user?.displayAvatarURL() ?? undefined,
              })
              .setDescription(`**${data.lyrics[currentPage]}**`)
              .setThumbnail(data.thumbnail ?? null)
              .setFooter({
                text: `@${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL(),
              })
              .setColor(client.color.main)
              .setTimestamp(),
          ],
          components: [row],
        });

        const message = await interaction.fetchReply();

        const collector = (message as any).createMessageComponentCollector({
          filter: (i: ButtonInteraction) =>
            i.user.id === interaction.user.id &&
            (i.customId === "lyric_prev" || i.customId === "lyric_next"),
          time: 60_000,
        });

        collector.on("collect", async (i: ButtonInteraction) => {
          try {
            if (i.customId === "lyric_prev") currentPage--;
            if (i.customId === "lyric_next") currentPage++;

            await i.update({
              embeds: [
                embed
                  .setDescription(`**${data.lyrics[currentPage]}**`)
                  .setTimestamp(),
              ],
              components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                  prev.setDisabled(currentPage === 0),
                  next.setDisabled(currentPage === data.lyrics.length - 1),
                ),
              ],
            });
          } catch {}
        });

        collector.on("end", async (collected: any, reason: string) => {
          // Only try to update if the interaction is still valid and not expired
          if (reason === "time") {
            try {
              await interaction.editReply({
                components: [
                  new ActionRowBuilder<ButtonBuilder>().addComponents(
                    prev.setDisabled(true),
                    next.setDisabled(true),
                  ),
                ],
              });
            } catch {}
          }
        });
      } else {
        await interaction.editReply({
          content: "",
          embeds: [embed.setColor(client.color.red).setDescription("No results found.")],
          components: [],
        });
      }
    } catch (e) {
      client.logger.error("slash /lyric error", e);
      await interaction.editReply({
        content: "",
        embeds: [new EmbedBuilder().setColor(client.color.red).setDescription("An error occurred.")],
      });
    }
  } catch (err) {
    client.logger.error("slash /lyric error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /lyric." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}

// Utilities (ported from prefix logic)
const getSongs = async (songTitle: string) => {
  const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}`;
  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`,
    },
  });

  const data = response?.data?.response?.hits;
  if (!data || data.length <= 0) return null;
  return data[0].result;
};

const getLyricsArray = async (songTitle: string) => {
  const songData = await getSongs(songTitle);
  if (!songData) return null;

  const { data } = await axios.get(songData.url);
  const $ = cheerio.load(data);

  const lyricsArray: string[] = [];
  $('div[data-lyrics-container="true"]').each((i, elem) => {
    const lyricLines = $(elem).text();
    lyricsArray.push(
      _.join(
        _.split(lyricLines, /(?=\[)/).map((line: string) =>
          line.replace(/(\[.*?\])/g, "$1\n").trim(),
        ),
        "\n\n",
      ),
    );
  });

  return {
    lyrics: lyricsArray,
    thumbnail: songData.header_image_url as string | undefined,
  };
};
