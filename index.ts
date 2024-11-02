import { Collection, GatewayIntentBits } from "discord.js";
import { ExtendedClient } from "./types/ExtendedClient";
import path from "path";
import fs from "fs";
import type { Command } from "./types/Command";

const client = new ExtendedClient({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.cooldowns = new Collection();

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

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath).default;
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);
