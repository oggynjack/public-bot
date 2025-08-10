import prefix from "@/layouts/prefix";
import { EmbedBuilder } from "discord.js";
import { Category } from "@/typings/utils";
import { T } from "@/handlers/i18n";

export default prefix(
    "stop",
    {
        description: {
            content: "desc.stop",
            examples: ["stop"],
            usage: "stop",
        },
        aliases: ["st"],
        cooldown: "5s",
        voiceOnly: true,
        sameRoom: true,
        botPermissions: [
            "SendMessages",
            "ReadMessageHistory",
            "ViewChannel",
            "EmbedLinks",
        ],
        ignore: false,
        category: Category.music,
    },
    async (client, guild, user, message, args) => {
        const player = client.manager.getPlayer(message.guildId);

        if (!player) {
            const embed = new EmbedBuilder()
                .setColor(client.color.red)
                .setDescription(T(guild.language, "error.voice.no_connect"));
            return await message.channel.send({ embeds: [embed] });
        }

        // Stop the current track and clear the queue
        if (player.queue.tracks.length > 0) {
            player.queue.tracks.splice(0, player.queue.tracks.length);
        }
        await player.destroy();
        
        return await message.react(client.emoji.done);
    },
);
