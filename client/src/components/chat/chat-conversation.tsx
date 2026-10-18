import { useEffect, useEffectEvent, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useChat, type UIMessage } from "@tanstack/ai-react";
import { MessageSquarePlus, RotateCcwClock } from "lucide-react-native";
import { chatConnection } from "../../lib/chat-connection";
import { useConversationStore } from "../../stores/conversation-store";
import { colors, space, typography } from "../../theme";
import { Duck } from "../ui/duck";
import { IconButton } from "../ui/icon-button";
import { ChatComposer } from "./chat-composer";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatWelcome } from "./chat-welcome";

type ChatConversationProps = {
  savedMessages: UIMessage[];
  onSave: (messages: UIMessage[]) => void;
  onError: () => void;
  onOpenHistory: () => void;
  onSignOut: () => void;
};

export function ChatConversation({ savedMessages, onSave, onError, onOpenHistory, onSignOut }: ChatConversationProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const startNewConversation = useConversationStore((state) => state.startNewConversation);

  const { messages, sendMessage, stop, isLoading, error } = useChat({
    connection: chatConnection,
    initialMessages: savedMessages,
    onError,
  });

  const saveTurn = useEffectEvent(() => {
    if (messages.at(-1)?.id === savedMessages.at(-1)?.id) return;
    onSave(messages);
  });

  useEffect(() => {
    if (!isLoading) saveTurn();
  }, [isLoading]);

  const handleSubmit = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage(text);
    setInput("");
  };

  const isEmpty = messages.length === 0;
  const isThinking = isLoading && messages.at(-1)?.role === "user";

  const composerBar = (
    <View style={[styles.composerBar, isEmpty && styles.welcomeComposerBar]}>
      <ChatComposer
        value={input}
        onChangeText={setInput}
        onSubmit={handleSubmit}
        isResponding={isLoading}
        onStop={stop}
        hasTVPreferredFocus
        style={styles.composer}
      />
      {!isEmpty && <IconButton icon={MessageSquarePlus} label="New conversation" onPress={startNewConversation} />}
      <IconButton icon={RotateCcwClock} label="Conversation history" onPress={onOpenHistory} />
    </View>
  );

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <ChatHeader onSignOut={onSignOut} />
        <ChatWelcome onSuggestion={sendMessage} composer={composerBar} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChatHeader onSignOut={onSignOut} />
      <ScrollView
        ref={scrollRef}
        // react-native-tvos only maps `focusable` to `isTVSelectable` inside View, not ScrollView.
        isTVSelectable
        focusable
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
      >
        <ChatMessages messages={messages} />
        {isThinking && (
          <View style={styles.thinking}>
            <Duck height={30} />
            <Text style={typography.caption}>Thinking…</Text>
          </View>
        )}
      </ScrollView>
      {error && <Text style={[typography.body, styles.error]}>Something went wrong: {error.message}</Text>}
      {composerBar}
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
  composerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[4],
  },
  welcomeComposerBar: {
    width: 1200,
  },
  composer: {
    flex: 1,
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    gap: space[5],
  },
  thinking: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[2],
  },
  error: {
    color: colors.danger,
  },
});
