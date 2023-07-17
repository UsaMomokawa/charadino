import type { BotWithCache, BotWithHelpersPlugin } from "./deps.ts";
import {
  Collection,
  createBot,
  enableCachePlugin,
  enableHelpersPlugin,
  Intents,
} from "./deps.ts";
import type { Command } from "./src/types/commands.ts";
import { config } from "./config.ts";
import { events } from "./src/events/mod.ts";

const bot = createBot({
  token: config.DISCORD_BOT_TOKEN,
  intents: Intents.GuildMessages | Intents.MessageContent,
  events: events,
});

enableHelpersPlugin(bot);
enableCachePlugin(bot);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, Command>;
}

export const Bot = bot as BotClient;
Bot.commands = new Collection();
