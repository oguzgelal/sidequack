import { StyleSheet, View } from "react-native";
import { Button } from "../ui/button";
import { Wordmark } from "../ui/wordmark";

export function ChatHeader({ onSignOut }: { onSignOut: () => void }) {
  return (
    <View style={styles.header}>
      <Wordmark />
      <Button label="Sign out" onPress={onSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
