import type ExtendedClient from "@/classes/ExtendedClient";
import type { Player, Track } from "lavalink-client";
import { SimpleAutoAI } from "@/services/SimpleAutoAI";

/**
 * FeederService:
 * - When 24/7 mode is enabled on a player, keep queue size >= 10 by adding related tracks.
 * - When autoplay is enabled (and 24/7 is not), keep queue size >= 8.
 * - Reacts to skip/skipto by adding the same number of related tracks to upcoming.
 * - Enhances selection using language, artist, genre, mood, vibe.
 */
export class FeederService {
  private client: ExtendedClient;
  // Track background feeders per guild to avoid multiple concurrent loops
  private feeders: Map<string, NodeJS.Timeout>;

  constructor(client: ExtendedClient) {
    this.client = client;
    this.feeders = new Map();
  }

  /**
   * Call when a player is created or when toggling 24/7/autoplay to start/adjust feeder.
   */
  public startFeeder(player: Player) {
    const guildId = player.guildId;
    this.stopFeeder(player);

    const loop = async () => {
      try {
        await this.fillIfNeeded(player);
      } catch (e) {
        this.client.logger?.warn?.("FeederService loop error", e as any);
      }
    };

    // Run immediately and then on interval
    void loop();
    const handle = setInterval(loop, 15_000); // every 15 seconds
    this.feeders.set(guildId, handle);
  }

  /**
   * Call when playback stops entirely or bot disconnects to stop feeder.
   */
  public stopFeeder(player: Player) {
    const guildId = player.guildId;
    const h = this.feeders.get(guildId);
    if (h) {
      clearInterval(h);
      this.feeders.delete(guildId);
    }
  }

  /**
   * React to skip actions to prepare N related upcoming tracks.
   */
  public async onSkip(player: Player, skippedCount: number) {
    try {
      if (skippedCount <= 0) return;
      await this.addRelated(player, skippedCount);
    } catch (e) {
      this.client.logger?.warn?.("FeederService onSkip error", e as any);
    }
  }

  /**
   * Core: ensure queue has a minimum length depending on mode.
   */
  private async fillIfNeeded(player: Player) {
    const anyP = player as any;

    // Resolve current queue length
    let qLen = 0;
    try {
      if (Array.isArray(anyP.queue?.tracks)) qLen = anyP.queue.tracks.length;
      else if (Array.isArray(anyP.queue)) qLen = anyP.queue.length;
      else if (typeof anyP.queue?.size === "number") qLen = anyP.queue.size;
    } catch {}

    // Determine thresholds
    const is247 = Boolean(anyP.__247Mode);
    const autoplayEnabled = Boolean(anyP.__autoplay || anyP.autoplay || anyP.get?.("autoplay"));
    const minSize = is247 ? 10 : (autoplayEnabled ? 8 : 0);

    if (minSize <= 0) return; // no feeding if neither 24/7 nor autoplay thresholds apply

    if (qLen >= minSize) return;

    // Compute how many to add
    const need = Math.max(0, minSize - qLen);
    if (need <= 0) return;

    await this.addRelated(player, need);
  }

  /**
   * Add N related tracks based on currently playing track and AI hints.
   */
  private async addRelated(player: Player, count: number) {
    if (!count) return;

    const current: Track | null = (player as any).current || (player as any).queue?.current || null;

    // Fall back to first in queue if available
    let seed: Track | null = current;
    if (!seed) {
      try {
        const t = (player as any).queue?.tracks?.[0] ?? (Array.isArray((player as any).queue) ? (player as any).queue[0] : null);
        if (t) seed = t;
      } catch {}
    }

    // If still no seed, nothing to derive from
    if (!seed?.info?.title) return;

    const title = seed.info.title;
    const author = seed.info.author ?? "";
    const isrc = (seed.info as any)?.isrc ?? "";
    const uri = seed.info.uri ?? "";

    // Build enriched hint object
    const hints = {
      title,
      author,
      isrc,
      uri,
      // Extendable hints - language/genre/mood/vibe detection done in SimpleAutoAI
      // We pass raw features; downstream AI derives details
      meta: {
        // Potentially parse language from title/author; let AI handle final inference
        title,
        artist: author,
      },
    };

    // Use SimpleAutoAI to generate candidates
    const ai = new SimpleAutoAI(this.client);
    let candidates: string[] = [];
    try {
      // Use existing API and enrich the query by combining title/author/metadata to bias language/artist/genre/mood/vibe
      const baseSeeds = [
        `${title} ${author} official`,
        `${title} ${author} remix`,
        `${author} hits`,
        `${title} live`,
        `${author} ${title} cover`,
      ];

      // Ask SimpleAutoAI for suggestions using title as primary key and include requester/guild context
      const requesterId =
        (seed as any)?.requester?.id ??
        (seed as any)?.requester ??
        "";
      const guildId: string = (player as any).guildId ?? "";

      const aiList = await ai.getAutoSuggestions(title, requesterId, guildId);
      const fused = [...aiList, ...baseSeeds];

      // Prefer unique and non-empty suggestions
      candidates = Array.from(new Set(fused.filter(Boolean)));
    } catch (e) {
      this.client.logger?.warn?.("FeederService AI suggestions failed; fallback to ytsearch:*", e as any);
      // Simple fallback: derive from title + author
      candidates = [
        `${title} ${author} official`,
        `${title} ${author} remix`,
        `${author} hits`,
        `${title} live`,
        `${author} ${title} cover`,
      ];
    }

    // Deduplicate and trim to requested count with some oversampling for misses
    const uniq = Array.from(new Set(candidates.filter(Boolean)));
    const toTry = uniq.slice(0, Math.max(count * 3, count)); // oversample search attempts

    let added = 0;
    for (const suggestion of toTry) {
      if (added >= count) break;

      try {
        const res = await (player as any).search?.({ query: `ytsearch:${suggestion}` }, (seed as any).requester) ??
                    await this.client.search.search(player, { query: `ytsearch:${suggestion}` }, (seed as any).requester);
        if (res?.tracks?.length) {
          // Add first track result
          await player.queue.add(res.tracks[0]);
          added++;
          // Log AI activity
          try {
            ai.logActivity(player.guildId, "Feeder Add", `Queued: ${res.tracks[0].info.title}`);
          } catch {}
        }
      } catch (e) {
        this.client.logger?.warn?.("FeederService failed to add suggestion", { suggestion, error: (e as any)?.message });
      }
    }
  }
}

export default FeederService;
