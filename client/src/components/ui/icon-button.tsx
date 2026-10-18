import { Animated, Pressable, StyleSheet } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { useFocusScale } from "../../hooks/use-focus-scale";
import { colors, radius, shadows } from "../../theme";

type IconButtonProps = {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
};

export function IconButton({ icon: Icon, label, onPress }: IconButtonProps) {
  const { focused, scaleStyle, focusHandlers } = useFocusScale();

  return (
    <Pressable onPress={onPress} accessibilityLabel={label} {...focusHandlers}>
      <Animated.View style={[styles.button, focused && styles.focused, scaleStyle]}>
        <Icon size={40} color={focused ? colors.onDuck : colors.inkMuted} strokeWidth={2.5} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    boxShadow: shadows.rest,
  },
  focused: {
    backgroundColor: colors.duck,
    boxShadow: `${shadows.lift}, ${shadows.focusRing}`,
  },
});
