export interface User {
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
}

export type CreateUserRequest = Pick<User, "name" | "email" | "password">;

export type CreateUserUserResponse = Pick<
  User,
  "name" | "email" | "emailVerified"
>;

export type UserLoginRequest = Pick<User, "email" | "password">;

export type UserLoginResponse = Pick<User, "email" | "emailVerified"> & {
  message: string;
};

export type VerifyEmailRequest = {
  token: string;
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
