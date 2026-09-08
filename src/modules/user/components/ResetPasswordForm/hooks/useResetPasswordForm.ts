import { ApiErrorResponse } from "@/lib/api/types";
import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  ResetPasswordForm,
  resetPasswordSchema,
} from "@/modules/user/components/ResetPasswordForm/schema/resetPasswordSchema";
import {
  resetPassword,
  resetPasswordValidate,
} from "@/modules/user/services/userService";
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/modules/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseResetPasswordFormReturn {
  apiMessage: string | null;
  alertSeverity: "error" | "success" | undefined;
  isLoading: boolean;
  resetPasswordForm: UseFormReturn<ResetPasswordForm>;
  handleConfirm(): void;
}

export function useResetPasswordForm(): UseResetPasswordFormReturn {
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const resetPasswordForm = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordValidateQuery = useQuery({
    queryKey: ["reset-password-validate", token],
    queryFn: () => resetPasswordValidate({ token: token! }),
    enabled: !!token,
    retry: false,
  });

  const resetPasswordMutation = useMutation<
    ResetPasswordResponse,
    ApiErrorResponse,
    ResetPasswordRequest
  >({
    mutationFn: resetPassword,

    onSuccess: () => {
      router.push("login");
    },

    onError: (error) => {
      applyFieldErrors(resetPasswordForm, error);
    },
  });

  const apiMessage =
    (resetPasswordValidateQuery.error as ApiErrorResponse | null)?.message ??
    resetPasswordValidateQuery.data?.message ??
    null;

  const handleConfirm = resetPasswordForm.handleSubmit(({ password }) => {
    resetPasswordMutation.mutate({
      password,
      token: token ?? "",
    });
  });

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return {
    apiMessage,
    alertSeverity: resetPasswordValidateQuery.isError ? "error" : "success",
    isLoading: false,
    resetPasswordForm,
    handleConfirm,
  };
}
