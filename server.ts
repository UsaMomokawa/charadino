import { serve } from "./deps.ts";
import { logger } from "./src/utils/logger.ts";

function handler(request: Request): Response {
  try {
    if (request.url.endsWith("/health")) {
      return new Response("OK", { status: 200 });
    } else {
      return new Response("Not Found", { status: 404 });
    }
  } catch (error) {
    logger.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

await serve(handler, { port: 8080 });
