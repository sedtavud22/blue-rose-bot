import { Events } from "discord.js";
import type { Event } from "../types/Event";
import type { ExtendedClient } from "../types/ExtendedClient";

const readyEvent: Event<ExtendedClient> = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
  },
};

export default readyEvent;
