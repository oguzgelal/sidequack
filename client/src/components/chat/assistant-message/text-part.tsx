import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, fonts, radius, space } from "../../../theme";

export function TextPart({ text }: { text: string }) {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[styles.container, focused && styles.focused]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    maxWidth: 1300 + space[3] * 2,
    margin: -space[3],
    padding: space[3],
    borderRadius: radius.md,
  },
  focused: {
    backgroundColor: colors.surface,
  },
  text: {
    fontFamily: fonts.textMedium,
    fontSize: 34,
    lineHeight: 46,
    color: colors.ink,
  },
});
