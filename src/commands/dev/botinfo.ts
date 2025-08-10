import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import os from "os";

export default prefix(
    "botinfo",
    {
        description: {
            content: "Show detailed bot information and statistics",
            usage: "botinfo",
            examples: ["botinfo"],
        },
        aliases: ["bi", "info"],
        specialRole: "dev",
        category: Category.dev,
        hidden: true,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder();

        // Get system information
        const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
        const usedMemory = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
        const uptime = process.uptime();

        // Format uptime
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Get guild and user counts
        const guildCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

        // Get command counts
        const prefixCommands = client.collection.prefixcommands.size;
        const slashCommands = client.collection.slashcommands.size;

        // Get music player stats
        const musicPlayers = client.manager.players.size;
        const activePlayers = Array.from(client.manager.players.values()).filter((p: any) => p.playing).length;
        
        // Calculate total queue size
        let totalQueueSize = 0;
        for (const player of client.manager.players.values()) {
            totalQueueSize += (player as any).queue.tracks.length || 0;
        }

        embed
            .setTitle("🤖 Bot Information")
            .setColor(client.color.main)
            .setThumbnail(client.user?.displayAvatarURL())
            .addFields(
                {
                    name: "📊 Statistics",
                    value: [
                        `**Guilds:** ${guildCount.toLocaleString()}`,
                        `**Users:** ${userCount.toLocaleString()}`,
                        `**Commands:** ${prefixCommands + slashCommands} (${prefixCommands} prefix, ${slashCommands} slash)`,
                    ].join('\n'),
                    inline: true
                },
                {
                    name: "🎵 Music Stats",
                    value: [
                        `**Players:** ${musicPlayers}`,
                        `**Active:** ${activePlayers}`,
                        `**Queue Size:** ${totalQueueSize}`,
                    ].join('\n'),
                    inline: true
                },
                {
                    name: "💻 System Info",
                    value: [
                        `**Node.js:** ${process.version}`,
                        `**Platform:** ${os.platform()} ${os.arch()}`,
                        `**CPU:** ${os.cpus()[0].model}`,
                    ].join('\n'),
                    inline: false
                },
                {
                    name: "📈 Performance",
                    value: [
                        `**Memory:** ${usedMemory}MB / ${totalMemory}MB`,
                        `**Uptime:** ${uptimeString}`,
                        `**Ping:** ${client.ws.ping}ms`,
                    ].join('\n'),
                    inline: true
                },
                {
                    name: "🔧 Technical",
                    value: [
                        `**Discord.js:** ${require('discord.js').version}`,
                        `**Bot Version:** ${process.env.npm_package_version || 'Unknown'}`,
                        `**Process ID:** ${process.pid}`,
                    ].join('\n'),
                    inline: true
                }
            )
            .setFooter({
                text: `Requested by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL()
            })
            .setTimestamp();

        return await message.channel.send({ embeds: [embed] });
    },
);
