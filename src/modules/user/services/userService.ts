import { api } from "@/lib/api/api";
import {
  CreateUserRequest,
  CreateUserUserResponse,
  UserResponse,
} from "@/modules/user/types/user";

export const userService = {
  createUser: async (
    payload: CreateUserRequest,
  ): Promise<CreateUserUserResponse> => {
    return api("/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getMe: async (): Promise<UserResponse> => {
    return api("/users/me", {
      method: "GET",
    });
  },
};
