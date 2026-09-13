import { ApiErrorResponse } from "@/lib/api/types";
import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  ResetPasswordForm,
  resetPasswordSchema,
} from "@/modules/auth/components/ResetPasswordForm/schema/resetPasswordSchema";
import {
  useResetPasswordMutation,
  useResetPasswordValidateQuery,
} from "@/modules/auth/services/hooks";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const resetPasswordValidateQuery = useResetPasswordValidateQuery(
    { token: token! },
    {
      retry: false,
    },
  );

  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: () => {
      router.push(routes.public.login);
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
      router.replace(routes.public.login);
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
