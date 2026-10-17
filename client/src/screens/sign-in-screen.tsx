import { ActivityIndicator } from "react-native";
import { DeviceCodePanel } from "../components/device-code-panel";
import { SignInError } from "../components/sign-in-error";
import { useDeviceAuthorization } from "../hooks/use-device-authorization";
import { colors } from "../theme";

type SignInScreenProps = {
  onAuthorized: (token: string) => void;
};

export function SignInScreen({ onAuthorized }: SignInScreenProps) {
  const { state, restart } = useDeviceAuthorization(onAuthorized);

  if (state.status === "loading") return <ActivityIndicator size="large" color={colors.foreground} />;
  if (state.status === "error") return <SignInError message={state.message} onRetry={restart} />;
  return <DeviceCodePanel code={state.code} onRestart={restart} />;
}
