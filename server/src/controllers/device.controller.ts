import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import {
  deviceQuerySchema,
  signInSchema,
  socialProviderParamSchema,
  userCodeSchema,
} from "../schemas/device.schema.js";
import { authService } from "../services/auth.service.js";
import { deviceService } from "../services/device.service.js";
import { ServiceError } from "../services/service-error.js";

const SOCIAL_SIGN_IN_FAILED = "Couldn't sign you in. Please try again.";

const factory = createFactory();

class DeviceController {
  show = factory.createHandlers(zValidator("query", deviceQuerySchema), async (c) => {
    const { user_code: userCode, error } = c.req.valid("query");
    const session = await authService.getSession(c.req.raw.headers);
    if (!session) {
      return c.render("Device/SignIn", {
        userCode,
        providers: await authService.getSocialProviders(),
        error: error ? SOCIAL_SIGN_IN_FAILED : null,
      });
    }
    return c.render("Device/Approve", { email: session.user.email, userCode, error: null as string | null });
  });

  signIn = factory.createHandlers(zValidator("json", signInSchema), async (c) => {
    const { mode, name, email, password, userCode } = c.req.valid("json");
    const headers = c.req.raw.headers;
    try {
      const cookies =
        mode === "sign-up"
          ? await authService.signUp({ name: name || email, email, password }, headers)
          : await authService.signIn({ email, password }, headers);
      for (const cookie of cookies) c.header("set-cookie", cookie, { append: true });
      return c.redirect(this.deviceUrl(userCode));
    } catch (error) {
      if (!(error instanceof ServiceError)) throw error;
      return c.render("Device/SignIn", {
        userCode,
        providers: await authService.getSocialProviders(),
        error: error.message,
      });
    }
  });

  signInSocial = factory.createHandlers(
    zValidator("param", socialProviderParamSchema),
    zValidator("query", deviceQuerySchema),
    async (c) => {
      const { provider } = c.req.valid("param");
      const { user_code: userCode } = c.req.valid("query");
      try {
        const { url, cookies } = await authService.signInSocial(provider, this.deviceUrl(userCode), c.req.raw.headers);
        for (const cookie of cookies) c.header("set-cookie", cookie, { append: true });
        return c.redirect(url);
      } catch (error) {
        if (!(error instanceof ServiceError)) throw error;
        return c.redirect(this.deviceUrl(userCode, { error: "social" }));
      }
    },
  );

  approve = this.decide(true);

  deny = this.decide(false);

  private decide(approved: boolean) {
    return factory.createHandlers(zValidator("json", userCodeSchema), async (c) => {
      const { userCode } = c.req.valid("json");
      const headers = c.req.raw.headers;
      const session = await authService.getSession(headers);
      if (!session) return c.redirect(this.deviceUrl(userCode));
      try {
        await (approved ? deviceService.approve(userCode, headers) : deviceService.deny(userCode, headers));
        return c.render("Device/Done", { approved });
      } catch (error) {
        if (!(error instanceof ServiceError)) throw error;
        return c.render("Device/Approve", { email: session.user.email, userCode, error: error.message });
      }
    });
  }

  private deviceUrl(userCode: string, params: Record<string, string> = {}) {
    return `/device?${new URLSearchParams({ user_code: userCode, ...params })}`;
  }
}

export const deviceController = new DeviceController();
