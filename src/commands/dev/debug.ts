import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import config from "@/config";

export default prefix(
    "debug",
    {
        description: {
            content: "Debug information for all systems",
            usage: "debug [type]",
            examples: ["debug", "debug redis", "debug premium"],
        },
        aliases: ["dbg"],
        specialRole: "dev",
        category: Category.dev,
        hidden: true,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder().setColor(client.color.main);

        const type = args[0]?.toLowerCase() || "all";

        try {
            if (type === "all") {
                // Show comprehensive debug info
                const userPremium = await client.premium.getUserPremium(message.author.id);
                const guildPremium = message.guildId ? await client.premium.getGuildPremium(message.guildId) : null;
                const effectiveTier = message.guildId ? await client.premium.getEffectiveTier(message.author.id, message.guildId) : userPremium.premiumTier;
                const cacheStats = await client.search?.getCacheStats?.() || null;
                const memUsage = process.memoryUsage();

                embed
                    .setTitle("🔧 Complete System Debug")
                    .addFields(
                        {
                            name: "🔴 Redis Status",
                            value: [
                                `**Connected:** ${client.redis?.isConnected() ? "✅ Yes" : "❌ No"}`,
                                `**Status:** ${client.redis ? "✅ Initialized" : "❌ Not initialized"}`
                            ].join('\n'),
                            inline: true
                        },
                        {
                            name: "💎 Premium Info",
                            value: [
                                `**Your Tier:** ${userPremium.premiumTier}`,
                                `**Guild Tier:** ${guildPremium?.premiumTier || "Free"}`,
                                `**Effective:** ${effectiveTier}`
                            ].join('\n'),
                            inline: true
                        },
                        {
                            name: "📊 Cache Stats",
                            value: cacheStats ? [
                                `**Hits:** ${cacheStats.hits}`,
                                `**Misses:** ${cacheStats.misses}`,
                                `**Hit Rate:** ${((cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100).toFixed(1)}%`
                            ].join('\n') : "Cache not available",
                            inline: true
                        },
                        {
                            name: "🖥️ System Info",
                            value: [
                                `**Memory:** ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
                                `**Uptime:** ${Math.floor(process.uptime())}s`,
                                `**PID:** ${process.pid}`
                            ].join('\n'),
                            inline: true
                        },
                        {
                            name: "🤖 Bot Status", 
                            value: [
                                `**Guilds:** ${client.guilds.cache.size}`,
                                `**Users:** ${client.users.cache.size}`,
                                `**Music:** ${client.manager.players.size} players`
                            ].join('\n'),
                            inline: true
                        },
                        {
                            name: "🎵 Music Info",
                            value: [
                                `**Lavalink:** ${client.manager.nodeManager.nodes.size} nodes`,
                                `**Connected:** ${Array.from(client.manager.nodeManager.nodes.values()).filter((n: any) => n.connected).length}`,
                                `**Active Players:** ${client.manager.players.filter((p: any) => p.playing).size}`
                            ].join('\n'),
                            inline: true
                        }
                    )
                    .setTimestamp()
                    .setFooter({ text: "Use 'debug <type>' for specific info: redis, premium, cache, system" });

                return await message.channel.send({ embeds: [embed] });
            }

            switch (type) {
                case "redis":
                    embed
                        .setTitle("🔴 Redis Status")
                        .addFields(
                            { 
                                name: "Connected", 
                                value: client.redis?.isConnected() ? "✅ Yes" : "❌ No", 
                                inline: true 
                            },
                            { 
                                name: "URL", 
                                value: config.redis?.url || "Not configured", 
                                inline: true 
                            },
                            {
                                name: "Status",
                                value: client.redis ? "✅ Initialized" : "❌ Not initialized",
                                inline: true
                            }
                        );
                    break;

                case "premium":
                    const userPremium = await client.premium.getUserPremium(message.author.id);
                    const guildPremium = message.guildId ? await client.premium.getGuildPremium(message.guildId) : null;
                    const effectiveTier = message.guildId ? await client.premium.getEffectiveTier(message.author.id, message.guildId) : userPremium.premiumTier;
                    
                    embed
                        .setTitle("💎 Premium Debug")
                        .addFields(
                            { 
                                name: "Your Premium", 
                                value: `Tier: ${userPremium.premiumTier}\nActive: ${userPremium.isPremium ? "✅" : "❌"}`, 
                                inline: true 
                            },
                            { 
                                name: "Guild Premium", 
                                value: guildPremium ? `Tier: ${guildPremium.premiumTier}\nActive: ${guildPremium.isPremium ? "✅" : "❌"}` : "No guild data", 
                                inline: true 
                            },
                            { 
                                name: "Effective Tier", 
                                value: effectiveTier, 
                                inline: true 
                            }
                        );
                    break;

                case "cache":
                    const cacheStats = await client.search?.getCacheStats?.() || null;
                    embed
                        .setTitle("📊 Search Cache Debug")
                        .addFields(
                            { 
                                name: "Cache Hits", 
                                value: cacheStats ? cacheStats.hits.toString() : "N/A", 
                                inline: true 
                            },
                            { 
                                name: "Cache Misses", 
                                value: cacheStats ? cacheStats.misses.toString() : "N/A", 
                                inline: true 
                            },
                            { 
                                name: "Hit Rate", 
                                value: cacheStats && (cacheStats.hits + cacheStats.misses) > 0 ? 
                                    `${((cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100).toFixed(1)}%` : "N/A", 
                                inline: true 
                            }
                        );
                    break;

                case "system":
                    const memUsage = process.memoryUsage();
                    embed
                        .setTitle("🖥️ System Debug")
                        .addFields(
                            {
                                name: "Memory Usage",
                                value: [
                                    `**Heap Used:** ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
                                    `**Heap Total:** ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
                                    `**RSS:** ${Math.round(memUsage.rss / 1024 / 1024)}MB`
                                ].join('\n'),
                                inline: true
                            },
                            {
                                name: "Process Info",
                                value: [
                                    `**PID:** ${process.pid}`,
                                    `**Uptime:** ${Math.floor(process.uptime())}s`,
                                    `**Node Version:** ${process.version}`
                                ].join('\n'),
                                inline: true
                            }
                        );
                    break;

                default:
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Invalid debug type.** Available: `redis`, `premium`, `cache`, `system`");
            }

            embed.setTimestamp();
            return await message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error("Debug command error:", error);
            return await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ **Error retrieving debug information.**")
                ],
            });
        }
    },
);
