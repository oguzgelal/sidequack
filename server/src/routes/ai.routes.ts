import { Hono } from "hono";
import { aiController } from "../controllers/ai.controller.js";

export const aiRoutes = new Hono().get("/usage", ...aiController.usage);
