import { auth } from "../lib/auth.js";
import { ServiceError } from "./service-error.js";

type Credentials = { email: string; password: string };
type Registration = Credentials & { name: string };

class AuthService {
  getSession(headers: Headers) {
    return auth.api.getSession({ headers });
  }

  async signIn({ email, password }: Credentials, headers: Headers) {
    try {
      const result = await auth.api.signInEmail({ body: { email, password }, headers, returnHeaders: true });
      return result.headers.getSetCookie();
    } catch (error) {
      throw ServiceError.fromAuth(error);
    }
  }

  async signUp({ name, email, password }: Registration, headers: Headers) {
    try {
      const result = await auth.api.signUpEmail({ body: { name, email, password }, headers, returnHeaders: true });
      return result.headers.getSetCookie();
    } catch (error) {
      throw ServiceError.fromAuth(error);
    }
  }
}

export const authService = new AuthService();
