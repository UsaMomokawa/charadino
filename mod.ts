import { startBot } from "./deps.ts";
import { updateApplicationCommands } from "./src/utils/updateCommands.ts";
import { Bot } from "./bot.ts";
import { logger } from "./src/utils/logger.ts";

import "./src/commands/check.ts";
import "./src/commands/mod.ts";
import "./src/commands/ping.ts";
import "./src/events/interactionCreate.ts";
import "./src/events/mod.ts";
import "./src/events/ready.ts";

logger.info("Starting bot... 🚀");

await updateApplicationCommands();

await startBot(Bot);
