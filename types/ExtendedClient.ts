import { Client, Collection, type ClientOptions } from "discord.js";
import type { Command } from "./Command";

export class ExtendedClient extends Client {
  commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}
