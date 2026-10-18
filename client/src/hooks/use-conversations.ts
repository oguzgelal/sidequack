import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export type ConversationSummary = {
  id: string;
  title: string | null;
  updatedAt: string;
};

export function useConversations(search: string) {
  return useQuery({
    queryKey: ["conversations", search],
    queryFn: () => apiFetch<ConversationSummary[]>(`/conversations?${new URLSearchParams({ q: search })}`),
    placeholderData: keepPreviousData,
  });
}
