import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, type StyleProp, type ViewStyle } from "react-native";
import { Mic, Square } from "lucide-react-native";
import { colors, fonts, radius, shadows, space, typography } from "../../theme";

type ChatComposerProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  isResponding?: boolean;
  onStop?: () => void;
  hasTVPreferredFocus?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ChatComposer({
  value,
  onChangeText,
  onSubmit,
  isResponding,
  onStop,
  hasTVPreferredFocus,
  style,
}: ChatComposerProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  if (isResponding) {
    return (
      <Pressable
        onPress={onStop}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        hasTVPreferredFocus={hasTVPreferredFocus}
        accessibilityLabel="Stop responding"
        style={[styles.composer, focused && styles.focused, style]}
      >
        <View style={styles.mic}>
          <Square size={28} color={colors.onDuck} fill={colors.onDuck} />
        </View>
        <Text style={styles.text}>Stop responding</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      hasTVPreferredFocus={hasTVPreferredFocus}
      accessibilityLabel="Ask anything"
      style={[styles.composer, focused && styles.focused, style]}
    >
      <View style={styles.mic}>
        <Mic size={36} color={colors.onDuck} strokeWidth={2.5} />
      </View>
      <Text style={[styles.text, !value && styles.placeholder]} numberOfLines={1}>
        {value || "Ask anything"}
      </Text>
      <Text style={typography.caption}>Hold the mic button to talk</Text>
      {/* tvOS draws its own system chrome around a visible TextInput, so it stays hidden and only hosts the keyboard. */}
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Ask anything"
        focusable={false}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  composer: {
    height: 96,
    flexDirection: "row",
    alignItems: "center",
    gap: space[4],
    paddingLeft: 12,
    paddingRight: space[6],
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    boxShadow: shadows.rest,
  },
  focused: {
    boxShadow: `${shadows.lift}, ${shadows.focusRing}`,
  },
  mic: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.duck,
  },
  text: {
    flex: 1,
    fontFamily: fonts.textSemiBold,
    fontSize: 32,
    color: colors.ink,
  },
  placeholder: {
    color: colors.inkSubtle,
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});
