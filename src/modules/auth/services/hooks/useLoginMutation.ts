import { ApiErrorResponse } from "@/lib/api/types";
import { authService } from "@/modules/auth/services/authService";
import { LoginRequest, LoginResponse } from "@/modules/auth/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type LoginMutationOptions = UseMutationOptions<
  LoginResponse,
  ApiErrorResponse,
  LoginRequest
>;

export function useLoginMutation(options?: LoginMutationOptions) {
  return useMutation({
    mutationFn: authService.login,
    ...options,
  });
}
