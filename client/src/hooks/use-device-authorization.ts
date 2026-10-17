import { useEffect, useEffectEvent, useState } from "react";
import { authClient, TV_CLIENT_ID } from "../lib/auth-client";

const DEVICE_CODE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";
const SLOW_DOWN_BACKOFF_MS = 5000;

export type DeviceCode = {
  userCode: string;
  verificationUri: string;
  verificationUriComplete: string;
};

type DeviceAuthorizationState =
  | { status: "loading" }
  | { status: "pending"; code: DeviceCode }
  | { status: "error"; message: string };

export function useDeviceAuthorization(onAuthorized: (token: string) => void) {
  const [state, setState] = useState<DeviceAuthorizationState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const handleAuthorized = useEffectEvent(onAuthorized);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const start = async () => {
      setState({ status: "loading" });
      const { data, error } = await authClient.device.code({ client_id: TV_CLIENT_ID });
      if (cancelled) return;
      if (error || !data) {
        setState({ status: "error", message: "Couldn't reach the server." });
        return;
      }

      setState({
        status: "pending",
        code: {
          userCode: data.user_code,
          verificationUri: data.verification_uri,
          verificationUriComplete: data.verification_uri_complete,
        },
      });

      let intervalMs = data.interval * 1000;

      const poll = async () => {
        const result = await authClient.device.token({
          grant_type: DEVICE_CODE_GRANT,
          device_code: data.device_code,
          client_id: TV_CLIENT_ID,
        });
        if (cancelled) return;
        if (result.data?.access_token) {
          handleAuthorized(result.data.access_token);
          return;
        }

        switch (result.error?.error) {
          case "slow_down":
            intervalMs += SLOW_DOWN_BACKOFF_MS;
            timer = setTimeout(poll, intervalMs);
            return;
          case "authorization_pending":
            timer = setTimeout(poll, intervalMs);
            return;
          case "expired_token":
            setAttempt((value) => value + 1);
            return;
          case "access_denied":
            setState({ status: "error", message: "Sign-in was denied on your phone." });
            return;
          default:
            setState({ status: "error", message: "Something went wrong while signing in." });
        }
      };

      timer = setTimeout(poll, intervalMs);
    };

    start();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [attempt]);

  return { state, restart: () => setAttempt((value) => value + 1) };
}
