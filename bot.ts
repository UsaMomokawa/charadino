import {
  createBot,
  enableCachePlugin,
  enableHelpersPlugin,
  Intents,
} from "./deps.ts";
import { ENV } from "./secret.ts";

const bot = createBot({
  token: ENV["DISCORD_BOT_TOKEN"],
  intents: Intents.GuildMessages | Intents.MessageContent,
  events: {
    ready: (_bot, payload) => {
      console.log(`${payload.user.username} is ready!`);
    },
  },
});

enableHelpersPlugin(bot);
enableCachePlugin(bot);

export const Bot = bot;
