import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useChat } from "@tanstack/ai-react";
import { ChatMessages } from "../components/chat/chat-messages";
import { TvButton } from "../components/tv-button";
import { chatConnection } from "../lib/chat-connection";
import { colors, typography } from "../theme";

export function ChatScreen({ onSignOut }: { onSignOut: () => void }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const { messages, sendMessage, isLoading, error } = useChat({ connection: chatConnection });

  const handleSubmit = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage(text);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
      >
        <ChatMessages messages={messages} />
      </ScrollView>
      {error && <Text style={typography.body}>{error.message}</Text>}
      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSubmit}
          editable={!isLoading}
          placeholder="Ask anything"
          placeholderTextColor={colors.mutedForeground}
        />
        <TvButton label="Sign out" onPress={onSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    padding: 80,
    gap: 32,
  },
  messages: {
    flex: 1,
  },
  composer: {
    flexDirection: "row",
    gap: 24,
  },
  input: {
    flex: 1,
    fontSize: 32,
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderRadius: 16,
    backgroundColor: colors.surface,
    color: colors.foreground,
  },
});
