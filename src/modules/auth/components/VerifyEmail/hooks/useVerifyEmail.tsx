"use client";

import { ApiErrorResponse } from "@/lib/api/types";
import { verifyEmail } from "@/modules/auth/services/authService";
import {
  EmailVerificationResponse,
  VerifyEmailRequest,
} from "@/modules/auth/types";
import { routes } from "@/routes";
import { useMutation } from "@tanstack/react-query";
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

  const { mutate, isPending, isError, data, error } = useMutation<
    EmailVerificationResponse,
    ApiErrorResponse,
    VerifyEmailRequest
  >({
    mutationFn: verifyEmail,
  });

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
