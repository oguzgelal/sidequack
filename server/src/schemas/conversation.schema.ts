import { z } from "zod";

const messageSchema = z.looseObject({
  id: z.string(),
  role: z.enum(["system", "user", "assistant", "activity"]),
  parts: z.array(z.looseObject({ type: z.string() })),
});

export const conversationDataSchema = z.object({
  messages: z.array(messageSchema),
});

export const conversationParamSchema = z.object({
  id: z.uuid(),
});

export const conversationsQuerySchema = z.object({
  q: z.string().trim().optional(),
});

export type ConversationData = z.infer<typeof conversationDataSchema>;
