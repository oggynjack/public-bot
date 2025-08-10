import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";
import { SimpleAutoAI } from "@/services/SimpleAutoAI";
import config from "@/config";

export const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Play a song from SoundCloud/YouTube/Spotify or a direct link")
  .addStringOption(opt =>
    opt.setName("query")
      .setDescription("Song name or URL")
      .setRequired(true)
      .setAutocomplete(true), // Enable autocomplete for premium users
  );

export const autocomplete = async (interaction: any, client: ExtendedClient) => {
  try {
    const focusedValue = interaction.options.getFocused();
    if (!focusedValue || focusedValue.length < 2) {
      return interaction.respond([]);
    }

    // Check user's tier for auto-suggestions
    const userId = interaction.user.id;
    const guildId = interaction.guild?.id;
    
    if (!guildId) {
      return interaction.respond([]);
    }

    const tier = await client.premium.getEffectiveTier(userId, guildId);
    
    // Only provide auto-suggestions for premium users
    if (tier === "free") {
      return interaction.respond([]);
    }

    try {
      // Initialize SimpleAutoAI for premium suggestions
      const autoAI = new SimpleAutoAI(client);
      
      // Get AI-powered suggestions for premium users
      const aiSuggestions = await autoAI.getAutoSuggestions(focusedValue, userId, guildId);
      
      // If AI suggestions available, use them; otherwise fallback to enhanced suggestions
      let suggestions: string[];
      if (aiSuggestions && aiSuggestions.length > 0) {
        suggestions = aiSuggestions;
        autoAI.logActivity(guildId, "Autocomplete AI", `Provided ${aiSuggestions.length} AI suggestions`);
      } else {
        // Enhanced fallback suggestions for premium users
        suggestions = [
          `${focusedValue} official`,
          `${focusedValue} lyrics`,
          `${focusedValue} remix`,
          `${focusedValue} acoustic`,
          `${focusedValue} live`,
          `${focusedValue} instrumental`,
          `${focusedValue} cover`,
          `${focusedValue} karaoke`
        ];
      }

      const maxSuggestions = tier === "premiumplus" ? 10 : 5;
      const choices = suggestions.slice(0, maxSuggestions).map(suggestion => ({
        name: suggestion.length > 100 ? suggestion.substring(0, 97) + "..." : suggestion,
        value: suggestion
      }));

      await interaction.respond(choices);
    } catch (aiError) {
      console.error("[Autocomplete AI Error]:", aiError);
      
      // Fallback to simple suggestions on AI error
      const fallbackSuggestions = [
        `${focusedValue} official`,
        `${focusedValue} remix`,
        `${focusedValue} acoustic`
      ];
      const choices = fallbackSuggestions.map(suggestion => ({
        name: suggestion,
        value: suggestion
      }));
      await interaction.respond(choices);
    }
  } catch (error: any) {
    console.error("[Play Autocomplete Error]:", error.message);
    // Final fallback - empty response
    await interaction.respond([]);
  }
};

