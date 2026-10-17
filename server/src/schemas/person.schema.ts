import { z } from "zod";

export const memoriesSchema = z.record(z.string(), z.object({ key: z.string(), fact: z.string() }));

export type Memories = z.infer<typeof memoriesSchema>;
