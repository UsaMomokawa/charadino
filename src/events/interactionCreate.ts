import { InteractionTypes } from "../../deps.ts";
import { Bot } from "../../bot.ts";
import { logger } from "../utils/logger.ts";

Bot.events.interactionCreate = (_, interaction) => {
  if (!interaction.data) return;

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand:
      logger.info(
        `[Application Command] ${interaction.data.name} command executed.`,
      );
      Bot.commands.get(interaction.data.name!)?.execute(Bot, interaction);
      break;
  }
};
