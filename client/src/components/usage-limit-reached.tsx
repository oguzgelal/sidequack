import { StyleSheet, Text, View } from "react-native";
import { typography } from "../theme";
import { TvButton } from "./tv-button";

export function UsageLimitReached({ onSignOut }: { onSignOut: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={typography.title}>{"You've reached this month's AI limit"}</Text>
      <Text style={[typography.body, styles.message]}>Chat will be available again next month.</Text>
      <TvButton label="Sign out" onPress={onSignOut} hasTVPreferredFocus />
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
