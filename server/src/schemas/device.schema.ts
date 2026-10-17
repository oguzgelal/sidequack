import { z } from "zod";

export const SOCIAL_PROVIDERS = ["google"] as const;

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];

export const deviceQuerySchema = z.object({
  user_code: z.string().trim().default(""),
  error: z.string().optional(),
});

export const socialProviderParamSchema = z.object({
  provider: z.enum(SOCIAL_PROVIDERS),
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
