import type ExtendedClient from "@/classes/ExtendedClient";
import type { Interaction } from "discord.js";
import { MessageFlags, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { handleBotControlsMenu } from "./interactions/selectMenus/botcontrolsMenu";
import { handleDevControlsMenu } from "./interactions/selectMenus/devcontrolsMenu";
import { handleLanguageMenu } from "./interactions/selectMenus/languageMenu";
import { Language } from "@/typings/utils";

export default function interactions(client: ExtendedClient) {
  client.on("interactionCreate", async (interaction: Interaction) => {
    try {
      // Handle slash commands
      if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;

        // Route to slash command handlers registered on client
        const handler = (client as any).slash?.get?.(commandName);
        if (!handler) {
          // Use a safe single-ack path; prefer reply when not yet acknowledged
          if (interaction.isRepliable() && !interaction.deferred && !interaction.replied) {
            await interaction.reply({ content: "Command not implemented.", flags: MessageFlags.Ephemeral });
          }
          return;
        }

        await handler.execute(interaction as any, client);
        return;
      }

      // Handle string select menu interactions
      if (interaction.isStringSelectMenu()) {
        // Handle custom ID patterns with user ID
        if (interaction.customId.startsWith("guildowner_controls_")) {
          await handleBotControlsMenu(client, interaction);
          return;
        }
        if (interaction.customId.startsWith("dev_controls_")) {
          await handleDevControlsMenu(client, interaction);
          return;
        }
        if (interaction.customId === "language_select") {
          await handleLanguageMenu(client, interaction);
          return;
        }
        
        // Handle direct menu IDs (legacy support)
        switch (interaction.customId) {
          case "botcontrols_menu":
          case "devcontrols_menu":
            // Legacy fallback
            if (interaction.customId === "botcontrols_menu") {
              await handleBotControlsMenu(client, interaction);
            } else {
              await handleDevControlsMenu(client, interaction);
            }
            break;
          default:
            // Handle unknown select menu
            if (interaction.isRepliable() && !interaction.deferred && !interaction.replied) {
              await interaction.reply({ 
                content: "Unknown interaction.", 
                flags: MessageFlags.Ephemeral 
              });
            }
            break;
        }
        return;
      }

      // Handle button interactions
      if (interaction.isButton()) {
        const customId = interaction.customId;
        
        // Dev controls buttons
        if (customId.startsWith("dev_quick_premium_") || 
            customId.startsWith("dev_system_status_") || 
            customId.startsWith("dev_emergency_")) {
          
          // Check if user is bot owner/developer (hardcoded owner ID)
          const ownerId = "730818959112274040";
          if (interaction.user.id !== ownerId) {
            await interaction.reply({
              content: "❌ Only bot developers can use these controls.",
              flags: MessageFlags.Ephemeral
            });
            return;
          }
          
          // Handle dev button actions
          if (customId.startsWith("dev_quick_premium_")) {
            const embed = new (await import("discord.js")).EmbedBuilder()
              .setTitle("💎 Quick Premium Management")
              .setDescription("**Available Quick Actions:**\n\n" +
                "• `.addpremium @user` - Grant premium to user\n" +
                "• `.addpremium @user guild` - Grant guild premium\n" +
                "• `.revokepremium @user` - Remove premium access\n" +
                "• `.premstatus @user` - Check premium status\n" +
                "• `.premiumlist` - View all premium users")
              .setColor(0xFFD700);
            
            await interaction.reply({ embeds: [embed], ephemeral: true });
          } else if (customId.startsWith("dev_system_status_")) {
            const embed = new (await import("discord.js")).EmbedBuilder()
              .setTitle("📊 System Status")
              .setDescription("**System Information:**\n\n" +
                `• **Bot Uptime:** ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m\n` +
                `• **Memory Usage:** ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB\n` +
                `• **Guilds:** ${client.guilds.cache.size}\n` +
                `• **Users:** ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\n` +
                `• **Lavalink:** Connected`)
              .setColor(0x00FF00);
            
            await interaction.reply({ embeds: [embed], ephemeral: true });
          } else if (customId.startsWith("dev_emergency_")) {
            const embed = new (await import("discord.js")).EmbedBuilder()
              .setTitle("🚨 Emergency Controls")
              .setDescription("**Emergency Commands:**\n\n" +
                "• `.restart` - Restart bot immediately\n" +
                "• `.maintenance on` - Enable maintenance mode\n" +
                "• `.maintenance off` - Disable maintenance mode\n" +
                "• `.eval` - Execute emergency code\n" +
                "• `.logs error` - View recent errors")
              .setColor(0xFF0000);
            
            await interaction.reply({ embeds: [embed], ephemeral: true });
          }
          return;
        }

        // Admin panel buttons
        if (customId.startsWith("admin_")) {
          // Extract user ID from custom ID
          const parts = customId.split("_");
          const expectedUserId = parts[parts.length - 1];
          
          // Check if the interaction user matches the expected user
          if (interaction.user.id !== expectedUserId) {
            await interaction.reply({
              content: "❌ You cannot use this admin panel.",
              flags: MessageFlags.Ephemeral
            });
            return;
          }
          
          // Check if user is authorized admin
          const isAuthorized = interaction.user.id === "730818959112274040";
          if (!isAuthorized) {
            await interaction.reply({
              content: "❌ Access denied. Admin privileges required.",
              flags: MessageFlags.Ephemeral
            });
            return;
          }
          
          if (customId.includes("admin_bot_")) {
            // Bot Management Panel
            const embed = new EmbedBuilder()
              .setTitle("🎵 Bot Management Panel")
              .setDescription(
                "**Bot Control Commands:**\n\n" +
                "🔄 **Restart Bot** - `.restart`\n" +
                "📊 **Bot Status** - `.botinfo`\n" +
                "📋 **View Logs** - `.logs [error/info]`\n" +
                "🔧 **Debug Mode** - `.debug`\n" +
                "📝 **Register Commands** - `.register`\n\n" +
                `**Current Status:**\n` +
                `• Ping: ${client.ws.ping}ms\n` +
                `• Servers: ${client.guilds.cache.size}\n` +
                `• Users: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`
              )
              .setColor(0x9966FF);

            const backButton = new ActionRowBuilder<ButtonBuilder>()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId(`admin_back_${interaction.user.id}`)
                  .setLabel("← Back to Main")
                  .setStyle(ButtonStyle.Secondary)
              );

            await interaction.update({ embeds: [embed], components: [backButton] });
            
          } else if (customId.includes("admin_premium_")) {
            // Premium Management Panel
            const embed = new EmbedBuilder()
              .setTitle("⭐ Premium Management Panel")
              .setDescription(
                "**Premium Control Commands:**\n\n" +
                "💎 **Add Premium** - `.addpremium @user [guild]`\n" +
                "❌ **Revoke Premium** - `.revokepremium @user`\n" +
                "📊 **Premium Status** - `.premstatus @user`\n" +
                "⚡ **Quick Premium** - `.quickpremium @user`\n" +
                "📈 **Bulk Premium** - `.bulkprem [list]`\n" +
                "📋 **Check Premium** - `.checkpremium @user`\n\n" +
                "**Premium Tiers:**\n" +
                "🆓 Free - Basic features\n" +
                "⭐ Premium - Advanced features\n" +
                "💎 Premium+ - All features + priority"
              )
              .setColor(0xFFD700);

            const backButton = new ActionRowBuilder<ButtonBuilder>()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId(`admin_back_${interaction.user.id}`)
                  .setLabel("← Back to Main")
                  .setStyle(ButtonStyle.Secondary)
              );

            await interaction.update({ embeds: [embed], components: [backButton] });
            
          } else if (customId.includes("admin_settings_")) {
            // Bot Settings Panel - Get all available languages
            const availableLanguages = Object.keys(Language).join(", ");
            
            const embed = new EmbedBuilder()
              .setTitle("🔧 Bot Settings Panel")
              .setDescription(
                "**Bot Configuration Commands:**\n\n" +
                "🖼️ **Set Avatar** - `.setbotavatar [url]` (Global)\n" +
                "📝 **Set Name** - `.setbotname [name]` (Guild only)\n" +
                "🗃️ **Data Management** - `.data [export/import]`\n" +
                "🌐 **Language Settings** - `.language [code]`\n\n" +
                "**Available Language Codes:**\n" +
                `${availableLanguages}\n\n` +
                "**Current Settings:**\n" +
                `• Bot Name: ${client.user?.username}\n` +
                `• Prefix: ${client.prefix}\n` +
                `• Guild Name: ${interaction.guild?.members.me?.displayName || 'Default'}`
              )
              .setColor(0x00FF00);

            const backButton = new ActionRowBuilder<ButtonBuilder>()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId(`admin_back_${interaction.user.id}`)
                  .setLabel("← Back to Main")
                  .setStyle(ButtonStyle.Secondary)
              );

            await interaction.update({ embeds: [embed], components: [backButton] });
            
          } else if (customId.includes("admin_dev_")) {
            // Developer Tools Panel
            const embed = new EmbedBuilder()
              .setTitle("💻 Developer Tools Panel")
              .setDescription(
                "**Development Commands:**\n\n" +
                "⚡ **Eval Code** - `.eval [code]`\n" +
                "🐛 **Debug Info** - `.debug`\n" +
                "📋 **Register Commands** - `.register`\n" +
                "🔄 **Reload Modules** - Advanced debugging\n\n" +
                "**System Info:**\n" +
                `• Node.js: ${process.version}\n` +
                `• Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB\n` +
                `• Uptime: ${Math.floor(process.uptime() / 3600)}h`
              )
              .setColor(0xFF6600);

            const backButton = new ActionRowBuilder<ButtonBuilder>()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId(`admin_back_${interaction.user.id}`)
                  .setLabel("← Back to Main")
                  .setStyle(ButtonStyle.Secondary)
              );

            await interaction.update({ embeds: [embed], components: [backButton] });
            
          } else if (customId.includes("admin_stats_")) {
            // Statistics Panel
            const embed = new EmbedBuilder()
              .setTitle("📊 Statistics Panel")
              .setDescription(
                "**Bot Statistics:**\n\n" +
                `🎵 **Active Players:** ${client.manager.players.size}\n` +
                `🌐 **Total Servers:** ${client.guilds.cache.size}\n` +
                `👥 **Total Users:** ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\n` +
                `⭐ **Premium Users:** Check with \`.premstatus\`\n` +
                `🔗 **WebSocket Ping:** ${client.ws.ping}ms\n` +
                `💾 **Memory Usage:** ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB\n` +
                `⏱️ **Bot Uptime:** ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m\n\n` +
                "**Performance:** Optimal ✅"
              )
              .setColor(0x00AA00);

            const backButton = new ActionRowBuilder<ButtonBuilder>()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId(`admin_back_${interaction.user.id}`)
                  .setLabel("← Back to Main")
                  .setStyle(ButtonStyle.Secondary)
              );

            await interaction.update({ embeds: [embed], components: [backButton] });
            
          } else if (customId.includes("admin_back_")) {
            // Back to main admin panel
            const embed = new EmbedBuilder()
              .setColor(0x9966FF)
              .setTitle("🛠️ Rhythm Bot - Admin Control Panel")
              .setDescription(
                `**Welcome to the Admin Panel!**\n` +
                `Select a category below to manage the bot:\n\n` +
                `🎵 **Bot Management** - Status, restart, logs\n` +
                `⭐ **Premium Controls** - Manage user/guild tiers\n` +
                `🔧 **Bot Settings** - Avatar, name, data\n` +
                `💻 **Developer Tools** - Debug, eval, register\n` +
                `📊 **Statistics** - Bot info, premium stats\n\n` +
                `**Current Status:** ${client.ws.ping}ms ping | ${client.guilds.cache.size} servers`
              )
              .setThumbnail(client.user?.displayAvatarURL())
              .setFooter({
                text: `Admin: ${interaction.user.username} | Use buttons below to navigate`,
                iconURL: interaction.user.displayAvatarURL()
              })
              .setTimestamp();

            const mainRow = new ActionRowBuilder<ButtonBuilder>()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId(`admin_bot_${interaction.user.id}`)
                  .setLabel("Bot Management")
                  .setEmoji("🎵")
                  .setStyle(ButtonStyle.Primary),
                    
                new ButtonBuilder()
                  .setCustomId(`admin_premium_${interaction.user.id}`)
                  .setLabel("Premium Controls")
                  .setEmoji("⭐")
                  .setStyle(ButtonStyle.Primary),
                    
                new ButtonBuilder()
                  .setCustomId(`admin_settings_${interaction.user.id}`)
                  .setLabel("Bot Settings")
                  .setEmoji("🔧")
                  .setStyle(ButtonStyle.Secondary),
                    
                new ButtonBuilder()
                  .setCustomId(`admin_dev_${interaction.user.id}`)
                  .setLabel("Developer Tools")
                  .setEmoji("💻")
                  .setStyle(ButtonStyle.Secondary),
                    
                new ButtonBuilder()
                  .setCustomId(`admin_stats_${interaction.user.id}`)
                  .setLabel("Statistics")
                  .setEmoji("📊")
                  .setStyle(ButtonStyle.Success)
              );

            await interaction.update({ embeds: [embed], components: [mainRow] });
          }
          return;
        }
        
        // Handle unknown buttons
        if (interaction.isRepliable() && !interaction.deferred && !interaction.replied) {
          await interaction.reply({ 
            content: "Unknown button interaction.", 
            flags: MessageFlags.Ephemeral 
          });
        }
        return;
      }

    } catch (err) {
      try {
        if (interaction.isRepliable()) {
          if (!interaction.deferred && !interaction.replied) {
            await interaction.reply({
              content: "An error occurred while executing this command.",
              flags: MessageFlags.Ephemeral,
            });
          } else if (interaction.deferred && !interaction.replied) {
            await interaction.editReply({ content: "An error occurred while executing this command." });
          }
        }
      } catch {}
      client.logger.error("interaction handler error", err);
    }
  });

  // Lazy-init a collection for slash handlers if it doesn't exist
  if (!(client as any).slash) {
    (client as any).slash = new Map<string, any>();
  }
}
