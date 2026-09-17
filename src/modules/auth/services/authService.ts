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

export const authService = {
  forgotPassword: async (
    payload: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    return api("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    return api("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  logout: async (): Promise<void> => {
    return api("/auth/logout", {
      method: "POST",
    });
  },

  resendVerificationEmail: async (
    payload: ResendEmailVerificationRequest,
  ): Promise<ResendEmailVerificationResponse> => {
    return api("/auth/resend-verification-email", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  resetPassword: async (
    payload: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> => {
    return api("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  resetPasswordValidate: async (
    payload: ValidateResetTokenRequest,
  ): Promise<ValidateResetTokenResponse> => {
    return api(`/auth/reset-password/validate?token=${payload.token}`, {
      method: "GET",
    });
  },

  verifyEmail: async (
    payload: VerifyEmailRequest,
  ): Promise<EmailVerificationResponse> => {
    return api("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
