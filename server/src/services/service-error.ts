import { APIError } from "better-auth/api";

export class ServiceError extends Error {
  static fromAuth(error: unknown): ServiceError {
    if (!(error instanceof APIError)) throw error;
    return new ServiceError(error.body?.error_description ?? error.body?.message ?? error.message);
  }
}
