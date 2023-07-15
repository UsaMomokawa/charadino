import { Bot } from "../../bot.ts";
import { ENV } from "../../secret.ts";

export async function updateApplicationCommands() {
  await Bot.helpers.upsertGlobalApplicationCommands(
    Bot.commands
      .filter((command) => !command.devOnly)
      .array(),
  );

  await Bot.helpers.upsertGuildApplicationCommands(
    ENV["DISCORD_GUILD_ID"],
    Bot.commands
      .filter((command) => !!command.devOnly)
      .array(),
  );
}
