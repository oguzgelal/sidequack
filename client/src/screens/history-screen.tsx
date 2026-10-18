import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ConversationList } from "../components/conversation/conversation-list";
import { Button } from "../components/ui/button";
import { SearchField } from "../components/ui/search-field";
import { Wordmark } from "../components/ui/wordmark";
import { useConversations } from "../hooks/use-conversations";
import { useDebouncedValue } from "../hooks/use-debounced-value";
import { useTVBack } from "../hooks/use-tv-back";
import { useConversationStore } from "../stores/conversation-store";
import { space, typography } from "../theme";

const SEARCH_DELAY_MS = 300;

export function HistoryScreen({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DELAY_MS);
  const conversations = useConversations(debouncedSearch);
  const openConversation = useConversationStore((state) => state.openConversation);
  useTVBack(onClose);

  const handleOpen = (id: string) => {
    openConversation(id);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Wordmark />
        <Button label="Back" onPress={onClose} />
      </View>
      <Text style={typography.title2}>Conversations</Text>
      <SearchField value={search} onChangeText={setSearch} placeholder="Search conversations" hasTVPreferredFocus />
      <ConversationList
        conversations={conversations.data}
        isPending={conversations.isPending}
        isSearching={debouncedSearch.length > 0}
        onOpen={handleOpen}
      />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
