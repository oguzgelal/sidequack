import { toolDefinition } from "@tanstack/ai";
import { z } from "zod";

export const thinkTool = toolDefinition({
  name: "think",
  description:
    "Think privately before you act. Use it to plan, to work through a complex or multi-step request before answering, to decide which tools to call, or to check a tool result before relying on it. The person never sees these thoughts, so this is the place for reasoning that shouldn't end up in your short on-screen answer.",
  inputSchema: z.object({
    thought: z.string().meta({ description: "Your internal reasoning" }),
  }),
}).server(() => ({ recorded: true }));
