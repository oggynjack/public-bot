import { T } from "@/handlers/i18n";
import event from "@/layouts/event";
import { BaseInteraction, Collection, EmbedBuilder, type Interaction } from "discord.js";
import type ExtendedClient from "@/classes/ExtendedClient";

/**
 * Utility to safely send a single acknowledgment to an interaction.
 * Will choose reply or editReply based on current state and avoid double-acks.
 */
const safeRespond = async (
    interaction: any,
    payload: any,
    opts?: { ephemeral?: boolean },
) => {
    try {
        if (interaction.deferred && !interaction.replied) {
            return await interaction.editReply(payload);
        }
        if (!interaction.deferred && !interaction.replied) {
            return await interaction.reply({ ...(payload || {}), ephemeral: !!opts?.ephemeral });
        }
        // Already acknowledged; do nothing.
        return null;
    } catch {
        return null;
    }
};

const checkPermissions = (
    client: ExtendedClient,
    interaction: any,
    component: any,
    embed: EmbedBuilder,
) => {
    if (
        component?.options?.everyone === false &&
        interaction.user.id !== interaction.member?.user.id
    ) {
        return safeRespond(interaction, {
            embeds: [
                embed
                    .setColor((client as any).color?.red ?? 0xff0000)
                    .setDescription(
                        T((interaction as any).guild?.language, "handler.no_permission"),
                    ),
            ],
        }, { ephemeral: true });
    }

    if (
        component?.options?.permissions &&
        !interaction.memberPermissions?.has(component.options.permissions)
    ) {
        return safeRespond(interaction, {
            embeds: [
                embed
                    .setColor((client as any).color?.red ?? 0xff0000)
                    .setDescription(
                        T((interaction as any).guild?.language, "handler.no_permission"),
                    ),
            ],
        }, { ephemeral: true });
    }
    return null;
};

const handleInteraction = async (
    client: ExtendedClient,
    interaction: Interaction,
    componentCollection: Collection<string, any>,
    customId: string,
) => {
    const embed = new EmbedBuilder();
    const component = componentCollection.get(customId);

    if (!component) return;

    const permissionError = checkPermissions(client, interaction, component, embed);
    if (permissionError) return;

    try {
        await component.handler(client, interaction);
    } catch (error) {
        console.error(error);
        // Avoid double-acknowledgment in case handler already replied
        await safeRespond(
            interaction,
            {
                embeds: [
                    embed
                        .setColor((client as any).color?.red ?? 0xff0000)
                        .setDescription("An error occurred while handling your interaction."),
                ],
            },
            { ephemeral: true },
        );
    }
};

export default event(
    "interactionCreate",
    { once: false },
    async (client: ExtendedClient, interaction: BaseInteraction) => {
        // Skip chat input commands - they're handled by the main slash command handler
        if (interaction.isChatInputCommand()) {
            return;
        }

        if (interaction.isButton()) {
            await handleInteraction(
                client,
                interaction as any,
                (client as any).collection.components.buttons,
                (interaction as any).customId,
            );
        } else if ((interaction as any).isAnySelectMenu?.()) {
            await handleInteraction(
                client,
                interaction as any,
                (client as any).collection.components.selects,
                (interaction as any).customId,
            );
        } else if (interaction.isModalSubmit()) {
            await handleInteraction(
                client,
                interaction as any,
                (client as any).collection.components.modals,
                (interaction as any).customId,
            );
        } else if (interaction.isAutocomplete()) {
            await handleInteraction(
                client,
                interaction as any,
                (client as any).collection.components.autocomplete,
                (interaction as any).commandName,
            );
        }
    },
);
