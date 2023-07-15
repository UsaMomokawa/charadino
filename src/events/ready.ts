import { Bot } from "../../bot.ts";
import { logger } from "../utils/logger.ts";

Bot.events.ready = (_, payload) => {
  logger.info(`${payload.user.username} is ready!`);
};
