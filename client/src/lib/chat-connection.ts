import { xhrServerSentEvents } from "@tanstack/ai-react";
import { sessionStore } from "./session-store";

// React Native's fetch can't stream response bodies.
export const chatConnection = xhrServerSentEvents(`${process.env.EXPO_PUBLIC_API_URL}/chat`, () => ({
  headers: { Authorization: `Bearer ${sessionStore.getToken()}` },
}));
