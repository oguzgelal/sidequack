import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { colors, space } from "../theme";
import { Wordmark } from "./ui/wordmark";

type SplitLayoutProps = {
  children: ReactNode;
  aside: ReactNode;
  asideTone?: "surface" | "raised";
};

export function SplitLayout({ children, aside, asideTone = "surface" }: SplitLayoutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Wordmark />
        <View style={styles.content}>{children}</View>
      </View>
      <View style={[styles.aside, asideTone === "raised" && styles.asideRaised]}>{aside}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  main: {
    flex: 1,
    paddingVertical: space.safeY,
    paddingHorizontal: space.safeX,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: space[5],
  },
  aside: {
    width: 800,
    paddingVertical: space.safeY,
    paddingHorizontal: space.safeX,
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  asideRaised: {
    backgroundColor: colors.surfaceRaised,
  },
});
