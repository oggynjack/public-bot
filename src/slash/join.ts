import type ExtendedClient from "@/classes/ExtendedClient";
import type { ChatInputCommandInteraction, VoiceBasedChannel } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import { withCommandLogging } from "@/helpers/commandLogger";

export const data = new SlashCommandBuilder()
  .setName("join")
  .setDescription("Make the bot join your current voice channel");

export const execute = withCommandLogging("join", async (interaction: ChatInputCommandInteraction, client: ExtendedClient) => {
  try {
    await interaction.deferReply();

    const member = await interaction.guild?.members.fetch(interaction.user.id).catch(() => null);
    const voice = member?.voice?.channel as VoiceBasedChannel | null | undefined;
    if (!voice) {
      await interaction.editReply({ content: "You must join a voice channel first." });
      return;
    }

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

    if (!player.connected) {
      await player.connect();
    }

    await interaction.editReply({ content: `Joined <#${voice.id}>.` });
  } catch (err) {
    client.logger.error("slash /join error", err);
    try { await interaction.editReply({ content: "An error occurred while executing /join." }); } catch {}
  }
});

// Helper to register into client at runtime
export default function register(client: ExtendedClient) {
  if (!(client as any).slash) (client as any).slash = new Map<string, any>();
  (client as any).slash.set(data.name, { data, execute });
}
