import { StyleSheet, Text, View } from "react-native";
import { Check } from "lucide-react-native";
import { colors, space, typography } from "../theme";

export function FeatureItem({ label }: { label: string }) {
  return (
    <View style={styles.item}>
      <Check size={32} color={colors.duck} strokeWidth={3} />
      <Text style={[typography.body, styles.label]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[3],
  },
  label: {
    color: colors.ink,
  },
});
