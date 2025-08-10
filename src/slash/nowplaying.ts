import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import { createButtonRow } from "@/functions/createButtonRow";

export const data = new SlashCommandBuilder()
  .setName("nowplaying")
  .setDescription("Show the currently playing track");

export const execute = withCommandLogging("nowplaying", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      const embed = new EmbedBuilder()
        .setColor(client.color.red)
        .setDescription("❌ No active player in this guild.");
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    // Try to get the current/now playing track from common properties
    const now =
      (player as any).queue?.current ??
      (player as any).nowPlaying ??
      (player as any).track ??
      null;

    if (!now?.info) {
      const embed = new EmbedBuilder()
        .setColor(client.color.red)
        .setDescription("❌ No track is currently playing.");
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    const info = now.info;
    const title = info.title ?? "Unknown title";
    const author = info.author ?? "Unknown author";
    const durationMs = info.length ?? info.duration ?? 0;

    const fmt = (ms: number) => {
      if (!ms || ms < 0) return "LIVE";
      const s = Math.floor(ms / 1000);
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      return h > 0 ? `${h}:${m.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}` : `${m}:${sec.toString().padStart(2,"0")}`;
    };

    // Get premium tier information
    const userTier = await client.premium.getEffectiveTier(interaction.user.id, interaction.guildId!);
    const tierEmoji = userTier === "premiumplus" ? "⭐" : userTier === "premium" ? "✨" : "🆓";
    const tierName = userTier === "premiumplus" ? "Premium Plus" : userTier === "premium" ? "Premium" : "Free";

    const embed = new EmbedBuilder()
      .setColor(client.color.main)
      .setTitle(`🎵 Now Playing ${tierEmoji}`)
      .addFields(
        { name: "Track", value: title, inline: true },
        { name: "Artist", value: author, inline: true },
        { name: "Duration", value: `\`${fmt(durationMs)}\``, inline: true },
        { name: "Requested by", value: `<@${info.requester ?? interaction.user.id}>`, inline: true },
        { name: "Server Tier", value: `${tierEmoji} ${tierName}`, inline: true },
        { name: "\u200b", value: "\u200b", inline: true }
      )
      .setTimestamp();

    const reply = await interaction.editReply({ embeds: [embed] });

    // Note: Removed auto-clear timeout to prevent interaction token expiration errors
    // The message will remain visible until manually cleared or bot restart

  } catch (err) {
    client.logger.error("slash /nowplaying error", err);
    const errorEmbed = new EmbedBuilder()
      .setColor(client.color.red)
      .setDescription("❌ An error occurred while showing now playing.");
    try { await interaction.editReply({ embeds: [errorEmbed] }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
