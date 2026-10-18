import { ActivityIndicator } from "react-native";
import { DeviceCodePanel } from "../components/device-code-panel";
import { ErrorState } from "../components/error-state";
import { useDeviceAuthorization } from "../hooks/use-device-authorization";
import { colors } from "../theme";

type SignInScreenProps = {
  onAuthorized: (token: string) => void;
};

export function SignInScreen({ onAuthorized }: SignInScreenProps) {
  const { state, restart } = useDeviceAuthorization(onAuthorized);

  if (state.status === "loading") return <ActivityIndicator size="large" color={colors.duck} />;
  if (state.status === "error") return <ErrorState title="Couldn't sign you in" message={state.message} onRetry={restart} />;
  return <DeviceCodePanel code={state.code} onRestart={restart} />;
}
