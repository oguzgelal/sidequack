import type { ModelMessage, UIMessage } from "@tanstack/ai";
import type { ChatContext } from "../tools/chat-context.js";
import { chatTools } from "../tools/index.js";
import { aiService } from "./ai.service.js";
import { personService } from "./person.service.js";

const AGENT_NAME = "Robert";
const SYSTEM_PROMPT = [
  `You are ${AGENT_NAME}, a helpful assistant that lives on a TV.`,
  "People read your answers from across the room, so long text ruins the experience: keep every answer as short as possible, ideally a sentence or two.",
  "Whenever a tool fits the request, use it instead of describing things in text, because tools render purpose-built UI on screen.",
  "Never use Markdown or any other formatting: no headings, bullet points, numbered lists, bold, italics, tables, links or code blocks. Write plain sentences only.",
].join(" ");

class ChatService {
  stream(
    userId: string,
    messages: Array<UIMessage | ModelMessage>,
    context: ChatContext,
    abortController: AbortController,
  ) {
    return aiService.chat({
      userId,
      messages,
      systemPrompts: [SYSTEM_PROMPT, personService.describe(context.person)],
      tools: chatTools,
      context,
      abortController,
    });
  }
}

export const chatService = new ChatService();
