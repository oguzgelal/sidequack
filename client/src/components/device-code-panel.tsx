import { StyleSheet, Text, View } from "react-native";
import type { DeviceCode } from "../hooks/use-device-authorization";
import { space, typography } from "../theme";
import { SplitLayout } from "./split-layout";
import { Button } from "./ui/button";
import { Duck } from "./ui/duck";
import { QrCodeCard } from "./ui/qr-code-card";

type DeviceCodePanelProps = {
  code: DeviceCode;
  onRestart: () => void;
};

export function DeviceCodePanel({ code, onRestart }: DeviceCodePanelProps) {
  const displayUri = code.verificationUri.replace(/^https?:\/\//, "");
  const displayCode = `${code.userCode.slice(0, 4)}-${code.userCode.slice(4)}`;

  return (
    <SplitLayout
      aside={
        <View style={styles.aside}>
          <QrCodeCard value={code.verificationUriComplete} />
          <View style={styles.manualEntry}>
            <Text style={typography.callout}>Or go to {displayUri} and enter</Text>
            <Text style={[typography.title1, styles.code]}>{displayCode}</Text>
          </View>
          <Button label="Get a new code" onPress={onRestart} hasTVPreferredFocus />
        </View>
      }
    >
      <Duck height={160} />
      <Text style={typography.title1}>Sign in with your phone</Text>
      <Text style={[typography.body, styles.description]}>
        Scan the code with your phone’s camera and sign in there. This screen moves on by itself.
      </Text>
    </SplitLayout>
  );
}

const styles = StyleSheet.create({
  aside: {
    alignItems: "center",
    gap: space[6],
  },
  manualEntry: {
    alignItems: "center",
    gap: space[2],
  },
  code: {
    letterSpacing: 3.84,
    fontVariant: ["tabular-nums"],
  },
  description: {
    maxWidth: 780,
  },
});
