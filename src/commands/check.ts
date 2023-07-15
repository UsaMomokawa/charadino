import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
  ApplicationCommandOptionTypes,
} from "../../deps.ts";
import { check } from "./check/mod.ts";
import { buildMessage } from "./check/buildMessages.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "check",
  description: "技能値が条件を満たすかどうかをチェックします",
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionTypes.String,
      name: "条件",
      description: "技能値の条件を不等号で指定します(例: 回避>=30,応急手当>=30)",
      required: true,
    },
    {
      type: ApplicationCommandOptionTypes.String,
      name: "url",
      description: "Charaeno URL を指定します",
      required: true,
    }
  ],
  execute: async (bot, interaction) => {
    const options = interaction.data!.options!;
    const results = await check(options);
    const message = buildMessage(results);

    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: message,
        },
      },
    );
  }
});
