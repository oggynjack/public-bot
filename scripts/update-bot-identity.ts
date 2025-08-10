/**
 * One-time script to update the bot's username and avatar via Discord REST.
 * Usage (PowerShell):
 *   $env:DISCORD_BOT_TOKEN="YOUR_TOKEN";
 *   node -r ts-node/register/transpile-only scripts/update-bot-identity.ts
 *
 * Notes:
 * - Do NOT commit your token. Provide it via environment variable at runtime.
 * - The avatar is fetched from the provided URL, converted to base64, and sent to Discord.
 * - Username and avatar updates are rate limited by Discord; run sparingly.
 */
import "dotenv/config";
import https from "https";
import { REST } from "discord.js";

const TOKEN = process.env.DISCORD_BOT_TOKEN || process.env.DISCORD_TOKEN || process.env.TOKEN;
if (!TOKEN) {
  console.error("Missing DISCORD_BOT_TOKEN / DISCORD_TOKEN / TOKEN in environment.");
  process.exit(1);
}

// Desired identity
const TARGET_USERNAME = "NAVCODE Rhythm";
const AVATAR_URL = "https://i.postimg.cc/8Cft6rnc/profile.gif";

/** Download a URL and return Buffer */
function fetchBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const status = res.statusCode ?? 0;
      if (status < 200 || status >= 300) {
        reject(new Error(`HTTP ${status} when fetching avatar.`));
        res.resume();
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (d) => chunks.push(d));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

/** Detect simple content type by file signature or url extension; fallback to image/png */
function detectMime(url: string, buf: Buffer): string {
  // crude detection for GIF/PNG/JPEG
  if (buf.length >= 6 && buf.slice(0, 6).toString("ascii") === "GIF89a") return "image/gif";
  if (buf.length >= 8 && buf.slice(0, 8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]))) return "image/png";
  if (buf.length >= 3 && buf.slice(0, 3).equals(Buffer.from([0xff,0xd8,0xff]))) return "image/jpeg";
  if (url.toLowerCase().endsWith(".gif")) return "image/gif";
  if (url.toLowerCase().endsWith(".png")) return "image/png";
  if (url.toLowerCase().endsWith(".jpg") || url.toLowerCase().endsWith(".jpeg")) return "image/jpeg";
  return "image/png";
}

(async () => {
  try {
    console.log("Fetching avatar from:", AVATAR_URL);
    const avatarBuf = await fetchBuffer(AVATAR_URL);
    const mime = detectMime(AVATAR_URL, avatarBuf);
    const base64 = avatarBuf.toString("base64");
    const imageDataUri = `data:${mime};base64,${base64}`;

    const rest = new REST({ version: "10" }).setToken(TOKEN);

    // PATCH /users/@me
    // https://discord.com/developers/docs/resources/user#modify-current-user
    console.log("Updating bot username and avatar...");
    await (rest as any).patch("/users/@me", {
      body: {
        username: TARGET_USERNAME,
        avatar: imageDataUri,
      },
    });

    console.log("Bot identity updated successfully:");
    console.log(`- Username: ${TARGET_USERNAME}`);
    console.log(`- Avatar: ${AVATAR_URL}`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to update bot identity:", err);
    process.exit(1);
  }
})();
