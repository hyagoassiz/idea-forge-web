import { ApiErrorResponse } from "@/lib/api/types";
import {
  ResetPasswordForm,
  resetPasswordSchema,
} from "@/modules/user/components/ResetPasswordForm/schema/resetPasswordSchema";
import { createUser } from "@/modules/user/services/userService";
import {
  CreateUserRequest,
  CreateUserUserResponse,
} from "@/modules/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseResetPasswordFormReturn {
  isLoading: boolean;
  resetPasswordForm: UseFormReturn<ResetPasswordForm>;
  handleRegister(): void;
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

  const { mutate, isPending } = useMutation<
    CreateUserUserResponse,
    ApiErrorResponse,
    CreateUserRequest
  >({
    mutationFn: createUser,
    onSuccess: (response) => {
      router.push(
        `/verify-email/sent?email=${response.email}&token=${response.token}`,
      );
    },
    onError: (error) => {
      error?.errors?.forEach((item) => {
        resetPasswordForm.setError(item.field as keyof ResetPasswordForm, {
          message: item.message,
        });
      });
    },
  });

  const handleRegister = resetPasswordForm.handleSubmit((data) => {
    // mutate({
    //   password: data.password,
    // });
  });

  useEffect(() => {
    if (!token) {
      router.replace("/login");

      return;
    }

    // mutate({ token });
  }, [token, mutate, router]);

  return { isLoading: isPending, resetPasswordForm, handleRegister };
}
