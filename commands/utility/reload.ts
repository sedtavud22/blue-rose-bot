import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types/Command";
import type { ExtendedClient } from "../../types/ExtendedClient";

const reloadCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads a command.")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("The command to reload")
        .setRequired(true)
    ) as SlashCommandBuilder,
  async execute(interaction) {
    const commandName = interaction.options
      .getString("command", true)
      .toLowerCase();
    const interactionClient = interaction.client as ExtendedClient;
    const command = interactionClient.commands.get(commandName);

    if (!command) {
      await interaction.reply(
        `There is no command with name \`${commandName}\`!`
      );
      return;
    }

    const commandPath = `./${command.data.name}.ts`;

    delete require.cache[require.resolve(commandPath)];

    try {
      const newCommand = require(commandPath).default as Command;
      interactionClient.commands.set(newCommand.data.name, newCommand);

      await interaction.reply(
        `Command \`${newCommand.data.name}\` was reloaded!`
      );
    } catch (err) {
      const error = err as Error;
      console.error(error);
      await interaction.reply(
        `There was an error while reloading command \`${command.data.name}\`:\n\`${error.message}\``
      );
    }
  },
  cooldown: 1,
};

export default reloadCommand;
