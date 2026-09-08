import { api } from "@/lib/api/api";
import {
  CreateUserRequest,
  CreateUserUserResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResendEmailVerificationRequest,
  ResendEmailVerificationResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UserLoginRequest,
  UserLoginResponse,
  ValidateResetTokenRequest,
  ValidateResetTokenResponse,
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

export async function getMe(): Promise<UserLoginResponse> {
  return api("/users/me", {
    method: "GET",
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

export async function forgotPassword(
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> {
  return api("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export async function resetPasswordValidate(
  payload: ValidateResetTokenRequest,
): Promise<ValidateResetTokenResponse> {
  return api(`/auth/reset-password/validate?token=${payload.token}`, {
    method: "GET",
  });
}

export async function resetPassword(
  payload: ResetPasswordRequest,
): Promise<ResetPasswordResponse> {
  return api("/auth/reset-password", {
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
