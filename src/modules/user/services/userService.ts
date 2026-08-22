import { api } from "@/lib/api/api";
import {
  CreateUserRequestDTO,
  UserLoginRequestDTO,
  UserLoginResponseDTO,
  UserResponseDTO,
} from "@/modules/user/types/user";

export async function createUser(
  payload: CreateUserRequestDTO,
): Promise<UserResponseDTO> {
  return api("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getCurrentUser(): Promise<UserResponseDTO> {
  return api("/users/me");
}

export async function loginUser(
  payload: UserLoginRequestDTO,
): Promise<UserLoginResponseDTO> {
  return api("/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
