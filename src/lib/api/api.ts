// lib/api/api.ts
// lib/api/api.ts

import { ApiErrorResponse } from "@/lib/api/types/apiErrorResponse";
import { routes } from "@/routes";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

function isExpiredAuthError(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "AUTH_TOKEN_EXPIRED"
  );
}

export async function api<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const responseText = await response.text();
  const data = responseText
    ? (JSON.parse(responseText) as T | ApiErrorResponse)
    : undefined;

  if (!response.ok) {
    if (
      response.status === 401 &&
      isExpiredAuthError(data) &&
      typeof window !== "undefined" &&
      window.location.pathname !== routes.public.login
    ) {
      window.location.replace(routes.public.login);
    }

    throw data;
  }

  return data as T;
}
