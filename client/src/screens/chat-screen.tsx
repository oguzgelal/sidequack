import { useRef, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useChat } from "@tanstack/ai-react";
import { ChatComposer } from "../components/chat/chat-composer";
import { ChatHeader } from "../components/chat/chat-header";
import { ChatMessages } from "../components/chat/chat-messages";
import { ChatWelcome } from "../components/chat/chat-welcome";
import { useAiUsage } from "../hooks/use-ai-usage";
import { chatConnection } from "../lib/chat-connection";
import { colors, space, typography } from "../theme";
import { PaywallScreen } from "./paywall-screen";

export function ChatScreen({ onSignOut }: { onSignOut: () => void }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const usage = useAiUsage();

  const { messages, sendMessage, isLoading, error } = useChat({
    connection: chatConnection,
    onError: usage.refresh,
  });

  const handleSubmit = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage(text);
    setInput("");
  };

  if (usage.status === "loading") {
    return <ActivityIndicator size="large" color={colors.duck} />;
  }

  if (usage.status === "limit-reached") {
    return <PaywallScreen />;
  }

  const isThinking = isLoading && messages.at(-1)?.role === "user";

  if (messages.length === 0) {
    return (
      <View style={styles.container}>
        <ChatHeader onSignOut={onSignOut} />
        <ChatWelcome
          onSuggestion={sendMessage}
          composer={
            <ChatComposer
              value={input}
              onChangeText={setInput}
              onSubmit={handleSubmit}
              editable={!isLoading}
              hasTVPreferredFocus
              style={styles.welcomeComposer}
            />
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChatHeader onSignOut={onSignOut} />
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
      >
        <ChatMessages messages={messages} />
        {isThinking && <Text style={typography.caption}>Thinking…</Text>}
      </ScrollView>
      {error && <Text style={[typography.body, styles.error]}>Something went wrong: {error.message}</Text>}
      <ChatComposer value={input} onChangeText={setInput} onSubmit={handleSubmit} editable={!isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    paddingVertical: space.safeY,
    paddingHorizontal: space.safeX,
    gap: space[5],
  },
  welcomeComposer: {
    width: 1200,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    gap: space[5],
  },
  error: {
    color: colors.danger,
  },
});
