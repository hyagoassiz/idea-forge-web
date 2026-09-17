import { useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { authService } from "@/modules/auth/services/authService";
import {
  ValidateResetTokenRequest,
  ValidateResetTokenResponse,
} from "@/modules/auth/types";

export const RESET_PASSWORD_VALIDATE_KEY = "RESET_PASSWORD_VALIDATE_KEY";

type ResetPasswordValidateQueryOptions = QueryOptions<
  ValidateResetTokenResponse,
  ApiErrorResponse
>;

export function useResetPasswordValidateQuery(
  payload: ValidateResetTokenRequest,
  options?: ResetPasswordValidateQueryOptions,
) {
  return useQuery({
    queryKey: [RESET_PASSWORD_VALIDATE_KEY, payload.token],
    queryFn: () => authService.resetPasswordValidate(payload),
    enabled: !!payload.token,
    ...options,
  });
}
