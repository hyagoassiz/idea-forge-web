import { ApiErrorResponse } from "@/lib/api/types";
import { userService } from "@/modules/user/services/userService";
import {
  CreateUserRequest,
  CreateUserUserResponse,
} from "@/modules/user/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type CreateUserMutationOptions = UseMutationOptions<
  CreateUserUserResponse,
  ApiErrorResponse,
  CreateUserRequest
>;

export function useCreateUserMutation(options?: CreateUserMutationOptions) {
  return useMutation({
    mutationFn: userService.createUser,
    ...options,
  });
}
