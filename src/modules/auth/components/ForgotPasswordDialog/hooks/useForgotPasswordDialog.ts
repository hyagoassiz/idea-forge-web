import { ApiErrorResponse } from "@/lib/api/types";
import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "@/modules/auth/components/ForgotPasswordDialog/schema/forgotPasswordSchema";
import { useForgotPasswordMutation } from "@/modules/auth/services/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseForgotPasswordDialogReturn {
  apiMessage: string | null;
  alertSeverity: "error" | "success" | undefined;
  forgotPasswordForm: UseFormReturn<ForgotPasswordForm>;
  isLoading: boolean;
  handleConfirm(): void;
}

export function useForgotPasswordDialog(): UseForgotPasswordDialogReturn {
  const forgotPasswordForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { mutate, error, data, isPending, isError } =
    useForgotPasswordMutation();

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
