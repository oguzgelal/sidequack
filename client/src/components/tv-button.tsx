import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme";

type TvButtonProps = {
  label: string;
  onPress: () => void;
  hasTVPreferredFocus?: boolean;
};

export function TvButton({ label, onPress, hasTVPreferredFocus }: TvButtonProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      hasTVPreferredFocus={hasTVPreferredFocus}
      style={({ pressed }) => [styles.button, focused && styles.focused, pressed && styles.pressed]}
    >
      <Text style={[styles.label, focused && styles.focusedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  focused: {
    backgroundColor: colors.focus,
    borderColor: colors.focus,
    transform: [{ scale: 1.06 }],
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 32,
    fontWeight: "600",
    color: colors.foreground,
  },
  focusedLabel: {
    color: colors.focusForeground,
  },
});
