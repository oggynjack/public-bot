#!/usr/bin/env node

// Bot Starter Script for PM2
// This script starts the Discord bot with the provided configuration

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if bot scripts exist
const botScriptPath = path.join(__dirname, 'src', 'index.ts');
const distScriptPath = path.join(__dirname, 'dist', 'index.js');
const simpleBotPath = path.join(__dirname, 'src', 'index.js');

console.log('🚀 Starting Discord Music Bot...');
console.log('🔍 Bot Token:', process.env.BOT_TOKEN ? '[SET]' : '[MISSING]');
console.log('🔍 Application ID:', process.env.APPLICATION_ID || '[MISSING]');
console.log('🔍 Bot Name:', process.env.BOT_NAME || 'Music Bot');

// Try to start the bot
try {
  if (fs.existsSync(botScriptPath)) {
    console.log('📁 Using TypeScript source:', botScriptPath);
    // For TypeScript, we need to use dynamic import with file:// URL on Windows
    const fileUrl = `file:///${botScriptPath.replace(/\\/g, '/')}`;
    import(fileUrl).catch(err => {
      console.error('❌ Error importing TypeScript bot:', err.message);
      startFallbackBot();
    });
  } else if (fs.existsSync(distScriptPath)) {
    console.log('📁 Using compiled JavaScript:', distScriptPath);
    const fileUrl = `file:///${distScriptPath.replace(/\\/g, '/')}`;
    import(fileUrl).catch(err => {
      console.error('❌ Error importing compiled bot:', err.message);
      startFallbackBot();
    });
  } else if (fs.existsSync(simpleBotPath)) {
    console.log('📁 Using simple bot:', simpleBotPath);
    const fileUrl = `file:///${simpleBotPath.replace(/\\/g, '/')}`;
    import(fileUrl).catch(err => {
      console.error('❌ Error importing simple bot:', err.message);
      startFallbackBot();
    });
  } else {
    console.error('❌ No bot script found at:', botScriptPath, 'or', distScriptPath);
    console.log('🔄 Creating a simple bot placeholder...');
    startFallbackBot();
  }
} catch (error) {
  console.error('❌ Critical error:', error.message);
  startFallbackBot();
}

async function startFallbackBot() {
  try {
    console.log('🔄 Starting fallback Discord.js bot...');
    
    // Create a minimal Discord bot placeholder
    const { Client, GatewayIntentBits, ActivityType } = await import('discord.js');
    
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
      ]
    });

    client.once('ready', () => {
      console.log('✅ Fallback bot is ready!');
      console.log(`🤖 Logged in as ${client.user.tag}`);
      console.log(`🏠 Connected to ${client.guilds.cache.size} guilds`);
      console.log(`👥 Serving ${client.users.cache.size} users`);
      
      // Set bot activity
      client.user.setActivity('Premium Music 🎵', { type: ActivityType.Listening });
    });

    client.on('messageCreate', message => {
      if (message.author.bot) return;
      
      if (message.content === '!ping') {
        message.reply('🏓 Pong! Bot is online and working!');
      }
      
      if (message.content === '!status') {
        const embed = {
          color: 0x3B82F6, // Electric blue
          title: '🤖 Bot Status',
          fields: [
            { name: '🏠 Guilds', value: client.guilds.cache.size.toString(), inline: true },
            { name: '👥 Users', value: client.users.cache.size.toString(), inline: true },
            { name: '📊 Uptime', value: `${Math.floor(process.uptime())} seconds`, inline: true }
          ],
          timestamp: new Date(),
        };
        message.reply({ embeds: [embed] });
      }
      
      if (message.content === '!play') {
        message.reply('🎵 Music features are loading! Your bot is hosted via PremiumPlus.');
      }
    });

    client.on('error', console.error);
    
    const token = process.env.BOT_TOKEN;
    if (!token) {
      throw new Error('BOT_TOKEN environment variable is required');
    }
    
    await client.login(token);
    
  } catch (error) {
    console.error('❌ Failed to start fallback bot:', error.message);
    process.exit(1);
  }
}
