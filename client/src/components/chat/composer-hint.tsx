import { StyleSheet, Text, View } from "react-native";
import { CircleChevronLeft } from "lucide-react-native";
import { colors, radius, space, typography } from "../../theme";

export function ComposerHint() {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.pill}>
        <Text style={typography.caption}>Press</Text>
        <CircleChevronLeft size={26} color={colors.inkSubtle} strokeWidth={2.5} />
        <Text style={typography.caption}>to jump back to typing</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: space[6],
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[2],
    paddingVertical: space[2],
    paddingHorizontal: space[4],
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
});
