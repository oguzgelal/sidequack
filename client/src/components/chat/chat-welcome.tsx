import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { space, typography } from "../../theme";
import { Chip } from "../ui/chip";
import { Duck } from "../ui/duck";

const SUGGESTIONS = ["What should I watch?", "Settle a debate", "What’s for dinner?", "Explain something"];

type ChatWelcomeProps = {
  composer: ReactNode;
  onSuggestion: (text: string) => void;
};

export function ChatWelcome({ composer, onSuggestion }: ChatWelcomeProps) {
  return (
    <View style={styles.container}>
      <Duck height={168} />
      <Text style={[typography.hero, styles.title]}>What’s on your mind?</Text>
      {composer}
      <View style={styles.suggestions}>
        {SUGGESTIONS.map((suggestion) => (
          <Chip key={suggestion} label={suggestion} onPress={() => onSuggestion(suggestion)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: space[7],
  },
  title: {
    textAlign: "center",
  },
  suggestions: {
    flexDirection: "row",
    gap: space[4],
  },
});
