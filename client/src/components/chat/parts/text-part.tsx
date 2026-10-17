import { StyleSheet, Text } from "react-native";
import { colors } from "../../../theme";

export function TextPart({ text }: { text: string }) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color: colors.foreground,
  },
});
