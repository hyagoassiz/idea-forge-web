import { ApiErrorResponse } from "@/lib/api/types";
import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "@/modules/auth/components/LoginUserForm/components/ForgotPassword/schema/forgotPasswordSchema";
import { forgotPassword } from "@/modules/auth/services/authService";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "@/modules/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseForgotPasswordDialogReturn {
  apiMessage: string | null;
  alertSeverity: "error" | "success" | undefined;
  forgotPasswordForm: UseFormReturn<ForgotPasswordForm>;
  isLoading: boolean;
  handleConfirm(): void;
}

export function useForgotPasswordDialog(): UseForgotPasswordDialogReturn {
  const router = useRouter();

  const forgotPasswordForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { mutate, error, data, isPending, isError } = useMutation<
    ForgotPasswordResponse,
    ApiErrorResponse,
    ForgotPasswordRequest
  >({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      setTimeout(() => {
        router.push(`/reset-password?token=${response.token}`);
      }, 1500);
    },
  });

  const apiMessage =
    (error as ApiErrorResponse | null)?.message ?? data?.message ?? null;

  const handleConfirm = forgotPasswordForm.handleSubmit(({ email }) => {
    mutate({ email });
  });

  return {
    apiMessage,
    alertSeverity: isError ? "error" : "success",
    forgotPasswordForm,
    isLoading: isPending,
    handleConfirm,
  };
}
