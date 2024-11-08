import { GuildMember, SlashCommandBuilder } from "discord.js";
import type { Command } from "../../types/Command";

const userCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    const member = interaction.member as GuildMember;
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${member.joinedAt}.`
    );
  },
  cooldown: 5,
};

export default userCommand;
