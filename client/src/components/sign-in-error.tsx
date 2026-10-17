import { StyleSheet, Text, View } from "react-native";
import { typography } from "../theme";
import { TvButton } from "./tv-button";

type SignInErrorProps = {
  message: string;
  onRetry: () => void;
};

export function SignInError({ message, onRetry }: SignInErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={typography.title}>{"Couldn't sign you in"}</Text>
      <Text style={[typography.body, styles.message]}>{message}</Text>
      <TvButton label="Try again" onPress={onRetry} hasTVPreferredFocus />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 24,
  },
  message: {
    marginBottom: 24,
  },
});
