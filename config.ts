import { dotenv } from "./deps.ts";

await dotenv.loadSync({ export: true });
export const config = {
  DISCORD_BOT_TOKEN: Deno.env.get("DISCORD_BOT_TOKEN") || "",
};
