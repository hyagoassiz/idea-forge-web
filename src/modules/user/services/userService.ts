import { api } from "@/lib/api/api";
import {
  CreateUserRequest,
  CreateUserUserResponse,
  UserLoginRequest,
  UserLoginResponse,
} from "@/modules/user/types/user";

export async function createUser(
  payload: CreateUserRequest,
): Promise<CreateUserUserResponse> {
  return api("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(
  payload: UserLoginRequest,
): Promise<UserLoginResponse> {
  return api("/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
