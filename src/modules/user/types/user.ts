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
