import config from "@/config";
import prefix from "@/layouts/prefix";
import { EmbedBuilder, userMention } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "help",
    {
        description: {
            content: "desc.help",
            examples: ["help", "help play"],
            usage: "help (cmd)",
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
        const embed = new EmbedBuilder();
        const commands = client.collection.prefixcommands.filter(
            (f) => !f.options.hidden && !f.options.ignore,
        );
        const categories = [
            Category.music,
            Category.filters, 
            Category.info,
            Category.playlist,
            "guildowner",
            "dev"
        ].filter(cat => commands.some(cmd => cmd.options.category === cat));

        if (args[0]) {
            const command = commands.get(args[0].toLowerCase());
            if (!command) {
                return await message.channel.send({
                    embeds: [
                        embed.setColor(client.color.red).setDescription(
                            T(guild.language, "error.cmd.not_found", {
                                cmd: args[0],
                            }),
                        ),
                    ],
                });
            }

            const helpEmbed = embed
                .setColor(client.color.main)
                .setAuthor({
                    iconURL: message.guild.iconURL() || undefined,
                    name: `${T(guild.language, "help.title")} - ${command.name}`,
                })
                .setDescription(
                    T(guild.language, "help.detail", {
                        content: T(guild.language, command.options.description.content),
                        usage: `${client.prefix} ${command.options.description.usage}`,
                        examples: command.options.description.examples
                            .map((example) => `\`${client.prefix}${example}\``)
                            .join(", "),
                        aliases:
                            command.options.aliases
                                ?.map((alias) => `\`${alias}\``)
                                .join(", ") || T(guild.language, "use_many.dont_have"),
                        cooldown: command.options.cooldown,
                    }),
                )
                .setFooter({
                    iconURL: message.author.displayAvatarURL(),
                    text: `@${message.author.username}`,
                })
                .setTimestamp();

            return await message.channel.send({ embeds: [helpEmbed] });
        }

        // Category emoji mapping
        const categoryEmojis: Record<string, string> = {
            [Category.music]: "🎵",
            [Category.filters]: "🎚️", 
            [Category.info]: "ℹ️",
            [Category.playlist]: "📋",
            "guildowner": "👑",
            "dev": "🔧"
        };

        const categoryNames: Record<string, string> = {
            [Category.music]: "Music Controls",
            [Category.filters]: "Audio Filters", 
            [Category.info]: "Information & Help",
            [Category.playlist]: "Playlist Management",
            "guildowner": "Guild Owner Controls",
            "dev": "Developer Tools"
        };

        const fields = categories.map((category) => ({
            name: `${categoryEmojis[category]} **${categoryNames[category] || category}**`,
            value: commands
                .filter((cmd) => cmd.options.category === category)
                .map((cmd) => `\`${cmd.name}\``)
                .join(" • ") || "No commands available",
            inline: false,
        }));

        const helpEmbed = embed
            .setColor(0x9966FF)
            .setTitle("🎵 Rhythm Bot - Command Help")
            .setDescription(
                `**Welcome to Rhythm!** The ultimate music bot with AI-powered recommendations.\n\n` +
                `**Rhythm Owners:** @OGGY & @! </Abhinav>\n` +
                `**Discord:** https://discord.gg/AkAsgygQRQ\n` +
                `**Bot Prefix:** \`${client.prefix}\`\n\n` +
                `**🆓 Free Tier:** Basic music playback\n` +
                `**⭐ Premium Tier:** Advanced features, filters, playlists\n` +
                `**💎 Premium+ Tier:** Everything + VIP support\n\n` +
                `Use \`${client.prefix}premium\` to check your tier!`
            )
            .setFooter({
                text: `Use ${client.prefix}help <command> for detailed command info • Total Commands: ${commands.size}`,
                iconURL: client.user.displayAvatarURL()
            })
            .addFields(...fields)
            .setTimestamp();

        return await message.channel.send({ embeds: [helpEmbed] });
    },
);
