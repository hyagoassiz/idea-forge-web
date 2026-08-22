import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z.string().min(1, "Senha é obrigatória"),
  rememberEmail: z.boolean().optional(),
});

export type LoginUserForm = z.infer<typeof loginUserSchema>;
