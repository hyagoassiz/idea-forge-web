"use client";

import { ApiErrorResponse } from "@/lib/api/types";
import { useVerifyEmailMutation } from "@/modules/auth/services/hooks";
import { routes } from "@/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface IUseVerifyEmailReturn {
  apiMessage: string | null;
  isLoading: boolean;
  alertSeverity: "error" | "success" | undefined;
}

export function useVerifyEmail(): IUseVerifyEmailReturn {
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const { mutate, isPending, isError, data, error } = useVerifyEmailMutation();

  const apiMessage =
    (error as ApiErrorResponse | null)?.message ?? data?.message ?? null;

  useEffect(() => {
    if (!token) {
      router.replace(routes.public.login);

      return;
    }

    mutate({ token });
  }, [token, mutate, router]);

  return {
    apiMessage,
    isLoading: isPending,
    alertSeverity: isError ? "error" : "success",
  };
}
