import { ApiErrorResponse } from "@/lib/api/types";
import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  loginUser,
  resendVerificationEmail,
} from "@/modules/user/services/userService";
import {
  ResendEmailVerificationRequest,
  ResendEmailVerificationResponse,
  UserLoginRequest,
  UserLoginResponse,
} from "@/modules/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { LoginUserForm, loginUserSchema } from "../schema/loginUserSchema";

interface UseLoginUserFormReturn {
  isForgotPasswordDialogOpen: boolean;
  isLoading: boolean;
  loginUserForm: UseFormReturn<LoginUserForm>;
  showResendVerificationEmailLink: boolean;
  handleLogin(): void;
  handleResendVerificationEmail(): void;
  toggleForgotPasswordDialog(): void;
}

export function useLoginUserForm(): UseLoginUserFormReturn {
  const router = useRouter();

  const [isForgotPasswordDialogOpen, setIsForgotPasswordDialogOpen] =
    useState(false);

  const loginUserForm = useForm<LoginUserForm>({
    resolver: zodResolver(loginUserSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation<
    UserLoginResponse,
    ApiErrorResponse,
    UserLoginRequest
  >({
    mutationFn: loginUser,

    onSuccess: () => {
      router.push("/dashboard");
    },

    onError: (error) => {
      resendMutation.reset();

      if (error.code === "INVALID_CREDENTIALS") {
        loginUserForm.setError("email", {
          type: "manual",
          message: error.message,
        });

        loginUserForm.setError("password", {
          type: "manual",
          message: error.message,
        });

        return;
      }

      applyFieldErrors(loginUserForm, error);
    },
  });

  const resendMutation = useMutation<
    ResendEmailVerificationResponse,
    ApiErrorResponse,
    ResendEmailVerificationRequest
  >({
    mutationFn: resendVerificationEmail,

    onSuccess: ({ token }) => {
      const email = loginUserForm.getValues("email");

      router.push(`/verify-email/sent?email=${email}&token=${token}`);
    },

    onError: (error) => {
      applyFieldErrors(loginUserForm, error);
    },
  });

  const handleLogin = loginUserForm.handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  function handleResendVerificationEmail(): void {
    resendMutation.mutate({
      email: loginUserForm.getValues("email"),
    });
  }

  function toggleForgotPasswordDialog(): void {
    setIsForgotPasswordDialogOpen((prevState) => !prevState);
  }

  return {
    isForgotPasswordDialogOpen,
    isLoading: loginMutation.isPending || resendMutation.isPending,
    loginUserForm,
    showResendVerificationEmailLink:
      loginMutation.error?.code === "EMAIL_NOT_VERIFIED" &&
      !resendMutation.isError &&
      !loginUserForm.formState.isValid,
    handleLogin,
    handleResendVerificationEmail,
    toggleForgotPasswordDialog,
  };
}
