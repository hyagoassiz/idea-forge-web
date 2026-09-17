import { ApiErrorResponse } from "@/lib/api/types";
import { authService } from "@/modules/auth/services/authService";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "@/modules/auth/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type ForgotPasswordMutationOptions = UseMutationOptions<
  ForgotPasswordResponse,
  ApiErrorResponse,
  ForgotPasswordRequest
>;

export function useForgotPasswordMutation(
  options?: ForgotPasswordMutationOptions,
) {
  return useMutation({
    mutationFn: authService.forgotPassword,
    ...options,
  });
}
