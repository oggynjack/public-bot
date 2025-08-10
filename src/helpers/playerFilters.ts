import type ExtendedClient from "@/classes/ExtendedClient";

type AnyPlayer = any;

export type FilterPayload = Record<string, any>;

const logPrefix = "[playerFilters]";

/**
 * Try to apply filters in a library-agnostic way, with diagnostics.
 * Always tries to trigger an update call if available.
 * Returns a string path name describing which method succeeded, or "stored-fallback".
 */
export async function applyFilters(client: ExtendedClient, player: AnyPlayer, payload: FilterPayload): Promise<string> {
  const p = player as AnyPlayer;
  const methodsTried: string[] = [];

  // 1) filterManager.set / update
  try {
    if (p.filterManager?.set || p.filterManager?.update) {
      methodsTried.push("filterManager.set/update");
      if (typeof p.filterManager.set === "function") {
        await p.filterManager.set(payload);
      } else {
        await p.filterManager.update?.(payload);
      }
      await tryUpdate(client, p, "after filterManager.set/update");
      client.logger.debug?.(`${logPrefix} used filterManager.set/update`, { payload });
      return "filterManager";
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} filterManager.set/update failed`, e);
  }

  // 2) player.updateFilters
  try {
    if (typeof p.updateFilters === "function") {
      methodsTried.push("player.updateFilters");
      await p.updateFilters(payload);
      await tryUpdate(client, p, "after player.updateFilters");
      client.logger.debug?.(`${logPrefix} used player.updateFilters`, { payload });
      return "player.updateFilters";
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} player.updateFilters failed`, e);
  }

  // 3) player.setFilters
  try {
    if (typeof p.setFilters === "function") {
      methodsTried.push("player.setFilters");
      await p.setFilters(payload);
      await tryUpdate(client, p, "after player.setFilters");
      client.logger.debug?.(`${logPrefix} used player.setFilters`, { payload });
      return "player.setFilters";
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} player.setFilters failed`, e);
  }

  // 4) node.rest.filters (common in some clients)
  try {
    const guildId = p.guildId ?? p.guild?.id ?? null;
    if (guildId && p.node?.rest?.filters) {
      methodsTried.push("node.rest.filters");
      await p.node.rest.filters(guildId, payload);
      await tryUpdate(client, p, "after node.rest.filters");
      client.logger.debug?.(`${logPrefix} used node.rest.filters`, { payload });
      return "node.rest.filters";
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} node.rest.filters failed`, e);
  }

  // 5) Fallback: store on filters property + call update if exists
  try {
    methodsTried.push("fallback:assign->filters + update");
    if (p.filters && typeof p.filters === "object") {
      Object.assign(p.filters, payload);
    } else {
      p.filters = payload;
    }
    await tryUpdate(client, p, "after fallback assign");
    client.logger.debug?.(`${logPrefix} fallback assigned filters + update`, { payload });
    return "stored-fallback";
  } catch (e) {
    client.logger.warn?.(`${logPrefix} fallback assign failed`, e);
  }

  // 6) Last resort: attempt play(...) nudge if the client supports mutating filters via play
  try {
    methodsTried.push("fallback:play-nudge");
    if (typeof p.play === "function") {
      await p.play({ filters: payload, position: p.position ?? 0, paused: !!p.paused });
      client.logger.debug?.(`${logPrefix} used play(...) nudge`, { payload });
      return "play-nudge";
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} play-nudge failed`, e);
  }

  client.logger.error?.(`${logPrefix} all apply paths failed`, { tried: methodsTried, payload });
  return "none";
}

/**
 * Reset filters in a robust way.
 * - Try filterManager.reset()/clear()/clearEQ()
 * - Then apply empty payload to clear
 * - Attempt update call
 * Returns a string path used.
 */
export async function resetFilters(client: ExtendedClient, player: AnyPlayer): Promise<string> {
  const p = player as AnyPlayer;
  const tried: string[] = [];

  // 1) filterManager reset/clear
  try {
    if (p.filterManager) {
      if (typeof p.filterManager.resetFilters === "function") {
        tried.push("filterManager.resetFilters");
        await p.filterManager.resetFilters();
        await tryUpdate(client, p, "after filterManager.resetFilters");
        client.logger.debug?.(`${logPrefix} used filterManager.resetFilters`);
        return "filterManager.resetFilters";
      }
      if (typeof p.filterManager.clear === "function") {
        tried.push("filterManager.clear");
        await p.filterManager.clear();
        await tryUpdate(client, p, "after filterManager.clear");
        client.logger.debug?.(`${logPrefix} used filterManager.clear`);
        return "filterManager.clear";
      }
      if (typeof p.filterManager.clearEQ === "function") {
        tried.push("filterManager.clearEQ");
        await p.filterManager.clearEQ();
        await tryUpdate(client, p, "after filterManager.clearEQ");
        client.logger.debug?.(`${logPrefix} used filterManager.clearEQ`);
        // continue to also clear other filters with empty payload
      }
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} filterManager reset path failed`, e);
  }

  // 2) Apply empty payload to clear
  try {
    tried.push("applyFilters(empty)");
    const res = await applyFilters(client, p, {});
    client.logger.debug?.(`${logPrefix} applied empty payload via ${res}`);
    return `empty:${res}`;
  } catch (e) {
    client.logger.warn?.(`${logPrefix} apply empty payload failed`, e);
  }

  client.logger.error?.(`${logPrefix} reset failed`, { tried });
  return "none";
}

/**
 * Try various update hooks after changing filters.
 */
async function tryUpdate(client: ExtendedClient, p: AnyPlayer, reason: string) {
  // 1) Preferred: player.updateFilters()
  try {
    if (typeof p.updateFilters === "function") {
      await p.updateFilters();
      client.logger.debug?.(`${logPrefix} updateFilters() ${reason}`);
      return;
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} updateFilters() failed ${reason}`, e);
  }

  // 2) Alternative: player.filters.apply()
  try {
    if (typeof p.filters?.apply === "function") {
      await p.filters.apply();
      client.logger.debug?.(`${logPrefix} filters.apply() ${reason}`);
      return;
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} filters.apply() failed ${reason}`, e);
  }

  // 3) filterManager.update()
  try {
    if (typeof p.filterManager?.update === "function") {
      await p.filterManager.update();
      client.logger.debug?.(`${logPrefix} filterManager.update() ${reason}`);
      return;
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} filterManager.update() failed ${reason}`, e);
  }

  // 4) Fallback: send empty filters payload directly to Lavalink
  try {
    const gid = p.guildId ?? p.guild?.id;
    if (gid && typeof p.node?.send === "function") {
      p.node.send({
        op: "filters",
        guildId: gid,
        // Explicitly clear filters by sending no filters body
      });
      client.logger.debug?.(`${logPrefix} sent empty filters payload via node.send ${reason}`);
      return;
    }
  } catch (e) {
    client.logger.warn?.(`${logPrefix} node.send empty filters payload failed ${reason}`, e);
  }
}
