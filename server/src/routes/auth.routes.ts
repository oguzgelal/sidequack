import { Hono } from "hono";
import { auth } from "../lib/auth.js";

export const authRoutes = new Hono().on(["GET", "POST"], "/*", (c) => auth.handler(c.req.raw));
