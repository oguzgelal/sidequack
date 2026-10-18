import { useState } from "react";
import type { UIMessage } from "@tanstack/ai-react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, fonts, radius, shadows } from "../../theme";

export function UserMessage({ message }: { message: UIMessage }) {
  const [focused, setFocused] = useState(false);
  const text = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.content)
    .join("\n");

  return (
    <Pressable
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[styles.bubble, focused && styles.focused]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bubble: {
    alignSelf: "flex-end",
    maxWidth: 1200,
    paddingVertical: 20,
    paddingHorizontal: 36,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceRaised,
  },
  focused: {
    boxShadow: shadows.focusRing,
  },
  text: {
    fontFamily: fonts.textSemiBold,
    fontSize: 32,
    lineHeight: 40,
    color: colors.ink,
  },
});
