import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types/Command";

const serverCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
    );
  },
  cooldown: 5,
};

export default serverCommand;
