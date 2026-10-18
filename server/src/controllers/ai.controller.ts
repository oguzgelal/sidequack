import { createFactory } from "hono/factory";
import { aiService } from "../services/ai.service.js";
import { authService } from "../services/auth.service.js";

const factory = createFactory();

class AiController {
  usage = factory.createHandlers(async (c) => {
    const session = await authService.getSession(c.req.raw.headers);
    if (!session) return c.json({ error: "Unauthorized" }, 401);
    return c.json(await aiService.getUsage(session.user.id));
  });
}

export const aiController = new AiController();
