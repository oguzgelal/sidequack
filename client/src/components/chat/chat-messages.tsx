import type { UIMessage } from "@tanstack/ai-react";
import { StyleSheet, View } from "react-native";
import { space } from "../../theme";
import { AssistantMessage } from "./assistant-message";
import type { QuestionAnswer } from "./assistant-message/question-part";
import { UserMessage } from "./user-message";

type ChatMessagesProps = {
  messages: UIMessage[];
  canAnswer: boolean;
  onAnswer: (toolCallId: string, answer: QuestionAnswer) => void;
};

export function ChatMessages({ messages, canAnswer, onAnswer }: ChatMessagesProps) {
  return (
    <View style={styles.messages}>
      {messages.map((message) => {
        if (message.role === "user") return <UserMessage key={message.id} message={message} />;
        return <AssistantMessage key={message.id} message={message} canAnswer={canAnswer} onAnswer={onAnswer} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  messages: {
    gap: space[5],
  },
});
