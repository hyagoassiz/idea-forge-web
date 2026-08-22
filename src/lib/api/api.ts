// lib/api/api.ts

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const data = (await response.json()) as T | ApiErrorResponse;

  if (!response.ok) {
    throw data;
  }

  return data as T;
}
