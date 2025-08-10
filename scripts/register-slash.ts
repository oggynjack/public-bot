/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";
import fs from "fs";
import path from "path";
import { REST, Routes, SlashCommandBuilder } from "discord.js";

// Config from env
const TOKEN = process.env.DISCORD_TOKEN || process.env.TOKEN || process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID || process.env.CLIENT_ID || process.env.APPLICATION_ID || process.env.DISCORD_BOT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID || process.env.GUILD_ID; // optional for guild-scoped registration
const FORCE_GLOBAL = process.env.FORCE_GLOBAL === 'true';

if (!TOKEN) {
  console.error("Missing DISCORD_TOKEN/TOKEN in .env");
  process.exit(1);
}
if (!CLIENT_ID) {
  console.error("Missing DISCORD_CLIENT_ID/CLIENT_ID/APPLICATION_ID in .env");
  process.exit(1);
}

// Discover slash commands
const slashDir = path.resolve(process.cwd(), "src", "slash");
if (!fs.existsSync(slashDir)) {
  console.error("Slash directory not found at:", slashDir);
  process.exit(1);
}

type SlashModule = { data?: SlashCommandBuilder; default?: any };

const commands: any[] = [];
const files = fs
  .readdirSync(slashDir)
  .filter((f) => f.endsWith(".ts") || f.endsWith(".js"));

async function loadCommands() {
  for (const file of files) {
    const full = path.join(slashDir, file);

    try {
      // Use dynamic import for ES modules
      const mod: SlashModule = await import(full);
      const data = (mod?.data ?? (mod?.default?.data)) as SlashCommandBuilder | undefined;

      if (!data) {
        console.warn(`Skipping ${file}: no exported "data" SlashCommandBuilder found.`);
        continue;
      }

      // toJSON to be accepted by Discord REST
      try {
        // @ts-ignore
        commands.push(data.toJSON());
      } catch (e) {
        console.warn(`Failed to serialize command from ${file}`, e);
      }
    } catch (error) {
      console.warn(`Error loading ${file}:`, error);
    }
  }
}

(async () => {
  await loadCommands();
  
  try {
    const rest = new REST({ version: "10" }).setToken(TOKEN as string);

    if (GUILD_ID && !FORCE_GLOBAL) {
      console.log(`Registering ${commands.length} guild slash commands to ${GUILD_ID} ...`);
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID as string, GUILD_ID as string), {
        body: commands,
      });
      console.log("Guild slash commands registered successfully.");
    } else {
      console.log(`Registering ${commands.length} global slash commands ... (may take up to 1 hour to propagate)`);
      await rest.put(Routes.applicationCommands(CLIENT_ID as string), {
        body: commands,
      });
      console.log("Global slash commands registered successfully.");
    }
  } catch (err) {
    console.error("Slash command registration failed:", err);
    process.exit(1);
  }
})();
