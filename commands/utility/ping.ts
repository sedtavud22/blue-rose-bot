import { SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types/Command";

const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
  cooldown: 5,
};

export default pingCommand;
