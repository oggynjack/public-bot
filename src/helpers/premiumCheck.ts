import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export type CommandTier = "free" | "premium" | "premiumplus";

export interface TierCheck {
  allowed: boolean;
  userTier: string;
  requiredTier: CommandTier;
}

/**
 * Check if user has required tier for a command
 */
export async function checkCommandTier(
  interaction: ChatInputCommandInteraction,
  client: ExtendedClient,
  requiredTier: CommandTier
): Promise<TierCheck> {
  const userTier = await client.premium.getEffectiveTier(interaction.user.id, interaction.guildId!);
  
  let allowed = false;
  
  switch (requiredTier) {
    case "free":
      allowed = true; // All users can access free commands
      break;
    case "premium":
      allowed = userTier === "premium" || userTier === "premiumplus";
      break;
    case "premiumplus":
      allowed = userTier === "premiumplus";
      break;
  }
  
  return {
    allowed,
    userTier,
    requiredTier
  };
}

/**
 * Send premium requirement embed for denied commands
 */
export async function sendPremiumRequiredEmbed(
  interaction: ChatInputCommandInteraction,
  client: ExtendedClient,
  commandName: string,
  requiredTier: CommandTier,
  userTier: string
): Promise<void> {
  const embed = new EmbedBuilder()
    .setColor(client.color.red)
    .setTitle("🔒 Premium Feature")
    .setDescription(`**${commandName}** requires **${getTierDisplayName(requiredTier)}** or higher!\n\n` +
      `**Your current tier:** ${getTierDisplayName(userTier as CommandTier)}\n\n` +
      getFeatureDescription(requiredTier) + "\n\n" +
      "💎 **Upgrade to Premium** for full access!\n" +
      "📞 Contact <@730818959112274040> for premium access.");
  
  await interaction.editReply({ embeds: [embed] });
}

/**
 * Get display name for tier
 */
function getTierDisplayName(tier: CommandTier | string): string {
  switch (tier) {
    case "free": return "Free";
    case "premium": return "Premium";
    case "premiumplus": return "Premium+";
    default: return "Unknown";
  }
}

/**
 * Get feature description for tier
 */
function getFeatureDescription(tier: CommandTier): string {
  switch (tier) {
    case "free":
      return "**Free Tier includes:**\n" +
        "• Basic playback (play, pause, resume)\n" +
        "• Info commands (help, ping, nowplaying)\n" +
        "• Join/leave voice channels";
    
    case "premium":
      return "**Premium unlocks:**\n" +
        "• All audio filters (8D, bassboost, nightcore, etc.)\n" +
        "• Queue system & playlists\n" +
        "• Volume control & seeking\n" +
        "• Up to 5 AI auto-suggestions";
    
    case "premiumplus":
      return "**Premium+ includes everything in Premium plus:**\n" +
        "• Advanced filters (pitch, speed)\n" +
        "• Extended queue limits (500 songs)\n" +
        "• Up to 10 AI auto-suggestions\n" +
        "• Priority support";
        
    default:
      return "";
  }
}

/**
 * Command tier definitions
 */
export const COMMAND_TIERS: Record<string, CommandTier> = {
  // Free tier commands (basic functionality)
  "play": "free",
  "pause": "free", 
  "resume": "free",
  "help": "free",
  "ping": "free",
  "nowplaying": "free",
  "join": "free",
  "leave": "free",
  
  // Premium tier commands (enhanced functionality)
  "queue": "premium",
  "skip": "premium",
  "volume": "premium",
  "seek": "premium",
  "shuffle": "premium",
  "loop": "premium",
  "autoplay": "premium",
  "remove": "premium",
  "clearqueue": "premium",
  "playlist": "premium",
  "create": "premium",
  "add": "premium",
  "removesong": "premium",
  
  // Premium tier filters (basic filters)
  "8d": "premium",
  "bassboost": "premium",
  "nightcore": "premium",
  "karaoke": "premium",
  "lowpass": "premium",
  "rotation": "premium",
  "tremolo": "premium",
  "vibrato": "premium",
  "reset": "premium",
  
  // Premium+ tier filters (advanced filters)
  "speed": "premiumplus",
  "pitch": "premiumplus",
};

