import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { ConversationSummary } from "../../hooks/use-conversations";
import { colors, radius, shadows, space, typography } from "../../theme";

type ConversationRowProps = {
  conversation: ConversationSummary;
  onPress: () => void;
};

export function ConversationRow({ conversation, onPress }: ConversationRowProps) {
  const [focused, setFocused] = useState(false);
  const updatedAt = new Date(conversation.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <Pressable
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={[styles.row, focused && styles.focused]}
    >
      <Text style={[typography.headline, styles.title]} numberOfLines={1}>
        {conversation.title ?? "New conversation"}
      </Text>
      <Text style={typography.caption}>{updatedAt}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[5],
    paddingVertical: space[5],
    paddingHorizontal: space[6],
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  focused: {
    backgroundColor: colors.surfaceRaised,
    boxShadow: `${shadows.lift}, ${shadows.focusRing}`,
  },
  title: {
    flex: 1,
  },
});
