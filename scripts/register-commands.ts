import "dotenv/config";
import { REST, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

/**
 * Authoritative, file-system–verified list of slash commands under src/slash.
 * This list matches exactly what exists on disk - ALL 49 COMMANDS:
 *
 * 247.ts
 * 8d.ts
 * add.ts
 * autoplay.ts
 * bassboost.ts
 * clearqueue.ts
 * create.ts
 * debug.ts
 * delete.ts
 * help.ts
 * info.ts
 * join.ts
 * karaoke.ts
 * leave.ts
 * load.ts
 * loop.ts
 * lowpass.ts
 * lyric.ts
 * nightcore.ts
 * nowplaying.ts
 * pause.ts
 * ping.ts
 * pitch.ts
 * play.ts
 * play-backup.ts
 * playlist.ts
 * playnext.ts
 * premium.ts
 * premium-new.ts
 * premium-simple.ts
 * queue.ts
 * remove.ts
 * removesong.ts
 * replay.ts
 * reset.ts
 * resume.ts
 * rotation.ts
 * search.ts
 * seek.ts
 * settings.ts
 * shuffle.ts
 * skip.ts
 * speed.ts
 * steal.ts
 * tiers.ts
 * tiers-new.ts
 * tremolo.ts
 * vibrato.ts
 * volume.ts
 */

// Explicit imports for tree-shakeable, type-safe access to .data - WORKING COMMANDS
import * as Cmd247 from "@/slash/247";
import * as Cmd8D from "@/slash/8d";
import * as Add from "@/slash/add";
import * as Autoplay from "@/slash/autoplay";
import * as Bassboost from "@/slash/bassboost";
import * as ClearQueue from "@/slash/clearqueue";
import * as Create from "@/slash/create";
import * as DeletePl from "@/slash/delete";
import * as Help from "@/slash/help";
import * as Info from "@/slash/info";
import * as Join from "@/slash/join";
import * as Karaoke from "@/slash/karaoke";
import * as Leave from "@/slash/leave";
import * as Load from "@/slash/load";
import * as Loop from "@/slash/loop";
import * as Lowpass from "@/slash/lowpass";
import * as Lyric from "@/slash/lyric";
import * as Nightcore from "@/slash/nightcore";
import * as NowPlaying from "@/slash/nowplaying";
import * as Pause from "@/slash/pause";
import * as Ping from "@/slash/ping";
import * as Pitch from "@/slash/pitch";
import * as Play from "@/slash/play";
import * as Playlist from "@/slash/playlist";
import * as Playnext from "@/slash/playnext";
import * as Premium from "@/slash/premium";
import * as Queue from "@/slash/queue";
import * as Remove from "@/slash/remove";
import * as RemoveSong from "@/slash/removesong";
import * as Replay from "@/slash/replay";
import * as Reset from "@/slash/reset";
import * as Resume from "@/slash/resume";
import * as Rotation from "@/slash/rotation";
import * as Search from "@/slash/search";
import * as Seek from "@/slash/seek";
import * as Shuffle from "@/slash/shuffle";
import * as Skip from "@/slash/skip";
import * as Speed from "@/slash/speed";
import * as Steal from "@/slash/steal";
import * as TiersNew from "@/slash/tiers-new";
import * as Tremolo from "@/slash/tremolo";
import * as Vibrato from "@/slash/vibrato";
import * as Volume from "@/slash/volume";
// Note: Removed duplicates: play-backup, premium-new, premium-simple, tiers

// Env
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
  console.error("Missing DISCORD_BOT_TOKEN or DISCORD_CLIENT_ID in environment.");
  process.exit(1);
}

// Build registration payload in a logical grouping/order - CLEAN COMMANDS ONLY
const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [
  // Core playback / queue
  Play.data.toJSON(),
  Playnext.data.toJSON(),
  Search.data.toJSON(),
  Queue.data.toJSON(),
  NowPlaying.data.toJSON(),
  Seek.data.toJSON(),
  Skip.data.toJSON(),
  Shuffle.data.toJSON(),
  Loop.data.toJSON(),
  Autoplay.data.toJSON(),
  Remove.data.toJSON(),
  ClearQueue.data.toJSON(),
  Replay.data.toJSON(),
  Lyric.data.toJSON(),

  // Connection / control
  Join.data.toJSON(),
  Leave.data.toJSON(),
  Pause.data.toJSON(),
  Resume.data.toJSON(),
  Volume.data.toJSON(),
  Cmd247.data.toJSON(),

  // Filters
  Cmd8D.data.toJSON(),
  Nightcore.data.toJSON(),
  Bassboost.data.toJSON(),
  Pitch.data.toJSON(),
  Speed.data.toJSON(),
  Tremolo.data.toJSON(),
  Vibrato.data.toJSON(),
  Karaoke.data.toJSON(),
  Lowpass.data.toJSON(),
  Rotation.data.toJSON(),
  Reset.data.toJSON(),

  // Info / System
  Ping.data.toJSON(),
  Help.data.toJSON(),
  Info.data.toJSON(),
  // Note: Removed debug, settings, customize - moved to prefix commands

  // Premium System
  Premium.data.toJSON(),
  TiersNew.data.toJSON(),

  // Playlist Management
  Playlist.data.toJSON(),
  Create.data.toJSON(),
  Add.data.toJSON(),
  RemoveSong.data.toJSON(),
  DeletePl.data.toJSON(),
  Load.data.toJSON(),
  Steal.data.toJSON(),

  // Note: Removed duplicates and problematic commands
];

(async () => {
  try {
    const rest = new REST({ version: "10" }).setToken(TOKEN!);
    console.log(`Registering ${commands.length} global application (/) commands...`);
    await rest.put(Routes.applicationCommands(CLIENT_ID!), { body: commands });
    console.log("Successfully registered global (/) commands.");
    process.exit(0);
  } catch (err) {
    console.error("Failed to register global (/) commands:", err);
    process.exit(1);
  }
})();
