import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import { useElapsedSeconds } from "../../../hooks/use-elapsed-seconds";
import { colors, radius, shadows, space, typography } from "../../../theme";
import { Duck } from "../../ui/duck";

type ThinkPartProps = {
  thought: string;
  isThinking: boolean;
};

function thinkingLabel(isThinking: boolean, seconds: number | null) {
  if (isThinking) return `Thinking… ${seconds ?? 0}s`;
  if (seconds === null) return "Thought";
  return `Thought for ${Math.max(seconds, 1)}s`;
}

export function ThinkPart({ thought, isThinking }: ThinkPartProps) {
  const [expanded, setExpanded] = useState(false);
  const [focused, setFocused] = useState(false);
  const seconds = useElapsedSeconds(isThinking);
  const Chevron = expanded ? ChevronDown : ChevronRight;

  return (
    <Pressable
      onPress={() => setExpanded((value) => !value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      accessibilityLabel={thinkingLabel(isThinking, seconds)}
      style={[styles.container, focused && styles.focused]}
    >
      <View style={styles.header}>
        <Duck height={30} />
        <Text style={typography.caption}>{thinkingLabel(isThinking, seconds)}</Text>
        <Chevron size={24} color={colors.inkSubtle} strokeWidth={2.5} />
      </View>
      {expanded && <Text style={[typography.callout, styles.thought]}>{thought}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    maxWidth: 1300,
    gap: space[3],
    paddingVertical: space[2],
    paddingHorizontal: space[3],
    borderRadius: radius.md,
  },
  focused: {
    backgroundColor: colors.surface,
    boxShadow: shadows.focusRing,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[2],
  },
  thought: {
    color: colors.inkSubtle,
  },
});
