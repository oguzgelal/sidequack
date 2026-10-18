import type { UIMessage } from "@tanstack/ai-react";
import { StyleSheet, Text } from "react-native";
import { colors, fonts, radius } from "../../theme";

export function UserMessage({ message }: { message: UIMessage }) {
  const text = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.content)
    .join("\n");

  return <Text style={styles.bubble}>{text}</Text>;
}

const styles = StyleSheet.create({
  bubble: {
    alignSelf: "flex-end",
    maxWidth: 1200,
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surfaceRaised,
    fontFamily: fonts.textSemiBold,
    fontSize: 32,
    lineHeight: 40,
    color: colors.ink,
  },
});
