import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "check",
  description: "条件を指定して技能値をチェックします",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (bot, interaction) => {
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: "技能値をチェックしています... :mag_right:",
        },
      },
    );
  },
});
