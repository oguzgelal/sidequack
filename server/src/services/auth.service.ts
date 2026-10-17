import { auth } from "../lib/auth.js";
import { SOCIAL_PROVIDERS, type SocialProvider } from "../schemas/device.schema.js";
import { ServiceError } from "./service-error.js";

type Credentials = { email: string; password: string };
type Registration = Credentials & { name: string };

class AuthService {
  getSession(headers: Headers) {
    return auth.api.getSession({ headers });
  }

  async getSocialProviders(): Promise<SocialProvider[]> {
    const { socialProviders } = await auth.$context;
    return SOCIAL_PROVIDERS.filter((id) => socialProviders.some((provider) => provider.id === id));
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

  async signInSocial(provider: SocialProvider, returnTo: string, headers: Headers) {
    try {
      const result = await auth.api.signInSocial({
        body: { provider, callbackURL: returnTo, errorCallbackURL: returnTo, disableRedirect: true },
        headers,
        returnHeaders: true,
      });
      if (!("url" in result.response) || !result.response.url) throw new ServiceError(`Couldn't reach ${provider}`);
      return { url: result.response.url, cookies: result.headers.getSetCookie() };
    } catch (error) {
      if (error instanceof ServiceError) throw error;
      throw ServiceError.fromAuth(error);
    }
  }
}

export const authService = new AuthService();
