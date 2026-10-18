import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

type AiUsage = {
  usd: number;
  capUsd: number;
  limitReached: boolean;
};

export function useAiUsage() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["ai-usage"],
    queryFn: () => apiFetch<AiUsage>("/ai/usage"),
  });

  return {
    isPending,
    limitReached: data?.limitReached ?? false,
    refresh: () => {
      refetch();
    },
  };
}
