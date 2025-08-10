# NAVCODE Rhythm — Setup, Operations, and Feature Guide

This document is a comprehensive runbook for installing, configuring, running, and operating the NAVCODE Rhythm Discord music bot. It covers:
- Prerequisites and dependencies
- Lavalink and PostgreSQL setup
- Environment configuration (.env)
- Running the bot with PM2 (ecosystem scripts)
- Slash command registration flows
- Features overview (music, filters, playlists)
- Embeds and interactive UI (buttons/select menus)
- Search/stream methods and providers
- Troubleshooting and operational playbooks

This guide assumes Windows Server 2022, PowerShell, and PM2 as used in this repository.

---

## 1) Prerequisites

1. Node.js LTS (18+ recommended)
   - https://nodejs.org
   - Verify: `node -v` and `npm -v`

2. Java (for Lavalink v4)
   - Install Temurin (Adoptium) Java 17 LTS
   - Verify: `java -version`

3. PostgreSQL (if using persistence/premium/playlist features backed by DB)
   - Install PostgreSQL 14+ from https://www.postgresql.org/download/
   - Create a database and user:
     - Example database name: `navcode_rhythm`
     - Example user: `navuser`, password `navpass`

4. Redis (optional, if the bot uses Redis caching)
   - Not strictly required unless enabled in config.

5. Git (optional but recommended)
   - https://git-scm.com/

6. PM2 (process manager)
   - `npm i -g pm2`

7. Lavalink
   - This repo includes a Lavalink directory with example configs.
   - You can run locally or on a remote server.

---

## 2) Repository Structure Highlights

- `src/` — Bot source
  - `src/slash/` — Slash command handlers (implemented in this project)
  - `src/events/` — Event handlers (e.g., trackStart)
  - `src/classes/` — Core classes (ExtendedClient, Lavalink client)
  - `src/commands/` — Legacy prefix commands (source of truth for parity)
- `Lavalink/` — Lavalink v4 server and config examples
- `scripts/`
  - `register-commands.ts` — Registers all slash commands explicitly
  - `register-slash.ts` — Generic dynamic registrar (alternative approach)
- `ecosystem.config.cjs` — PM2 ecosystem definition
- `start-ecosystem.bat`, `stop-ecosystem.bat` — Convenience scripts
- `docs/SETUP_AND_OPERATIONS.md` — This guide

---

## 3) Environment Configuration (.env)

Create `.env` at the project root:

Required:
- DISCORD_BOT_TOKEN=your_bot_token
- DISCORD_CLIENT_ID=your_application_client_id

Optional (for guild-scoped immediate registration with the dynamic script):
- DISCORD_GUILD_ID=your_test_guild_id

If your code references other envs (DB, Lavalink, etc.), include them:
- DATABASE_URL=postgresql://navuser:navpass@localhost:5432/navcode_rhythm
- LAVALINK_HOST=localhost
- LAVALINK_PORT=2333
- LAVALINK_PASSWORD=your_password
- GENIUS_ACCESS_TOKEN=your_genius_api_token (for /lyric)

Security:
- Never paste tokens in chat or commit them to version control.

---

## 4) Lavalink Setup

Local Lavalink v4 steps (Windows):

1. Edit Lavalink config:
   - Use `application.example.yaml` or `Lavalink/LavalinkServer/application.yml.example` as reference.
   - Key fields:
     - server:
       - port: 2333
       - address: 0.0.0.0
     - lavalink:
       - plugins: []
       - serverPassword: your_password
     - sources: (YouTube, SoundCloud, etc.)
2. Run Lavalink
   - From the Lavalink folder, run the appropriate start command (Java 17 required).
   - Example (binary/script may vary by distribution). See Lavalink README for details.
3. Verify
   - Check logs: server listening on configured port.

Note: This bot connects to Lavalink using host/port/password from .env or config.

---

## 5) PostgreSQL Setup (Optional but recommended if bot uses DB)

1. Create DB and user:
   - `CREATE DATABASE navcode_rhythm;`
   - `CREATE USER navuser WITH ENCRYPTED PASSWORD 'navpass';`
   - `GRANT ALL PRIVILEGES ON DATABASE navcode_rhythm TO navuser;`
2. Set DATABASE_URL in `.env`:
   - `postgresql://navuser:navpass@localhost:5432/navcode_rhythm`
3. Run migrations/Prisma (if used)
   - Consult prisma or migration docs if present in the repo.

---

## 6) Install Dependencies

In project root:
- `npm ci` or `npm install`

If using Bun:
- `bun install` (only if the project supports)

---

## 7) Running the Bot with PM2

Start:
- `pm2 start ecosystem.config.cjs` (Windows)
- Or use batch:
  - `.\start-ecosystem.bat`
Stop:
- `pm2 stop all` or `.\stop-ecosystem.bat`
Status:
- `pm2 status`
Logs:
- `pm2 logs`

PM2 Environment Refresh:
- `pm2 start ecosystem.config.cjs --update-env`

---

## 8) Slash Command Registration

We maintain an explicit list in `scripts/register-commands.ts` that imports all slash files under `src/slash`. This ensures stable, predictable registration.

To register globally (PowerShell):
- Ensure `.env` contains:
  - `DISCORD_BOT_TOKEN`
  - `DISCORD_CLIENT_ID`
- Run:
```
$env:DISCORD_BOT_TOKEN="YOUR_TOKEN"; $env:DISCORD_CLIENT_ID="YOUR_CLIENT_ID"; node -r ts-node/register/transpile-only scripts/register-commands.ts
```

Notes:
- Global commands can take up to 1 hour to propagate.
- For instant testing, you can implement guild registration (set `DISCORD_GUILD_ID`) or use the alternate `scripts/register-slash.ts` with guild support.

