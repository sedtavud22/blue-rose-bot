import { Client, Collection, type ClientOptions } from "discord.js";
import type { Command } from "./Command";

export class ExtendedClient extends Client {
  commands: Collection<string, Command>;
  cooldowns: Collection<string, Collection<string, number>>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.cooldowns = new Collection();
  }
}
