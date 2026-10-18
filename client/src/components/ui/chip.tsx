import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { useFocusScale } from "../../hooks/use-focus-scale";
import { colors, radius, shadows, space, typography } from "../../theme";

type ChipProps = {
  label: string;
  hasTVPreferredFocus?: boolean;
  onPress?: () => void;
};

export function Chip({ label, onPress, hasTVPreferredFocus }: ChipProps) {
  const { focused, scaleStyle, focusHandlers } = useFocusScale();

  return (
    <Pressable
      onPress={onPress}
      hasTVPreferredFocus={hasTVPreferredFocus}
      {...focusHandlers}
    >
      <Animated.View
        style={[styles.chip, focused && styles.focused, scaleStyle]}
      >
        <Text
          style={[
            typography.label,
            styles.label,
            focused && styles.focusedLabel,
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 64,
    paddingHorizontal: space[5],
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  focused: {
    backgroundColor: colors.duck,
    boxShadow: `${shadows.lift}, ${shadows.focusRing}`,
  },
  label: {
    color: colors.inkMuted,
  },
  focusedLabel: {
    color: colors.onDuck,
  },
});
