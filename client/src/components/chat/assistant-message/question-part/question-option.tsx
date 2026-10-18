import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";
import { colors, radius, shadows, space, typography } from "../../../../theme";

type QuestionOptionProps = {
  label: string;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
  hasTVPreferredFocus?: boolean;
};

export function QuestionOption({ label, selected, disabled, onPress, hasTVPreferredFocus }: QuestionOptionProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      disabled={disabled}
      hasTVPreferredFocus={hasTVPreferredFocus}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected, disabled }}
      style={[styles.option, selected && styles.selected, focused && styles.focused]}
    >
      <View style={styles.check}>{selected && <Check size={32} color={colors.duck} strokeWidth={3} />}</View>
      <Text style={typography.headline}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[4],
    minHeight: 88,
    paddingVertical: space[4],
    paddingHorizontal: space[6],
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  selected: {
    backgroundColor: colors.duckSoft,
  },
  focused: {
    boxShadow: `${shadows.lift}, ${shadows.focusRing}`,
  },
  check: {
    width: 32,
    height: 32,
  },
});
