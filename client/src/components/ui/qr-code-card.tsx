import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { colors, radius } from "../../theme";

const CARD_SIZE = 360;
const CARD_PADDING = 20;

export function QrCodeCard({ value }: { value: string }) {
  return (
    <View style={styles.card}>
      <QRCode
        value={value}
        size={CARD_SIZE - CARD_PADDING * 2}
        color={colors.canvas}
        backgroundColor={colors.ink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: CARD_PADDING,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
  },
});
