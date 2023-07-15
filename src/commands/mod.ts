import type { Command } from "../types/commands.ts";
import { Bot } from "../../bot.ts";

export function createCommand(command: Command) {
  Bot.commands.set(command.name, command);
}
