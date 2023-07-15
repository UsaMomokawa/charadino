import type { BotClient } from "../../bot.ts";
import {
  ApplicationCommandOption,
  ApplicationCommandTypes,
  Interaction,
} from "../../deps.ts";

// https://github.com/discordeno/discordeno/blob/main/examples/beginner/src/types/commands.ts
export interface Command {
  name: string;
  description: string;
  type: ApplicationCommandTypes;
  devOnly?: boolean;
  options?: ApplicationCommandOption[];
  execute: (bot: BotClient, interaction: Interaction) => unknown;
}
