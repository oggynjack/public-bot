import type { ChatInputCommandInteraction } from "discord.js";

export type SlashExecute = (interaction: ChatInputCommandInteraction, ...rest: any[]) => Promise<any> | any;

/**
 * Wrap a slash command execute function to log invocation details to console.
 * Logs:
 * - timestamp (ISO)
 * - guildId, channelId, userId
 * - command name
 * - options as JSON (key -> value)
 * - start/end time and duration ms
 * - outcome: success/error with message
 */
export function withCommandLogging<T extends SlashExecute>(name: string, fn: T): T {
  const wrapped = (async (interaction: ChatInputCommandInteraction, ...rest: any[]) => {
    const started = Date.now();
    const ts = new Date(started).toISOString();

    // Serialize options to a simple key->value object
    const opts: Record<string, unknown> = {};
    try {
      const resolved = interaction.options as any;
      if (typeof resolved?.data?.forEach === "function") {
        resolved.data.forEach((o: any) => {
          if (!o) return;
          opts[o.name] = o.value ?? null;
        });
      } else {
        // Fallback: read common getters for small sets
        // Note: not enumerating all option names; this is a fallback path
      }
    } catch {
      // ignore option parse errors
    }

    const common = {
      ts,
      guildId: interaction.guildId ?? null,
      channelId: interaction.channelId ?? null,
      userId: interaction.user?.id ?? null,
      command: name,
      options: opts,
    };

    try {
      // Pre-invoke log
      console.log(`[CMD] ▶ ${name}`, common);

      const res = await fn(interaction, ...rest);

      const ended = Date.now();
      const duration = ended - started;
      console.log(`[CMD] ✅ ${name} done in ${duration}ms`, { ...common, duration });

      return res;
    } catch (err: any) {
      const ended = Date.now();
      const duration = ended - started;
      const msg = err?.message ?? String(err);
      console.warn(`[CMD] ❌ ${name} failed in ${duration}ms`, { ...common, duration, error: msg });
      throw err;
    }
  }) as T;

  return wrapped;
}
