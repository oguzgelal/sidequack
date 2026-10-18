import type { UIMessage } from "@tanstack/ai-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError, apiFetch } from "../lib/api";

type Conversation = {
  messages: UIMessage[];
};

const conversationQueryKey = (id: string) => ["conversation", id];

export function useConversation(id: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: conversationQueryKey(id),
    queryFn: async () => {
      try {
        return await apiFetch<Conversation>(`/conversations/${id}`);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) return { messages: [] };
        throw error;
      }
    },
    staleTime: Infinity,
  });

  const save = useMutation({
    mutationFn: (messages: UIMessage[]) =>
      apiFetch<void>(`/conversations/${id}`, {
        method: "PUT",
        body: JSON.stringify({ messages }),
      }),
    onMutate: (messages) => {
      queryClient.setQueryData<Conversation>(conversationQueryKey(id), { messages });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["conversations"] }),
    scope: { id: `conversation-${id}` },
  });

  return {
    messages: query.data?.messages,
    isPending: query.isPending,
    isError: query.isError,
    retry: () => {
      query.refetch();
    },
    save: save.mutate,
  };
}
