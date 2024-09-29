import { Events, type CacheType, type Interaction } from "discord.js";
import type { Event } from "../types/Event";
import type { ExtendedClient } from "../types/ExtendedClient";

const interactionCreateEvent: Event<Interaction<CacheType>> = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const interactionClient = interaction.client as ExtendedClient;
    const command = interactionClient.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};

export default interactionCreateEvent;
