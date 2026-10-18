import type { UIMessage } from "@tanstack/ai-react";
import { StyleSheet, View } from "react-native";
import { space } from "../../theme";
import { AssistantMessage } from "./assistant-message";
import { UserMessage } from "./user-message";

export function ChatMessages({ messages }: { messages: UIMessage[] }) {
  return (
    <View style={styles.messages}>
      {messages.map((message) => {
        if (message.role === "user") return <UserMessage key={message.id} message={message} />;
        return <AssistantMessage key={message.id} message={message} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  messages: {
    gap: space[5],
  },
});
