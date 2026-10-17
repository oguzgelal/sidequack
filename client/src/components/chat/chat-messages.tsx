import type { UIMessage } from "@tanstack/ai-react";
import { StyleSheet, View } from "react-native";
import { TextPart } from "./parts/text-part";
import { WeatherPart } from "./parts/weather-part";

export function ChatMessages({ messages }: { messages: UIMessage[] }) {
  return (
    <View style={styles.messages}>
      {messages.map((message) => (
        <View key={message.id} style={[styles.message, message.role === "user" && styles.userMessage]}>
          {message.parts.map((part, index) => {
            if (part.type === "text") return <TextPart key={index} text={part.content} />;
            if (part.type === "tool-call" && part.name === "get_weather" && part.state === "complete") {
              return <WeatherPart key={index} weather={part.output} />;
            }
            return null;
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  messages: {
    gap: 32,
  },
  message: {
    gap: 8,
  },
  userMessage: {
    alignItems: "flex-end",
  },
});
