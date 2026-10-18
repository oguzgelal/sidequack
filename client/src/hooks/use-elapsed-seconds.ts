import { useEffect, useState } from "react";

export function useElapsedSeconds(isRunning: boolean) {
  const [startedAt] = useState(() => (isRunning ? Date.now() : null));
  const [elapsed, setElapsed] = useState<number | null>(startedAt === null ? null : 0);

  useEffect(() => {
    if (!isRunning || startedAt === null) return;
    const timer = setInterval(() => setElapsed(Math.round((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [isRunning, startedAt]);

  return elapsed;
}
