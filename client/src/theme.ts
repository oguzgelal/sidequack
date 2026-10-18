import { Easing, StyleSheet } from "react-native";
import {
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from "@expo-google-fonts/bricolage-grotesque";
import {
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
  Figtree_800ExtraBold,
} from "@expo-google-fonts/figtree";

export const fontAssets = {
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
  Figtree_800ExtraBold,
};

export const fonts = {
  displayBold: "BricolageGrotesque_700Bold",
  displayExtraBold: "BricolageGrotesque_800ExtraBold",
  textMedium: "Figtree_500Medium",
  textSemiBold: "Figtree_600SemiBold",
  textBold: "Figtree_700Bold",
  textExtraBold: "Figtree_800ExtraBold",
} satisfies Record<string, keyof typeof fontAssets>;

export const colors = {
  canvas: "#15130f",
  surface: "#211d17",
  surfaceRaised: "#2d2820",
  line: "#4a4236",
  ink: "#fff8e7",
  inkMuted: "#c9bead",
  inkSubtle: "#a0957f",
  duck: "#ffc842",
  onDuck: "#1c1812",
  duckSoft: "#3a2f17",
  beak: "#f06419",
  onBeak: "#1c1812",
  beakSoft: "#3d2316",
  beakText: "#ff8a4d",
  success: "#5fd3b3",
  danger: "#ff8090",
  focus: "#ffc842",
};

export const space = {
  1: 4,
  2: 8,
  3: 16,
  4: 24,
  5: 32,
  6: 40,
  7: 48,
  8: 64,
  9: 96,
  safeX: 80,
  safeY: 60,
};

export const radius = {
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
  pill: 999,
};

export const shadows = {
  rest: "0 2px 6px #00000066",
  lift: "0 24px 48px -8px #000000b3",
  focusRing: `0 0 0 4px ${colors.canvas}, 0 0 0 10px ${colors.focus}`,
};

export const motion = {
  focusScale: 1.08,
  pressScale: 0.96,
  focusDuration: 180,
  focusEasing: Easing.bezier(0.3, 1.4, 0.5, 1),
};

export const typography = StyleSheet.create({
  hero: {
    fontFamily: fonts.displayExtraBold,
    fontSize: 82,
    lineHeight: 82,
    letterSpacing: -1.92,
    color: colors.ink,
  },
  title1: {
    fontFamily: fonts.displayExtraBold,
    fontSize: 64,
    lineHeight: 72,
    letterSpacing: -0.96,
    color: colors.ink,
  },
  title2: {
    fontFamily: fonts.displayBold,
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -0.48,
    color: colors.ink,
  },
  title3: {
    fontFamily: fonts.displayBold,
    fontSize: 38,
    lineHeight: 46,
    letterSpacing: -0.19,
    color: colors.ink,
  },
  headline: {
    fontFamily: fonts.textBold,
    fontSize: 32,
    lineHeight: 40,
    color: colors.ink,
  },
  body: {
    fontFamily: fonts.textMedium,
    fontSize: 29,
    lineHeight: 40,
    color: colors.inkMuted,
  },
  label: {
    fontFamily: fonts.textBold,
    fontSize: 28,
    lineHeight: 32,
    color: colors.ink,
  },
  callout: {
    fontFamily: fonts.textSemiBold,
    fontSize: 25,
    lineHeight: 34,
    color: colors.inkMuted,
  },
  caption: {
    fontFamily: fonts.textSemiBold,
    fontSize: 23,
    lineHeight: 30,
    letterSpacing: 0.23,
    color: colors.inkSubtle,
  },
});
