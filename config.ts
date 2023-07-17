import { dotenv } from "./deps.ts";

await dotenv.load();
export const config = {
  DISCORD_BOT_TOKEN: Deno.env.get("DISCORD_BOT_TOKEN") || "",
}
