import { api } from "@/lib/api/api";
import {
  CreateUserRequest,
  CreateUserUserResponse,
  ResendEmailVerificationRequest,
  ResendEmailVerificationResponse,
  UserLoginRequest,
  UserLoginResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
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

export async function verifyEmail(
  payload: VerifyEmailRequest,
): Promise<VerifyEmailResponse> {
  return api("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function resendVerificationEmail(
  payload: ResendEmailVerificationRequest,
): Promise<ResendEmailVerificationResponse> {
  return api("/auth/resend-verification-email", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
