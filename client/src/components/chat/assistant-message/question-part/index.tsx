import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { space, typography } from "../../../../theme";
import { Button } from "../../../ui/button";
import { QuestionOption } from "./question-option";

export type Question = {
  question: string;
  mode: "single" | "multiple";
  options: string[];
};

export type QuestionAnswer = {
  answers: string[];
  reply?: string;
};

type QuestionPartProps = {
  question: Question;
  answer: QuestionAnswer | undefined;
  canAnswer: boolean;
  onAnswer: (answer: QuestionAnswer) => void;
};

export function QuestionPart({ question, answer, canAnswer, onAnswer }: QuestionPartProps) {
  const [selected, setSelected] = useState<string[]>(answer?.answers ?? []);
  const isOpen = canAnswer && !answer;

  const toggle = (option: string) => {
    if (question.mode === "single") {
      setSelected([option]);
      return;
    }
    setSelected((current) =>
      current.includes(option) ? current.filter((value) => value !== option) : [...current, option],
    );
  };

  const handleSend = () => {
    if (selected.length === 0) return;
    onAnswer({ answers: question.options.filter((option) => selected.includes(option)) });
  };

  return (
    <View style={styles.container}>
      <Text style={typography.title3}>{question.question}</Text>
      <View style={styles.options}>
        {question.options.map((option, index) => (
          <QuestionOption
            key={option}
            label={option}
            selected={selected.includes(option)}
            disabled={!isOpen}
            onPress={() => toggle(option)}
            hasTVPreferredFocus={isOpen && index === 0}
          />
        ))}
      </View>
      {answer?.reply && <Text style={typography.callout}>You replied: {answer.reply}</Text>}
      {isOpen && <Button label="Send" variant="primary" onPress={handleSend} style={styles.send} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1300,
    gap: space[4],
  },
  options: {
    gap: space[3],
  },
  send: {
    alignSelf: "flex-start",
  },
});
