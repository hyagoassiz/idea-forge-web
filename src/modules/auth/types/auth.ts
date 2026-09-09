import { User } from "@/modules/user/types";

export type LoginRequest = Pick<User, "email" | "password">;

export type LoginResponse = Pick<User, "email" | "emailVerified"> & {
  message: string;
};

export type VerifyEmailRequest = {
  token: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
  token: string;
};

export type ValidateResetTokenRequest = {
  token: string;
};

export type ValidateResetTokenResponse = { message: string; valid: boolean };

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

export type ResetPasswordResponse = {
  message: string;
};

export type VerifyEmailResponse = {
  message: string;
};

export type ResendEmailVerificationRequest = {
  email: string;
};

export type ResendEmailVerificationResponse = {
  message: string;
  token: string;
};
