export interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export type UserResponseDTO = Pick<CreateUserRequestDTO, "name" | "email">;

export type UserLoginRequestDTO = Pick<
  CreateUserRequestDTO,
  "email" | "password"
>;

export type UserLoginResponseDTO = Pick<CreateUserRequestDTO, "email"> & {
  message: string;
};
