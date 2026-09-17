import { ApiErrorResponse } from "@/lib/api/types";
import { authService } from "@/modules/auth/services/authService";
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/modules/auth/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type ResetPasswordMutationOptions = UseMutationOptions<
  ResetPasswordResponse,
  ApiErrorResponse,
  ResetPasswordRequest
>;

export function useResetPasswordMutation(
  options?: ResetPasswordMutationOptions,
) {
  return useMutation({
    mutationFn: authService.resetPassword,
    ...options,
  });
}
