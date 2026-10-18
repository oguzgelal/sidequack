import { randomUUID } from "expo-crypto";
import { create } from "zustand";

type ConversationStore = {
  conversationId: string;
  openConversation: (conversationId: string) => void;
  startNewConversation: () => void;
};

export const useConversationStore = create<ConversationStore>()((set) => ({
  conversationId: randomUUID(),
  openConversation: (conversationId) => set({ conversationId }),
  startNewConversation: () => set({ conversationId: randomUUID() }),
}));
