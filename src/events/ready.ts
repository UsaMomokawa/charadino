import { Bot } from "../../bot.ts";

Bot.events.ready = (_, payload) => {
  console.log(`${payload.user.username} is ready!`);
};
