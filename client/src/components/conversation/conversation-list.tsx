import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import type { ConversationSummary } from "../../hooks/use-conversations";
import { colors, space, typography } from "../../theme";
import { ConversationRow } from "./conversation-row";

type ConversationListProps = {
  conversations: ConversationSummary[] | undefined;
  isPending: boolean;
  isSearching: boolean;
  onOpen: (id: string) => void;
};

export function ConversationList({ conversations, isPending, isSearching, onOpen }: ConversationListProps) {
  if (isPending) {
    return <ActivityIndicator size="large" color={colors.duck} />;
  }

  if (!conversations) {
    return <Text style={typography.body}>{"Couldn't load your conversations."}</Text>;
  }

  if (conversations.length === 0 && isSearching) {
    return <Text style={typography.body}>No matching conversations.</Text>;
  }

  if (conversations.length === 0) {
    return <Text style={typography.body}>No conversations yet.</Text>;
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.list}>
      {conversations.map((conversation) => (
        <ConversationRow key={conversation.id} conversation={conversation} onPress={() => onOpen(conversation.id)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: -space[3],
  },
  list: {
    gap: space[3],
    padding: space[3],
  },
});
