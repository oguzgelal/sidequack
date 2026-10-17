import { Hono } from "hono";
import { chatController } from "../controllers/chat.controller.js";

export const chatRoutes = new Hono().post("/", ...chatController.stream);
