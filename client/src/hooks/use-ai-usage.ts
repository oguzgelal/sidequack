import { useEffect, useState } from "react";
import { sessionStore } from "../lib/session-store";

type AiUsageStatus = "loading" | "available" | "limit-reached";

export function useAiUsage() {
  const [status, setStatus] = useState<AiUsageStatus>("loading");
  const [check, setCheck] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch(`${process.env.EXPO_PUBLIC_API_URL}/ai/usage`, {
      headers: { Authorization: `Bearer ${sessionStore.getToken()}` },
    })
      .then((response) => response.json())
      .then((usage: { limitReached: boolean }) => {
        if (!cancelled) {
          setStatus(usage.limitReached ? "limit-reached" : "available");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("available");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [check]);

  return {
    status,
    refresh: () => {
      setCheck((value) => value + 1);
    },
  };
}