/**
 * Check if user has premium access for filters
 * Returns true if user can proceed, false if restricted (and sends restriction message)
 */
export async function checkFilterAccess(
  interaction: ChatInputCommandInteraction, 
  client: ExtendedClient
): Promise<boolean> {
  const userTier = await client.premium.getEffectiveTier(
    interaction.user.id,
    interaction.guildId!
  );

  if (userTier === "free") {
    const embed = new EmbedBuilder()
      .setTitle("❌ Premium or Premium+ Required")
      .setDescription("Audio filters are only available for Premium users!")
      .addFields(
        {
          name: "💎 Premium Features Include:",
          value: "• Audio filters (bassboost, nightcore, 8D, etc.)\n• Higher audio quality (up to 320kbps)\n• Queue system & playlists\n• Volume control up to 200%",
          inline: false
        },
        {
          name: "🔗 Owners:",
          value: "<@730818959112274040> or <@970958636740407306>",
          inline: false
        },
        {
          name: "💬 Contact:",
          value: "<@1397241529004986378>",
          inline: false
        }
      )
      .setColor(0xFF6B6B)
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel("🌐 Visit Premium Website")
          .setURL("https://bot.nav-code.com")
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setLabel('💬 Contact Support')
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.gg/AkAsgygQRQ')
      );

    await interaction.editReply({ embeds: [embed], components: [row] });
    return false;
  }
  
  return true;
}

/**
 * Check if user has premium access for playlist features
 */
export async function checkPlaylistAccess(
  interaction: ChatInputCommandInteraction, 
  client: ExtendedClient
): Promise<boolean> {
  const userTier = await client.premium.getEffectiveTier(
    interaction.user.id,
    interaction.guildId!
  );

  if (userTier === "free") {
    const embed = new EmbedBuilder()
      .setTitle("❌ Premium or Premium+ Required")
      .setDescription("Playlists are only available for Premium users!")
      .addFields(
        {
          name: "💎 Premium Features Include:",
          value: "• Create and manage playlists\n• Queue system with up to 500 tracks\n• Audio filters and effects\n• Higher audio quality (up to 320kbps)",
          inline: false
        },
        {
          name: "🔗 Owners:",
          value: "<@730818959112274040> or <@970958636740407306>",
          inline: false
        },
        {
          name: "💬 Contact:",
          value: "<@1397241529004986378>",
          inline: false
        }
      )
      .setColor(0xFF6B6B)
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel("🌐 Visit Premium Website")
          .setURL("https://bot.nav-code.com")
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setLabel('💬 Contact Support')
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.gg/AkAsgygQRQ')
      );

    await interaction.editReply({ embeds: [embed], components: [row] });
    return false;
  }
  
  return true;
}

/**
 * Check if user has premium access for queue features
 */
export async function checkQueueAccess(
  interaction: ChatInputCommandInteraction, 
  client: ExtendedClient
): Promise<boolean> {
  const userTier = await client.premium.getEffectiveTier(
    interaction.user.id,
    interaction.guildId!
  );

  if (userTier === "free") {
    const embed = new EmbedBuilder()
      .setTitle("❌ Premium or Premium+ Required")
      .setDescription("Queue features are only available for Premium users!\nFree users can only play one song at a time.")
      .addFields(
        {
          name: "💎 Upgrade to Premium for:",
          value: "• Queue system with up to 100 tracks\n• Skip, shuffle, and queue management\n• Playlists and autoplay\n• Audio filters and effects",
          inline: false
        },
        {
          name: "🔗 Owners:",
          value: "<@730818959112274040> or <@970958636740407306>",
          inline: false
        },
        {
          name: "💬 Contact:",
          value: "<@1397241529004986378>",
          inline: false
        }
      )
      .setColor(0xFF6B6B)
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel("🌐 Visit Premium Website")
          .setURL("https://bot.nav-code.com")
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setLabel('💬 Contact Support')
          .setStyle(ButtonStyle.Link)
          .setURL('https://discord.gg/AkAsgygQRQ')
      );

    await interaction.editReply({ embeds: [embed], components: [row] });
    return false;
  }
  
  return true;
}
