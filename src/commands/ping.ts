import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "ping",
  description: "pong を返します",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (bot, interaction) => {
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: "pong -- (深い闇の中から、微かな反響が聞こえる)",
        },
      },
    );
  },
});
