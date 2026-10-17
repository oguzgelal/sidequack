import { Hono } from "hono";
import { deviceController } from "../controllers/device.controller.js";

export const deviceRoutes = new Hono()
  .get("/", ...deviceController.show)
  .get("/social/:provider", ...deviceController.signInSocial)
  .post("/sign-in", ...deviceController.signIn)
  .post("/approve", ...deviceController.approve)
  .post("/deny", ...deviceController.deny);
