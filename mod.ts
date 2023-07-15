import {
  CreateSlashApplicationCommand,
  fastFileLoader,
  InteractionResponseTypes,
  startBot,
} from "./deps.ts";
import { Bot } from "./bot.ts";
import { logger } from "./src/utils/logger.ts";
import { ENV } from "./src/utils/secret.ts";

logger.info("Starting bot... 🚀");

const paths = [
  "./src/events",
];
await fastFileLoader(paths).catch((error) => {
  logger.fatal(`Unable to import ${paths}`);
  logger.fatal(error);
  Deno.exit(1);
});

const checkCommand: CreateSlashApplicationCommand = {
  name: "check",
  description: "条件を指定して技能値をチェックします",
};

await Bot.helpers.createGuildApplicationCommand(
  checkCommand,
  ENV["DISCORD_GUILD_ID"],
);
await Bot.helpers.upsertGuildApplicationCommands(ENV["DISCORD_GUILD_ID"], [
  checkCommand,
]);

Bot.events.interactionCreate = (bot, interaction) => {
  switch (interaction.data?.name) {
    case "check": {
      bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: "技能値をチェックしています... :mag_right:",
        },
      });
      break;
    }
    default: {
      break;
    }
  }
};

await startBot(Bot);
