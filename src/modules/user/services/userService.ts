import { api } from "@/lib/api/api";
import {
  CreateUserRequest,
  UserLoginRequest,
  UserLoginResponse,
  UserResponse,
} from "@/modules/user/types/user";

export async function createUser(
  payload: CreateUserRequest,
): Promise<UserResponse> {
  return api("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getCurrentUser(): Promise<UserResponse> {
  return api("/users/me");
}

export async function loginUser(
  payload: UserLoginRequest,
): Promise<UserLoginResponse> {
  return api("/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
