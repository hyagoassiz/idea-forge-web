export interface User {
  name: string;
  email: string;
  password: string;
}

export type CreateUserRequest = Pick<User, "name" | "email" | "password">;

export type UserResponse = Pick<User, "name" | "email">;

export type UserLoginRequest = Pick<User, "email" | "password">;

export type UserLoginResponse = Pick<User, "email"> & {
  message: string;
};
