import { z } from "zod";

export const deviceQuerySchema = z.object({
  user_code: z.string().trim().default(""),
});

export const signInSchema = z.object({
  mode: z.enum(["sign-in", "sign-up"]),
  name: z.string().trim(),
  email: z.string().trim(),
  password: z.string(),
  userCode: z.string().trim(),
});

export const userCodeSchema = z.object({
  userCode: z.string().trim().min(1),
});
