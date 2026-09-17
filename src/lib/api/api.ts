// lib/api/api.ts

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

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
    throw data;
  }

  return data as T;
}
