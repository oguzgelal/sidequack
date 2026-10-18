import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { Search } from "lucide-react-native";
import { colors, fonts, radius, shadows, space } from "../../theme";

type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  hasTVPreferredFocus?: boolean;
};

export function SearchField({ value, onChangeText, placeholder, hasTVPreferredFocus }: SearchFieldProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      hasTVPreferredFocus={hasTVPreferredFocus}
      accessibilityLabel={placeholder}
      style={[styles.field, focused && styles.focused]}
    >
      <Search size={36} color={colors.inkMuted} strokeWidth={2.5} />
      <Text style={[styles.text, !value && styles.placeholder]} numberOfLines={1}>
        {value || placeholder}
      </Text>
      {/* tvOS draws its own system chrome around a visible TextInput, so it stays hidden and only hosts the keyboard. */}
      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        focusable={false}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 88,
    flexDirection: "row",
    alignItems: "center",
    gap: space[4],
    paddingHorizontal: space[6],
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    boxShadow: shadows.rest,
  },
  focused: {
    boxShadow: `${shadows.lift}, ${shadows.focusRing}`,
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
