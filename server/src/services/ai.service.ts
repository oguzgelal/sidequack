import {
  chat,
  maxIterations,
  type AnyTool,
  type ChatMiddleware,
  type ModelMessage,
  type UIMessage,
} from "@tanstack/ai";
import { openRouterText } from "@tanstack/ai-openrouter";
import { prisma } from "../lib/db.js";
import { UsageLimitError } from "./service-error.js";

const CHAT_MODEL = "anthropic/claude-sonnet-5.5";
const MAX_ITERATIONS = 10;
const MONTHLY_CAP_USD = 10;

type ChatRequest<TContext> = {
  userId: string;
  messages: Array<UIMessage | ModelMessage>;
  systemPrompts: string[];
  tools: AnyTool[];
  context: TContext;
  abortController: AbortController;
};

class AiService {
  async chat<TContext>({
    userId,
    messages,
    systemPrompts,
    tools,
    context,
    abortController,
  }: ChatRequest<TContext>) {
    const { limitReached } = await this.getUsage(userId);
    if (limitReached) {
      throw new UsageLimitError("You've used this month's AI allowance.");
    }

    const usageMiddleware: ChatMiddleware = {
      name: "usage",
      onUsage: (_, usage) =>
        this.recordUsage(
          userId,
          (usage.cost ?? 0) + (usage.costDetails?.upstreamCost ?? 0),
        ),
    };

    return chat({
      adapter: openRouterText(CHAT_MODEL),
      messages,
      systemPrompts,
      tools,
      context,
      agentLoopStrategy: maxIterations(MAX_ITERATIONS),
      abortController,
      middleware: [usageMiddleware],
    });
  }

  async getUsage(userId: string) {
    const usage = await prisma.aiUsage.findUnique({
      where: {
        userId_key: {
          key: this.currentMonthKey(),
          userId,
        },
      },
    });
    const usd = usage?.usd ?? 0;
    return {
      usd,
      capUsd: MONTHLY_CAP_USD,
      limitReached: usd >= MONTHLY_CAP_USD,
    };
  }

  private async recordUsage(userId: string, usd: number) {
    const key = this.currentMonthKey();
    await prisma.aiUsage.upsert({
      where: { userId_key: { userId, key } },
      create: { userId, key, usd },
      update: { usd: { increment: usd } },
    });
  }

  private currentMonthKey() {
    const now = new Date();
    return `${String(now.getUTCMonth() + 1).padStart(2, "0")}-${now.getUTCFullYear()}`;
  }
}

export const aiService = new AiService();
