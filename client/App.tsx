import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Screen } from "./src/components/screen";
import { authClient } from "./src/lib/auth-client";
import { sessionStore } from "./src/lib/session-store";
import { ChatScreen } from "./src/screens/chat-screen";
import { HistoryScreen } from "./src/screens/history-screen";
import { SignInScreen } from "./src/screens/sign-in-screen";
import { useConversationStore } from "./src/stores/conversation-store";
import { colors, fontAssets } from "./src/theme";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const session = authClient.useSession();
  const [fontsLoaded] = useFonts(fontAssets);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const startNewConversation = useConversationStore((state) => state.startNewConversation);

  const handleAuthorized = async (token: string) => {
    await sessionStore.setToken(token);
    session.refetch();
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    await sessionStore.clear();
    queryClient.clear();
    startNewConversation();
    session.refetch();
  };

  if (session.isPending || !fontsLoaded) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={colors.duck} />
      </Screen>
    );
  }

  if (!session.data) {
    return (
      <Screen>
        <SignInScreen onAuthorized={handleAuthorized} />
      </Screen>
    );
  }

  if (isHistoryOpen) {
    return (
      <QueryClientProvider client={queryClient}>
        <Screen>
          <HistoryScreen onClose={() => setIsHistoryOpen(false)} />
        </Screen>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Screen>
        <ChatScreen onOpenHistory={() => setIsHistoryOpen(true)} onSignOut={handleSignOut} />
      </Screen>
    </QueryClientProvider>
  );
}
