import { StyleSheet, Text, View } from "react-native";
import { TvButton } from "../components/tv-button";
import { typography } from "../theme";

type HomeScreenProps = {
  user: { name: string; email: string };
  onSignOut: () => void;
};

export function HomeScreen({ user, onSignOut }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={typography.title}>Welcome, {user.name}</Text>
      <Text style={[typography.body, styles.email]}>Signed in as {user.email}</Text>
      <TvButton label="Sign out" onPress={onSignOut} hasTVPreferredFocus />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 24,
  },
  email: {
    marginBottom: 24,
  },
});
