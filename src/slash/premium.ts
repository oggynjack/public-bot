import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

/**
 * Enhanced premium status command with real-time tier checking and expiration info
 */
export const data = new SlashCommandBuilder()
  .setName("premium")
  .setDescription("Display detailed premium status and tier information")
  .addUserOption(opt =>
    opt.setName("user")
      .setDescription("User to check premium status (optional)")
      .setRequired(false),
  )
  .addBooleanOption(opt =>
    opt.setName("guild")
      .setDescription("Check this guild's premium status instead of user")
      .setRequired(false),
  );

export const execute = withCommandLogging("premium", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    if (!interaction.isRepliable()) {
      client.logger.warn("Premium command: Interaction is no longer repliable");
      return;
    }

    await interaction.deferReply();

    const targetUser = interaction.options.getUser("user", false);
    const checkGuild = interaction.options.getBoolean("guild", false);
    const guildId = interaction.guildId!;
    
    // Helper function to format tier emoji and name
    const formatTier = (tier: string) => {
      const tierMap = {
        'free': { emoji: '🆓', name: 'Free', color: 0x95A5A6 },
        'premium': { emoji: '✨', name: 'Premium', color: 0xF39C12 },
        'premiumplus': { emoji: '⭐', name: 'Premium Plus', color: 0xE91E63 }
      };
      return tierMap[tier as keyof typeof tierMap] || tierMap.free;
    };

    // Helper function to format time remaining
    const formatTimeRemaining = (expiresAt?: Date | null) => {
      if (!expiresAt) return null;
      
      const now = new Date();
      const timeLeft = expiresAt.getTime() - now.getTime();
      
      if (timeLeft <= 0) return "**Expired**";
      
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) return `${days}d ${hours}h`;
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}m`;
    };

    if (targetUser || checkGuild) {
      // Check premium for specific user or guild
      let premiumStatus, entityName, isUser = true;
      
      if (targetUser) {
        premiumStatus = await client.premium.getUserPremium(targetUser.id);
        entityName = targetUser.username;
        isUser = true;
      } else {
        premiumStatus = await client.premium.getGuildPremium(guildId);
        entityName = interaction.guild?.name || guildId;
        isUser = false;
      }

      const tierInfo = formatTier(premiumStatus.premiumTier);
      const timeRemaining = formatTimeRemaining(premiumStatus.premiumTo);
      
      const embed = new EmbedBuilder()
        .setTitle(`${tierInfo.emoji} Premium Status - ${entityName}`)
        .setColor(premiumStatus.isPremium ? tierInfo.color : 0x95A5A6)
        .setThumbnail(isUser ? (targetUser?.displayAvatarURL() || null) : (interaction.guild?.iconURL() || null))
        .addFields(
          {
            name: "🏷️ Current Tier",
            value: `${tierInfo.emoji} **${tierInfo.name}**`,
            inline: true
          },
          {
            name: "📊 Status",
            value: premiumStatus.isPremium ? "✅ **Active**" : "❌ **Inactive**",
            inline: true
          },
          {
            name: "⏰ Time Remaining",
            value: timeRemaining || "N/A",
            inline: true
          },
          {
            name: "📅 Premium Since",
            value: premiumStatus.premiumFrom 
              ? `<t:${Math.floor(premiumStatus.premiumFrom.getTime() / 1000)}:D>`
              : "Never activated",
            inline: true
          },
          {
            name: "📅 Expires On",
            value: premiumStatus.premiumTo 
              ? `<t:${Math.floor(premiumStatus.premiumTo.getTime() / 1000)}:F>`
              : "N/A",
            inline: true
          },
          {
            name: "💎 Plan Type",
            value: premiumStatus.premiumTier === 'free' ? 'No premium plan' : `${tierInfo.emoji} ${tierInfo.name}`,
            inline: true
          }
        );

      // Add tier benefits
      if (premiumStatus.premiumTier === 'premium') {
        embed.addFields({
          name: "✨ Premium Benefits",
          value: [
            "• Unlimited queue size",
            "• High-quality audio",
            "• Skip vote bypass",
            "• Custom bot settings",
            "• Priority support"
          ].join('\n'),
          inline: false
        });
      } else if (premiumStatus.premiumTier === 'premiumplus') {
        embed.addFields({
          name: "⭐ Premium Plus Benefits",
          value: [
            "• All Premium features",
            "• Multi-server support (3 servers)",
            "• Custom bot name & avatar",
            "• Advanced audio filters",
            "• 24/7 music mode",
            "• Playlist sharing",
            "• Premium support"
          ].join('\n'),
          inline: false
        });
      } else {
        embed.addFields({
          name: "🆓 Free Tier Limits",
          value: [
            "• Basic music playback",
            "• Limited queue (25 songs)",
            "• Standard audio quality",
            "• Community support"
          ].join('\n'),
          inline: false
        });
      }

      // Add warning for expiring premium
      if (premiumStatus.isPremium && premiumStatus.premiumTo) {
        const daysLeft = Math.ceil((premiumStatus.premiumTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        if (daysLeft <= 7) {
          embed.addFields({
            name: "⚠️ Expiration Warning",
            value: `Your premium subscription expires in **${daysLeft} day${daysLeft === 1 ? '' : 's'}**!\nContact the bot owner to renew your subscription.`,
            inline: false
          });
        }
      }

      embed.setFooter({
        text: `Premium status checked at ${new Date().toLocaleString()}`,
        iconURL: client.user?.displayAvatarURL()
      });

      if (interaction.deferred && interaction.isRepliable()) {
        await interaction.editReply({ embeds: [embed] });
      }
      return;
    }

    // Default: Show both user and guild premium status
    const [userPremium, guildPremium] = await Promise.all([
      client.premium.getUserPremium(interaction.user.id),
      client.premium.getGuildPremium(guildId)
    ]);

    const userTier = formatTier(userPremium.premiumTier);
    const guildTier = formatTier(guildPremium.premiumTier);
    const userTimeLeft = formatTimeRemaining(userPremium.premiumTo);
    const guildTimeLeft = formatTimeRemaining(guildPremium.premiumTo);

    // Determine effective tier (highest between user and guild)
    const effectiveTier = await client.premium.getEffectiveTier(interaction.user.id, guildId);
    const effectiveTierInfo = formatTier(effectiveTier);

    const embed = new EmbedBuilder()
      .setTitle(`${effectiveTierInfo.emoji} Premium Overview`)
      .setColor(effectiveTierInfo.color)
      .setThumbnail(interaction.guild?.iconURL() || null)
      .addFields(
        {
          name: "👤 Your Premium Status",
          value: [
            `**Tier:** ${userTier.emoji} ${userTier.name}`,
            `**Status:** ${userPremium.isPremium ? '✅ Active' : '❌ Inactive'}`,
            `**Time Left:** ${userTimeLeft || 'N/A'}`
          ].join('\n'),
          inline: true
        },
        {
          name: "🏠 Server Premium Status",
          value: [
            `**Tier:** ${guildTier.emoji} ${guildTier.name}`,
            `**Status:** ${guildPremium.isPremium ? '✅ Active' : '❌ Inactive'}`,
            `**Time Left:** ${guildTimeLeft || 'N/A'}`
          ].join('\n'),
          inline: true
        },
        {
          name: "⚡ Effective Tier",
          value: `${effectiveTierInfo.emoji} **${effectiveTierInfo.name}**\n*The highest tier between user and server*`,
          inline: false
        }
      )
      .setFooter({
        text: `Premium status checked at ${new Date().toLocaleString()}`,
        iconURL: client.user?.displayAvatarURL()
      });

    if (interaction.deferred && interaction.isRepliable()) {
      await interaction.editReply({ embeds: [embed] });
    }
  } catch (err) {
    client.logger.error("slash /premium error", err);
    try { 
      if (interaction.isRepliable()) {
        const errorEmbed = new EmbedBuilder()
          .setTitle("❌ Premium Check Failed")
          .setDescription("Unable to retrieve premium status. Please try again later.")
          .setColor(0xED4245);
        
        if (interaction.deferred) {
          await interaction.editReply({ embeds: [errorEmbed] });
        } else {
          await interaction.reply({ embeds: [errorEmbed], flags: 64 }); // MessageFlags.Ephemeral = 64
        }
      }
    } catch (replyErr) {
      client.logger.error("Failed to send error reply:", replyErr);
    }
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
