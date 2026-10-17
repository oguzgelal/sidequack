import "dotenv/config";
import { Hono } from "hono";
import { inertia } from "@hono/inertia";
import { rootView } from "./inertia/root-view.js";
import { authRoutes } from "./routes/auth.routes.js";
import { chatRoutes } from "./routes/chat.routes.js";
import { deviceRoutes } from "./routes/device.routes.js";

const app = new Hono()
  .use(inertia({ rootView }))
  .route("/api/auth", authRoutes)
  .route("/device", deviceRoutes)
  .route("/chat", chatRoutes);

export default app;
