import { chat, maxIterations, type AnyTool, type ModelMessage, type UIMessage } from "@tanstack/ai";
import { openRouterText } from "@tanstack/ai-openrouter";

const CHAT_MODEL = "anthropic/claude-sonnet-5.5";
const MAX_ITERATIONS = 10;

type ChatRequest<TContext> = {
  messages: Array<UIMessage | ModelMessage>;
  systemPrompts: string[];
  tools: AnyTool[];
  context: TContext;
  abortController: AbortController;
};

class AiService {
  chat<TContext>({ messages, systemPrompts, tools, context, abortController }: ChatRequest<TContext>) {
    return chat({
      adapter: openRouterText(CHAT_MODEL),
      messages,
      systemPrompts,
      tools,
      context,
      agentLoopStrategy: maxIterations(MAX_ITERATIONS),
      abortController,
    });
  }
}

export const aiService = new AiService();
