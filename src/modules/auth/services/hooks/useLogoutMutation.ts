import { ApiErrorResponse } from "@/lib/api/types";
import { authService } from "@/modules/auth/services/authService";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type LogoutMutationOptions = UseMutationOptions<
  void,
  ApiErrorResponse,
  undefined
>;

export function useLogoutMutation(options?: LogoutMutationOptions) {
  return useMutation({
    mutationFn: authService.logout,
    ...options,
  });
}
