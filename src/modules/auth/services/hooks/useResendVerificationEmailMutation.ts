import { ApiErrorResponse } from "@/lib/api/types";
import { authService } from "@/modules/auth/services/authService";
import {
  ResendEmailVerificationRequest,
  ResendEmailVerificationResponse,
} from "@/modules/auth/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type ResendVerificationEmailMutationOptions = UseMutationOptions<
  ResendEmailVerificationResponse,
  ApiErrorResponse,
  ResendEmailVerificationRequest
>;

export function useResendVerificationEmailMutation(
  options?: ResendVerificationEmailMutationOptions,
) {
  return useMutation({
    mutationFn: authService.resendVerificationEmail,
    ...options,
  });
}
