import { createFactory } from "hono/factory";
import { chatParamsFromRequest, toServerSentEventsResponse } from "@tanstack/ai";
import { authService } from "../services/auth.service.js";
import { chatService } from "../services/chat.service.js";
import { personService } from "../services/person.service.js";
import { UsageLimitError } from "../services/service-error.js";

const factory = createFactory();

class ChatController {
  stream = factory.createHandlers(async (c) => {
    const session = await authService.getSession(c.req.raw.headers);
    if (!session) return c.json({ error: "Unauthorized" }, 401);

    const params = await chatParamsFromRequest(c.req.raw).catch((error: unknown) => {
      if (error instanceof Response) return error;
      throw error;
    });
    if (params instanceof Response) return params;

    const person = await personService.getActive(session.user.id);
    const abortController = new AbortController();
    try {
      const stream = await chatService.stream(session.user.id, params, { person }, abortController);
      return toServerSentEventsResponse(stream, { abortController });
    } catch (error) {
      if (!(error instanceof UsageLimitError)) throw error;
      return c.json({ error: error.message }, 402);
    }
  });
}

export const chatController = new ChatController();
