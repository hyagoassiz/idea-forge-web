"use client";

import { ApiErrorResponse } from "@/lib/api/types";
import { verifyEmail } from "@/modules/user/services/userService";
import { VerifyEmailRequest, VerifyEmailResponse } from "@/modules/user/types";
import { TypographyProps } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface IUseVerifyEmailReturn {
  apiMessage: string | null;
  isLoading: boolean;
  typographyColor: TypographyProps["color"] | undefined;
}

export function useVerifyEmail(): IUseVerifyEmailReturn {
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const { mutate, isPending, isError, data, error } = useMutation<
    VerifyEmailResponse,
    ApiErrorResponse,
    VerifyEmailRequest
  >({
    mutationFn: verifyEmail,
  });

  const apiMessage =
    (error as ApiErrorResponse | null)?.message ?? data?.message ?? null;

  const typographyColor: TypographyProps["color"] = isError
    ? "error"
    : undefined;

  useEffect(() => {
    if (!token) {
      router.replace("/login");

      return;
    }

    mutate({ token });
  }, [token, mutate, router]);

  return {
    apiMessage,
    isLoading: isPending,
    typographyColor,
  };
}
