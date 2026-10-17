import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import type { DeviceCode } from "../hooks/use-device-authorization";
import { colors, typography } from "../theme";
import { TvButton } from "./tv-button";

const QR_SIZE = 360;

type DeviceCodePanelProps = {
  code: DeviceCode;
  onRestart: () => void;
};

export function DeviceCodePanel({ code, onRestart }: DeviceCodePanelProps) {
  const displayUri = code.verificationUri.replace(/^https?:\/\//, "");
  const displayCode = `${code.userCode.slice(0, 4)}-${code.userCode.slice(4)}`;

  return (
    <View style={styles.container}>
      <View style={styles.instructions}>
        <Text style={[typography.title, styles.title]}>Sign in to tvai</Text>
        <Text style={typography.body}>Scan the QR code with your phone, or go to</Text>
        <Text style={styles.link}>{displayUri}</Text>
        <Text style={typography.body}>and enter this code:</Text>
        <Text style={styles.code}>{displayCode}</Text>
        <TvButton label="Get a new code" onPress={onRestart} hasTVPreferredFocus />
      </View>
      <View style={styles.qr}>
        <QRCode value={code.verificationUriComplete} size={QR_SIZE} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 120,
  },
  instructions: {
    alignItems: "flex-start",
    gap: 16,
    maxWidth: 900,
  },
  title: {
    marginBottom: 16,
  },
  link: {
    fontSize: 40,
    fontWeight: "600",
    color: colors.foreground,
  },
  code: {
    fontSize: 96,
    fontWeight: "700",
    letterSpacing: 12,
    color: colors.foreground,
    fontVariant: ["tabular-nums"],
    marginVertical: 24,
  },
  qr: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#ffffff",
  },
});
