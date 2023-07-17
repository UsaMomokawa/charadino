import { Bot } from "../../bot.ts";

export async function updateApplicationCommands() {
  await Bot.helpers.upsertGlobalApplicationCommands(
    Bot.commands
      .filter((command) => !command.devOnly)
      .array(),
  );
}
