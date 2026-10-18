import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { Screen } from "./src/components/screen";
import { authClient } from "./src/lib/auth-client";
import { sessionStore } from "./src/lib/session-store";
import { ChatScreen } from "./src/screens/chat-screen";
import { SignInScreen } from "./src/screens/sign-in-screen";
import { colors, fontAssets } from "./src/theme";

export default function App() {
  const session = authClient.useSession();
  const [fontsLoaded] = useFonts(fontAssets);

  const handleAuthorized = async (token: string) => {
    await sessionStore.setToken(token);
    session.refetch();
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    await sessionStore.clear();
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

  return (
    <Screen>
      <ChatScreen onSignOut={handleSignOut} />
    </Screen>
  );
}