export const execute = withCommandLogging("play", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    // Use a single immediate reply to avoid /callback deferral races (fixes 10062 Unknown interaction)
    // Then only edit that message afterward.
    const initial = await interaction.reply({ content: "🔍 Searching..." });
    // Guard flag for downstream error handling
    (interaction as any).__ack = true;

    const queryRaw = interaction.options.getString("query", true);

    // Resolve VC of user
    const member = await interaction.guild?.members.fetch(interaction.user.id).catch(() => null);
    const voice = member?.voice?.channel;
    if (!voice) {
      await interaction.editReply({ content: "You must join a voice channel first." });
      return;
    }

    // Get user's premium tier (already declared above)
    // const userTier = await premiumService.getEffectiveTier(interaction.user.id, interaction.guildId!);

    // Manager/player
    let player =
      client.manager.getPlayer(interaction.guildId!) ||
      client.manager.createPlayer({
        guildId: interaction.guildId!,
        voiceChannelId: voice.id,
        textChannelId: interaction.channelId,
        selfMute: false,
        selfDeaf: true,
        vcRegion: (voice as any).rtcRegion ?? undefined,
      });

    if (!player.connected) await player.connect();

    // YouTube-only search for testing
    const isUrl = /^(https?:\/\/)/i.test(queryRaw);
    const hasPrefix = /^(ytmsearch:|ytsearch:|scsearch:|spsearch:)/i.test(queryRaw);
    
    let query = queryRaw;
    if (!isUrl && !hasPrefix) {
      // Force YouTube search only
      query = `ytsearch:${queryRaw}`;
    }

    let res;
    try {
      res = await client.search.search(player, { query }, interaction.user);
    } catch (searchError) {
      client.logger.error("Search error in /play:", searchError);
      await interaction.editReply({ content: "Failed to search for the song. Please try again." });
      return;
    }

    if (!res || !res.tracks?.length) {
      await interaction.editReply({ content: "No results found on any platform." });
      return;
    }

    // Check user tier for queue behavior
    const userTier = await client.premium.getEffectiveTier(
      interaction.user.id,
      interaction.guildId!
    );

    // For free users: immediate song switching (no queue system)
    if (userTier === "free") {
      // Free users get immediate song replacement - no queue limits needed
      const tracks = res.loadType === "playlist" ? [res.tracks[0]] : [res.tracks[0]]; // Only first track
      
      // Clear any existing queue and play immediately
      if (player.queue && player.queue.tracks) {
        while (player.queue.tracks.length > 0) {
          player.queue.tracks.shift();
        }
      }
      
      await player.queue.add(tracks[0]);
      await player.play({ paused: false });
      
      // For free users, show a simple embed since they don't get interactive buttons
      const embed = new EmbedBuilder()
        .setColor(client.color.main)
        .setDescription(`▶️ **Now Playing:** [${tracks[0].info.title}](${tracks[0].info.uri})\n\n` +
          `💎 **Upgrade to Premium** for queue system, playlists, and more!\n` +
          `📞 Contact <@730818959112274040> for premium access.`);
      
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    // Premium users: normal queue behavior
    // Determine pre-add queue size to suppress first-queued message
    const queueSizeBefore =
      (player.queue && typeof (player.queue as any).size === "number" && (player.queue as any).size) ||
      (player.queue && typeof (player.queue as any).length === "number" && (player.queue as any).length) ||
      0;

    // Check queue limits before adding tracks
    const tracks = res.loadType === "playlist" ? res.tracks : res.tracks.slice(0, 3);
    const queueCheck = await client.quality.canAddToQueue(
      interaction.user.id,
      interaction.guildId!,
      queueSizeBefore,
      tracks.length
    );

    if (!queueCheck.allowed) {
      const premiumCheck = await client.quality.checkPremiumRequirement(
        interaction.user.id,
        interaction.guildId!,
        'queue',
        queueSizeBefore + tracks.length
      );

      await interaction.editReply({
        content: `❌ **Queue Limit Exceeded**\n\n${queueCheck.reason}\n` +
          `**Remaining slots:** ${queueCheck.remaining}\n\n` +
          `💎 **Upgrade to ${client.quality.generateTierInfo(premiumCheck.requiredTier!).name}** for larger queues!\n` +
          `📞 Contact <@730818959112274040> for premium access.`
      });
      return;
    }

    // For search results, add first 3 tracks as fallbacks in case first one fails
    await player.queue.add(tracks);

    // Auto-add AI suggestions for Premium/Premium+ users using full AI system
    if (userTier === "premium" || userTier === "premiumplus") {
      const mainTrack = tracks[0];
      
      try {
        // Initialize the AI system
        const autoAI = new SimpleAutoAI(client);
        
        // Record that user used play command for AI tracking
        autoAI.recordPlayCommand(interaction.guildId!);
        
        // Get AI-powered suggestions after a delay to let the song start
        setTimeout(async () => {
          try {
            // Get AI suggestions based on the played track
            const aiSuggestions = await autoAI.getAutoSuggestions(
              mainTrack.info.title,
              interaction.user.id,
              interaction.guildId!
            );
            
            if (aiSuggestions.length > 0) {
              let addedCount = 0;
              const maxSuggestions = userTier === "premiumplus" ? 3 : 2; // Premium+ gets more suggestions
              
              for (const suggestion of aiSuggestions.slice(0, maxSuggestions)) {
                try {
                  const suggestionRes = await player.search({ 
                    query: `ytsearch:${suggestion}` 
                  }, interaction.user);
                  
                  if (suggestionRes && suggestionRes.tracks?.length > 0) {
                    // Check queue space before adding
                    const currentQueueSize = player.queue.tracks.length;
                    const maxQueue = userTier === "premium" ? 100 : 500; // Premium vs Premium+
                    
                    if (currentQueueSize < maxQueue) {
                      await player.queue.add(suggestionRes.tracks[0]);
                      addedCount++;
                      
                      // Log AI activity
                      autoAI.logActivity(interaction.guildId!, "Auto-Add", 
                        `Added AI suggestion: ${suggestionRes.tracks[0].info.title}`);
                    } else {
                      // Queue is full, stop adding
                      break;
                    }
                  }
                } catch (err) {
                  console.error("Error adding AI suggestion:", err);
                }
              }
              
              // Notify if AI suggestions were added
              if (addedCount > 0) {
                autoAI.logActivity(interaction.guildId!, "AI Complete", 
                  `Added ${addedCount} AI suggestions for ${userTier} user`);
              }
            }
          } catch (error) {
            console.error("Error in AI auto-suggestions:", error);
          }
        }, 3000); // 3 second delay
        
      } catch (aiError) {
        console.error("Error initializing AI system:", aiError);
        
        // Fallback to simple suggestions if AI fails
        setTimeout(async () => {
          try {
            const baseName = mainTrack.info.title.split(/[-–—|()[\]]/)[0].trim();
            const fallbackSuggestions = [
              `${baseName} remix`,
              `${baseName} instrumental`,
            ];
            
            for (const suggestion of fallbackSuggestions.slice(0, 1)) { // Just 1 fallback
              try {
                const suggestionRes = await player.search({ 
                  query: `ytsearch:${suggestion}` 
                }, interaction.user);
                
                if (suggestionRes && suggestionRes.tracks?.length > 0) {
                  const currentQueueSize = player.queue.tracks.length;
                  const maxQueue = userTier === "premium" ? 100 : 500;
                  
                  if (currentQueueSize < maxQueue) {
                    await player.queue.add(suggestionRes.tracks[0]);
                  }
                }
              } catch (err) {
                console.error("Error adding fallback suggestion:", err);
              }
            }
          } catch (error) {
            console.error("Error in fallback suggestions:", error);
          }
        }, 3000);
      }
    }

    // If nothing was playing and queue was empty before, start without sending "Queued" message
    if (!player.playing && queueSizeBefore === 0) {
      await player.play({ paused: false });
      const embed = new EmbedBuilder()
        .setColor(client.color.main)
        .setDescription("▶️ Starting playback...");
      await interaction.editReply({ embeds: [embed] });
      return;
    }

    // Otherwise, send confirmation with embed
    const embed = new EmbedBuilder().setColor(client.color.main);
    
    if (res.loadType === "playlist") {
      embed.setDescription(`➕ Queued ${res.tracks.length} tracks from playlist`);
    } else {
      const t = res.tracks[0].info;
      embed.setDescription(`➕ Queued: ${t.title}`);
    }
    
    await interaction.editReply({ embeds: [embed] });
  } catch (err: any) {
    client.logger.error("slash /play error details:", {
      message: err?.message || "No message",
      stack: err?.stack || "No stack trace",
      name: err?.name || "No error name",
      error: err
      
    });
    try {
      // Prefer editing the initial reply to avoid 40060
      if ((interaction as any).__ack || interaction.replied || interaction.deferred) {
        await interaction.editReply({ content: "An error occurred while executing /play. Please check the logs for details." });
      } else if (!interaction.deferred && !interaction.replied) {
        await interaction.reply({ content: "An error occurred while executing /play. Please check the logs for details." });
      }
    } catch (replyError) {
      client.logger.error("Failed to send error reply:", replyError);
    }
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute, autocomplete });
}
