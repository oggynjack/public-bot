import prefix from "@/layouts/prefix";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import fs from "fs";
import path from "path";

export default prefix(
    "logs",
    {
        description: {
            content: "Show recent bot logs and errors",
            usage: "logs [type] [lines]",
            examples: ["logs", "logs error 50", "logs out 100"],
        },
        aliases: ["log"],
        specialRole: "dev",
        category: Category.dev,
        hidden: true,
    },
    async (client, guild, user, message, args) => {
        const embed = new EmbedBuilder();
        const logType = args[0]?.toLowerCase() || "error";
        const lines = Math.min(parseInt(args[1]) || 20, 100); // Max 100 lines

        try {
            let logFile: string;
            let logName: string;

            switch (logType) {
                case "error":
                case "err":
                    logFile = path.join(process.cwd(), "logs", "bot-error-0.log");
                    logName = "Error Log";
                    break;
                case "out":
                case "output":
                    logFile = path.join(process.cwd(), "logs", "bot-out-0.log");
                    logName = "Output Log";
                    break;
                case "service":
                    logFile = path.join(process.cwd(), "logs", "service-error.log");
                    logName = "Service Log";
                    break;
                default:
                    logFile = path.join(process.cwd(), "logs", "bot-error-0.log");
                    logName = "Error Log";
            }

            if (!fs.existsSync(logFile)) {
                return await message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.red)
                            .setDescription(`❌ Log file not found: ${logName}`)
                    ]
                });
            }

            const logContent = fs.readFileSync(logFile, "utf-8");
            const logLines = logContent.split('\n').filter(line => line.trim());
            const recentLines = logLines.slice(-lines);

            if (recentLines.length === 0) {
                return await message.channel.send({
                    embeds: [
                        embed
                            .setColor(client.color.main)
                            .setTitle(`📄 ${logName} (Empty)`)
                            .setDescription("No log entries found")
                    ]
                });
            }

            const logText = recentLines.join('\n');

            // If log is short enough, show in embed
            if (logText.length <= 1900) {
                embed
                    .setColor(client.color.main)
                    .setTitle(`📄 ${logName} (Last ${recentLines.length} lines)`)
                    .setDescription(`\`\`\`\n${logText}\n\`\`\``)
                    .setTimestamp();

                await message.channel.send({ embeds: [embed] });
            } else {
                // If log is too long, send as file
                const fileName = `${logType}-${new Date().toISOString().slice(0, 10)}.log`;
                const attachment = new AttachmentBuilder(Buffer.from(logText), { name: fileName });

                embed
                    .setColor(client.color.main)
                    .setTitle(`📄 ${logName}`)
                    .setDescription(`Log is too long for embed. Showing last ${recentLines.length} lines as attachment.`)
                    .setTimestamp();

                await message.channel.send({ 
                    embeds: [embed],
                    files: [attachment]
                });
            }

            // Show log file stats
            const stats = fs.statSync(logFile);
            const sizeKB = Math.round(stats.size / 1024);
            const modified = new Date(stats.mtime);

            const statsEmbed = new EmbedBuilder()
                .setColor(client.color.gray)
                .setDescription(`📊 **File:** ${path.basename(logFile)} | **Size:** ${sizeKB}KB | **Modified:** <t:${Math.floor(modified.getTime() / 1000)}:R>`)
                .setFooter({ text: "Available types: error, out, service" });

            await message.channel.send({ embeds: [statsEmbed] });

        } catch (error) {
            console.error("Error in logs command:", error);
            await message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color.red)
                        .setDescription("❌ Error reading log files")
                ]
            });
        }
    }
);
