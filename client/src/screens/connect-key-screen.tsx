import { StyleSheet, Text, View } from "react-native";
import { SplitLayout } from "../components/split-layout";
import { Button } from "../components/ui/button";
import { Duck } from "../components/ui/duck";
import { QrCodeCard } from "../components/ui/qr-code-card";
import { space, typography } from "../theme";

// TODO(oguz): serve the phone page that collects the OpenRouter key, then poll for it here.
const CONNECT_KEY_URL = `${process.env.EXPO_PUBLIC_API_URL}/openrouter-key`;

export function ConnectKeyScreen({ onBack }: { onBack: () => void }) {
  return (
    <SplitLayout
      aside={
        <View style={styles.aside}>
          <QrCodeCard value={CONNECT_KEY_URL} />
          <View style={styles.waiting}>
            <Text style={typography.callout}>Waiting for your phone…</Text>
          </View>
          <Duck height={96} />
        </View>
      }
    >
      <Text style={typography.title1}>Use your own OpenRouter key</Text>
      <Text style={[typography.body, styles.description]}>
        Scan the code and paste your key on your phone. You pay OpenRouter
        directly for what you use.
      </Text>
      <Button
        label="Back"
        onPress={onBack}
        hasTVPreferredFocus
        style={styles.back}
      />
    </SplitLayout>
  );
}

const styles = StyleSheet.create({
  aside: {
    alignItems: "center",
    gap: space[6],
  },
  waiting: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[4],
  },
  description: {
    maxWidth: 780,
  },
  back: {
    marginTop: space[3],
  },
});
