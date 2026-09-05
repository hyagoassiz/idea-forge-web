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
import { useForm, UseFormReturn } from "react-hook-form";
import { LoginUserForm, loginUserSchema } from "../schema/loginUserSchema";

interface UseLoginUserFormReturn {
  isLoading: boolean;
  loginUserForm: UseFormReturn<LoginUserForm>;
  showResendVerificationEmailLink: boolean;
  handleLogin(): void;
  handleResendVerificationEmail(): void;
}

export function useLoginUserForm(): UseLoginUserFormReturn {
  const router = useRouter();

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
      setTimeout(() => router.push("/dashboard"), 1000);
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

      setTimeout(() => {
        router.push(`/verify-email/send?email=${email}&token=${token}`);
      }, 1000);
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

  return {
    isLoading: loginMutation.isPending || resendMutation.isPending,
    loginUserForm,
    showResendVerificationEmailLink:
      loginMutation.error?.code === "EMAIL_NOT_VERIFIED" &&
      !resendMutation.isError &&
      !loginUserForm.formState.isValid,
    handleLogin,
    handleResendVerificationEmail,
  };
}
