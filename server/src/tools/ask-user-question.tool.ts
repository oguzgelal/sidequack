import { toolDefinition } from "@tanstack/ai";
import { z } from "zod";

export const askUserQuestionTool = toolDefinition({
  name: "ask_user_question",
  description:
    "Ask the person a question by showing it on screen with options they pick with the remote. Use this every time you need to ask them something, instead of asking in text. Use single choice when only one option can apply and multiple choice when several can. The result holds the options they picked, or their own words in reply when they answered by typing instead.",
  inputSchema: z.object({
    question: z.string().meta({ description: "The question, as one short sentence" }),
    mode: z.enum(["single", "multiple"]).meta({
      description: "single: pick exactly one option. multiple: pick one or more.",
    }),
    options: z
      .array(z.string())
      .min(2)
      .max(6)
      .meta({ description: "Short answer labels, a few words each" }),
  }),
  outputSchema: z.object({
    answers: z.array(z.string()),
    reply: z.string().optional(),
  }),
});
