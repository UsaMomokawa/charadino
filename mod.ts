import { fastFileLoader, startBot } from "./deps.ts";
import { updateApplicationCommands } from "./src/utils/updateCommands.ts";
import { Bot } from "./bot.ts";
import { logger } from "./src/utils/logger.ts";

logger.info("Starting bot... 🚀");

const paths = [
  "./src/events",
  "./src/commands",
];
await fastFileLoader(paths).catch((error) => {
  logger.fatal(`Unable to import ${paths}`);
  logger.fatal(error);
  Deno.exit(1);
});

await updateApplicationCommands();

await startBot(Bot);
