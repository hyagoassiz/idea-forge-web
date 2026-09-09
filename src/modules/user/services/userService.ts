import { api } from "@/lib/api/api";
import {
  CreateUserRequest,
  CreateUserUserResponse,
  UserResponse,
} from "@/modules/user/types/user";

export async function createUser(
  payload: CreateUserRequest,
): Promise<CreateUserUserResponse> {
  return api("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMe(): Promise<UserResponse> {
  return api("/users/me", {
    method: "GET",
  });
}
