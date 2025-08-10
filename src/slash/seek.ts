import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("seek")
  .setDescription("Seek to a specific position in the current track")
  .addStringOption(opt =>
    opt.setName("to")
      .setDescription("Position to seek to, e.g. 1m 30s, 90s, 01:30, 1h 2m 3s")
      .setRequired(true),
  );

function parseTimeToMs(input: string): number | null {
  const s = input.trim().toLowerCase();

  // Support hh:mm:ss or mm:ss
  if (/^\d{1,2}:\d{1,2}(:\d{1,2})?$/.test(s)) {
    const parts = s.split(":").map((p) => parseInt(p, 10));
    if (parts.length === 2) {
      const [mm, ss] = parts;
      if (Number.isFinite(mm) && Number.isFinite(ss)) return (mm * 60 + ss) * 1000;
    } else if (parts.length === 3) {
      const [hh, mm, ss] = parts;
      if (Number.isFinite(hh) && Number.isFinite(mm) && Number.isFinite(ss)) {
        return (hh * 3600 + mm * 60 + ss) * 1000;
      }
    }
    return null;
  }

  // Support 90s, 2m, 1h, 1h 2m 3s, 1m 30s etc.
  const regex = /(?:(\d+)\s*h)?\s*(?:(\d+)\s*m)?\s*(?:(\d+)\s*s?)?/i;
  const m = s.match(regex);
  if (m) {
    const h = parseInt(m[1] ?? "0", 10);
    const min = parseInt(m[2] ?? "0", 10);
    const sec = parseInt(m[3] ?? "0", 10);
    const total = (h * 3600 + min * 60 + sec) * 1000;
    if (total > 0) return total;
  }

  // Support raw seconds as integer e.g., "95"
  if (/^\d+$/.test(s)) {
    return parseInt(s, 10) * 1000;
  }

  return null;
}

export const execute = withCommandLogging("seek", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const player = client.manager.getPlayer(interaction.guildId!);
    if (!player) {
      await interaction.editReply({ content: "No active player in this guild." });
      return;
    }

    const toRaw = interaction.options.getString("to", true);
    const positionMs = parseTimeToMs(toRaw);
    if (positionMs === null) {
      await interaction.editReply({ content: "Invalid time format. Try formats like 1m 30s, 90s, or 01:30." });
      return;
    }

    // Determine current track duration to cap seek
    const current =
      (player as any).queue?.current ??
      (player as any).nowPlaying ??
      (player as any).track ??
      null;

    const durationMs = current?.info?.length ?? current?.info?.duration ?? null;
    if (durationMs != null && positionMs > durationMs) {
      await interaction.editReply({ content: `Cannot seek beyond track duration (${Math.floor(durationMs / 1000)}s).` });
      return;
    }

    // Try common seek approaches
    // Some clients expose player.seek(ms)
    try {
      if (typeof (player as any).seek === "function") {
        await (player as any).seek(positionMs);
      } else if ((player as any).positions) {
        // Some expose a property or method to set position
        (player as any).positions = positionMs;
      } else {
        // Fallback: re-invoke play with position if supported by your client
        await player.play({ position: positionMs, paused: (player as any).paused ?? false } as any);
      }
    } catch (e) {
      client.logger.warn("seek fallback path error", e);
      // Final fallback: try play call again
      try {
        await player.play({ position: positionMs, paused: (player as any).paused ?? false } as any);
      } catch {
        await interaction.editReply({ content: "Failed to seek with the current player implementation." });
        return;
      }
    }

    await interaction.editReply({ content: `Seeked to ~${Math.floor(positionMs / 1000)}s.` });
  } catch (err) {
    client.logger.error("slash /seek error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /seek." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
