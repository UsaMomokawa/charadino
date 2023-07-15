import {
  CreateSlashApplicationCommand,
  InteractionResponseTypes,
  startBot,
} from "./deps.ts";
import { Bot } from "./bot.ts";
import { ENV } from "./secret.ts";

console.log("Starting bot... 🚀");

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
