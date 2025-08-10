import config from "@/config";
import prefix from "@/layouts/prefix";
import { EmbedBuilder, time } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "premium",
    {
        description: {
            content: "Check premium status for both user and guild",
            examples: ["premium"],
            usage: "premium",
        },
        cooldown: "5s",
        botPermissions: [
            "SendMessages",
            "ReadMessageHistory",
            "ViewChannel",
            "EmbedLinks",
        ],
        ignore: false,
        category: Category.info,
    },
    async (client, guild, user, message, args) => {
        // Check user premium status
        const userTier = await client.premium.getUserTier(message.author.id, message.guildId!);
        const guildTier = await client.premium.getGuildTier(message.guildId!);
        
        const embed = new EmbedBuilder()
            .setColor(0x9966FF)
            .setTitle("🎵 Rhythm Premium Tiers")
            .setDescription(`**Your Current User Tier:** ${userTier === "free" ? "🆓 Free" : userTier === "premium" ? "⭐ Premium" : "💎 Premium+"}\n**Guild Tier:** ${guildTier === "free" ? "🆓 Free" : guildTier === "premium" ? "⭐ Premium" : "💎 Premium+"}\n\nChoose the perfect tier for your music experience!`)
            .addFields([
                {
                    name: "🆓 Free Tier",
                    value: "**Audio Quality:** 64kbps\n**Volume Control:** Up to 100%\n**Queue System:** ❌ Not Available\n**Playlists:** ❌ Not Available\n**Audio Filters:** ❌ Not Available\n**Commands:** Play, Pause, Resume only\n**Features:** Basic playback with immediate song switching\n**Multi-Language:** ❌ English only\n**Bot Controls:** ❌ Not Available\n**Price:** Free forever",
                    inline: true
                },
                {
                    name: "⭐ Premium Tier ($4.99/month)",
                    value: "**Audio Quality:** 256kbps\n**Volume Control:** Up to 150%\n**Queue System:** ✅ Up to 100 tracks\n**Playlists:** ✅ Up to 10 playlists\n**Audio Filters:** ✅ All filters available\n**Simultaneous Filters:** Up to 3\n**Commands:** All music commands\n**Multi-Language:** ✅ 15 languages\n**Bot Controls:** ✅ Full access\n**Features:** Queue, Autoplay, Shuffle, Filters",
                    inline: true
                },
                {
                    name: "💎 Premium+ Tier ($9.99/month)",
                    value: "**Audio Quality:** 320kbps (Highest)\n**Volume Control:** Up to 200%\n**Queue System:** ✅ Up to 200 tracks\n**Playlists:** ✅ Up to 25 playlists\n**Audio Filters:** ✅ All filters available\n**Simultaneous Filters:** Up to 5\n**Commands:** All commands + Priority\n**Multi-Language:** ✅ 15 languages + Priority\n**Bot Controls:** ✅ + Avatar/Name change\n**Features:** Everything + VIP Support",
                    inline: true
                },
                {
                    name: "🎵 What Free Users Get",
                    value: "• Basic play/pause/resume commands\n• 64kbps audio quality\n• One song at a time (immediate switching)\n• Community support\n• English language only",
                    inline: false
                },
                {
                    name: "🚀 Premium Benefits",
                    value: "• High-quality audio (256kbps/320kbps)\n• Queue system with multiple tracks\n• Create and manage playlists\n• Audio filters (bassboost, 8D, nightcore, etc.)\n• Volume control beyond 100%\n• Autoplay and shuffle features\n• 15 international languages support\n• Advanced bot control panels\n• Priority support",
                    inline: false
                },
                {
                    name: "💎 Premium+ Exclusive",
                    value: "• Custom bot avatar/name per guild\n• VIP 24/7 support\n• Advanced AI music recommendations\n• Exclusive Punjabi music detection\n• Priority queue processing\n• Beta feature access",
                    inline: false
                },
                {
                    name: "💬 Support & Contact",
                    value: "**Free:** Community support via Discord\n**Premium:** Priority support with faster response\n**Premium+:** VIP 24/7 support with immediate assistance\n\n**Rhythm Owners:** @OGGY & @! </Abhinav>\n**Join our Discord:** https://discord.gg/AkAsgygQRQ",
                    inline: false
                }
            ])
            .setFooter({ 
                text: "Upgrade today for the ultimate music experience!", 
                iconURL: client.user.displayAvatarURL() 
            })
            .setTimestamp();

        return message.reply({ embeds: [embed] });
    }
);
