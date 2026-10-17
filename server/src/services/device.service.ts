import { auth } from "../lib/auth.js";
import { ServiceError } from "./service-error.js";

class DeviceService {
  async approve(userCode: string, headers: Headers) {
    try {
      await this.claim(userCode, headers);
      await auth.api.deviceApprove({ body: { userCode }, headers });
    } catch (error) {
      throw ServiceError.fromAuth(error);
    }
  }

  async deny(userCode: string, headers: Headers) {
    try {
      await this.claim(userCode, headers);
      await auth.api.deviceDeny({ body: { userCode }, headers });
    } catch (error) {
      throw ServiceError.fromAuth(error);
    }
  }

  private claim(userCode: string, headers: Headers) {
    return auth.api.deviceVerify({ query: { user_code: userCode }, headers });
  }
}

export const deviceService = new DeviceService();
