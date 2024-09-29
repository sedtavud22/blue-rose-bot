import { Client, Collection } from "discord.js";
import type { Command } from "./Command";

export class ExtendedClient extends Client {
  commands: Collection<string, Command>;

  constructor(options: any) {
    super(options);
    this.commands = new Collection();
  }
}
