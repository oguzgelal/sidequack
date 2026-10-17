import { StyleSheet } from "react-native";

export const colors = {
  background: "#0a0a0a",
  surface: "#1b1b1b",
  foreground: "#fafafa",
  mutedForeground: "#a1a1a1",
  border: "#2e2e2e",
  focus: "#fafafa",
  focusForeground: "#0a0a0a",
};

export const typography = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: "700",
    color: colors.foreground,
  },
  body: {
    fontSize: 32,
    color: colors.mutedForeground,
  },
});
