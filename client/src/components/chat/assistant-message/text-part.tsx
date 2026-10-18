import { StyleSheet, Text } from "react-native";
import { colors, fonts } from "../../../theme";

export function TextPart({ text }: { text: string }) {
  return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    maxWidth: 1300,
    fontFamily: fonts.textMedium,
    fontSize: 34,
    lineHeight: 46,
    color: colors.ink,
  },
});
