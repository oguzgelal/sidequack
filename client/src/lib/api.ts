import { sessionStore } from "./session-store";

export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`Request failed with status ${status}`);
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${sessionStore.getToken()}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!response.ok) throw new ApiError(response.status);
  if (response.status === 204) return undefined as T;
  return response.json();
}