---

## 9) Features Overview

### Music Commands (core)
- /play — Enqueue and start playback. First “queued” message suppressed when starting from empty.
- /search — Interactive select menu with numbered results; preserves links in results and confirmation (per policy).
- /playnext — Adds track(s) to the front of the queue (supports playlists).
- /queue — Paginated queue info; no links.
- /nowplaying — Current track info; no links.
- /skip — Skip current or N tracks; bounds-checked; uses player skip(n) or slicing fallback.
- /seek — hh:mm:ss, mm:ss, or “1h 2m 3s”/seconds; validates seekability and duration; uses player.seek or restart fallback.
- /shuffle — Fisher–Yates; writes back to queue structure safely.
- /loop — Explicit mode off/track/queue; if omitted, cycles off → track → queue (prefix parity).
- /autoplay — Optional boolean; toggles when omitted; persists state; supports multiple APIs.
- /remove — Remove 1-based position from queue; uses queue.remove or splice fallback.
- /clearqueue — Clear pending queue (keep current track); safe fallbacks.
- /replay — Seek to 0 or restart current track.
- /lyric — Fetches lyrics via Genius API; paginated with prev/next buttons.

### Filters
- /vibrato — Toggle; default frequency=2.0, depth=0.5; supports filterManager/setFilters/fallbacks.
- /bassboost — Levels: high, medium, low, off; uses EQList; clearEQ fallback.
- /karaoke — Toggle; defaults level=1.0, monoLevel=1.0, filterBand=220.0, filterWidth=100.0.
- /lowpass — Toggle; default smoothing=20.0.
- /rotation — Toggle; uses filterManager.toggleRotation if present; default rotationHz=0.2 when setting explicitly.
- /pitch — Numeric multiplier 0.5–5.0; normalized comma decimal; sets timescale.pitch or filterManager.setPitch.
- /speed — Numeric multiplier 0.5–5.0; sets timescale.speed or filterManager.setRate.
- /reset — Clears all filters (global reset or removing each filter and update).

### Playlists (if enabled)
- /playlist, /create, /add, /removesong, /delete, /load, /steal — As implemented in src/slash/*.ts
- Requires DB if the implementation persists user playlists.

### Info / Utility
- /ping, /help, /premium, /join, /leave, /pause, /resume, /volume — Standard utility commands.

---

## 10) UI: Embeds and Interactive Components

- Embeds used for all command responses (except search list which may include links).
- Interactive elements:
  - StringSelect menu (/search)
  - Buttons for pagination (/lyric prev/next)
- All interactive collectors:
  - Filtered by user
  - Timeout set (typically 60 seconds)
  - Disabled components after selection or timeout

---

## 11) Search and Stream Methods

- Search: Uses Lavalink’s `player.search({ query }, user)` with providers enabled in Lavalink (YouTube, SoundCloud, etc.).
- Stream playback: Uses Lavalink Node client APIs:
  - player.play({ paused: false })
  - player.seek(ms)
  - player.queue.add / remove / splice
  - filterManager.* where available

---

## 12) Operations Playbook

Common ops:
- Restart bot:
  - `pm2 start ecosystem.config.cjs --update-env`
- Check logs:
  - `pm2 logs`
- Register slash commands globally:
  - As described in section 8

Troubleshooting:
- Missing token/client ID:
  - Ensure `.env` present and variables named as expected by the script.
- Commands not appearing:
  - Global propagation can take up to 1 hour.
  - For instant testing, register to a guild by using a guild-scoped script or adding GUILD_ID to the dynamic registrar.
- Lavalink connection errors:
  - Verify Lavalink is running, password matches, host/port reachable, Java version compatible.
- Audio issues:
  - Check voice permissions (Connect, Speak) and channel region settings.
  - Consult `AUDIO_TROUBLESHOOTING.md` if present.

---

## 13) Security and Token Handling

- Never share tokens publicly or paste into chats.
- Rotate tokens immediately if exposed.
- Use environment variables and avoid committing secrets.

---

## 14) Bot Identity (Username & Avatar)

Target:
- Username: NAVCODE Rhythm
- Avatar: https://i.postimg.cc/8Cft6rnc/profile.gif

To automate:
- A one-time script can call Discord API to update the bot user. See `scripts/update-bot-identity.ts` (to be created) which:
  - Downloads the avatar (or accepts a local file)
  - Converts to base64
  - Calls PATCH /users/@me with username and avatar (bot token must have correct scope/permissions)

Alternatively:
- Change in Discord Developer Portal (recommended for one-time operations).

---

## 15) Versioning and Change Management

- Track changes via Git commits and release notes.
- Use PM2 to manage production uptime and restarts.
- Use the `register-commands.ts` for deterministic registration across environments.

---

## 16) Support Matrix

- Windows Server 2022, Node 18+, Java 17+
- Discord API v10 (discord.js v14)
- Lavalink v4
- Optional: PostgreSQL, Redis

---

## 17) Appendix: Quick Commands

Install deps:
```
npm ci
```

Start Lavalink (see Lavalink README for exact command for your build).

Start bot:
```
pm2 start ecosystem.config.cjs
```

Register slash (global, PowerShell):
```
$env:DISCORD_BOT_TOKEN="YOUR_TOKEN"; $env:DISCORD_CLIENT_ID="YOUR_CLIENT_ID"; node -r ts-node/register/transpile-only scripts/register-commands.ts
```

Stop bot:
```
pm2 stop all
```

Logs:
```
pm2 logs
```

---

This completes the NAVCODE Rhythm setup, operations, and feature guide. Keep this doc updated as features evolve.
