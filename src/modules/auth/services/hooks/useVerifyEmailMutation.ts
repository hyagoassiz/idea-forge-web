import { ApiErrorResponse } from "@/lib/api/types";
import { authService } from "@/modules/auth/services/authService";
import {
  EmailVerificationResponse,
  VerifyEmailRequest,
} from "@/modules/auth/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type VerifyEmailMutationOptions = UseMutationOptions<
  EmailVerificationResponse,
  ApiErrorResponse,
  VerifyEmailRequest
>;

export function useVerifyEmailMutation(options?: VerifyEmailMutationOptions) {
  return useMutation({
    mutationFn: authService.verifyEmail,
    ...options,
  });
}
