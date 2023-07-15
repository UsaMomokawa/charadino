import {
  createBot,
  enableCachePlugin,
  enableHelpersPlugin,
  Intents,
} from "./deps.ts";
import { ENV } from "./src/utils/secret.ts";
import { events } from "./src/events/mod.ts";

const bot = createBot({
  token: ENV["DISCORD_BOT_TOKEN"],
  intents: Intents.GuildMessages | Intents.MessageContent,
  events: events,
});

enableHelpersPlugin(bot);
enableCachePlugin(bot);

export const Bot = bot;
