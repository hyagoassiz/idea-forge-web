import { api } from "@/lib/api/api";
import {
  EmailVerificationResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  ResendEmailVerificationRequest,
  ResendEmailVerificationResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ValidateResetTokenRequest,
  ValidateResetTokenResponse,
  VerifyEmailRequest,
} from "@/modules/auth/types";

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyEmail(
  payload: VerifyEmailRequest,
): Promise<EmailVerificationResponse> {
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
