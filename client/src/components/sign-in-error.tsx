import { StyleSheet, Text, View } from "react-native";
import { space, typography } from "../theme";
import { Button } from "./ui/button";
import { Duck } from "./ui/duck";

type SignInErrorProps = {
  message: string;
  onRetry: () => void;
};

export function SignInError({ message, onRetry }: SignInErrorProps) {
  return (
    <View style={styles.container}>
      <Duck height={160} />
      <Text style={typography.title1}>{"Couldn't sign you in"}</Text>
      <Text style={[typography.body, styles.message]}>{message}</Text>
      <Button label="Try again" variant="primary" onPress={onRetry} hasTVPreferredFocus />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: space[5],
  },
  message: {
    marginBottom: space[4],
  },
});
