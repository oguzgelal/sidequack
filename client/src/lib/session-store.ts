import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "session-token";

export const sessionStore = {
  getToken: () => SecureStore.getItem(TOKEN_KEY),
  setToken: (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clear: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};
