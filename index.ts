import { Collection, Events, GatewayIntentBits } from "discord.js";
import { ExtendedClient } from "./types/ExtendedClient";
import path from "path";
import fs from "fs";
import type { Command } from "./types/Command";

const client = new ExtendedClient({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
// get all folders in commands folder
const commandFolders = fs.readdirSync(foldersPath); // ['utility']

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  // get all .ts files in folder in commands folder
  const commandsFile = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandsFile) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath).default as Command;

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const interactionClient = interaction.client as ExtendedClient;
  const command = interactionClient.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
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
});

client.login(process.env.DISCORD_TOKEN);
