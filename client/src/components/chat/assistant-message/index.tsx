import type { UIMessage } from "@tanstack/ai-react";
import { StyleSheet, View } from "react-native";
import { space } from "../../../theme";
import { TextPart } from "./text-part";
import { WeatherPart } from "./weather-part";

export function AssistantMessage({ message }: { message: UIMessage }) {
  return (
    <View style={styles.message}>
      {message.parts.map((part, index) => {
        if (part.type === "text") return <TextPart key={index} text={part.content} />;
        if (part.type === "tool-call" && part.name === "get_weather" && part.state === "complete") {
          return <WeatherPart key={index} weather={part.output} />;
        }
        return null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    gap: space[3],
  },
});
