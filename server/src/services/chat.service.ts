import type { ModelMessage, UIMessage } from "@tanstack/ai";
import type { ChatContext } from "../tools/chat-context.js";
import { chatTools } from "../tools/index.js";
import { aiService } from "./ai.service.js";
import { personService } from "./person.service.js";

const AGENT_NAME = "tvai";
const SYSTEM_PROMPT = [
  `You are ${AGENT_NAME}, a helpful assistant on a TV.`,
  "Use the available tools whenever they help answer.",
].join(" ");

class ChatService {
  stream(
    messages: Array<UIMessage | ModelMessage>,
    context: ChatContext,
    abortController: AbortController,
  ) {
    return aiService.chat({
      messages,
      systemPrompts: [SYSTEM_PROMPT, personService.describe(context.person)],
      tools: chatTools,
      context,
      abortController,
    });
  }
}

export const chatService = new ChatService();
