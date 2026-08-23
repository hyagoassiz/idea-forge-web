import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().trim().min(1, "Nome é obrigatório"),

    email: z
      .string()
      .trim()
      .min(1, "E-mail é obrigatório")
      .email("Formato de e-mail inválido")
      .toLowerCase(),

    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .refine((value) => value.length >= 8, {
        message: "A senha deve ter pelo menos 8 caracteres",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra minúscula",
      })
      .refine((value) => /\d/.test(value), {
        message: "A senha deve conter pelo menos um número",
      }),

    confirmPassword: z.string().min(1, "Confirmar senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterUserForm = z.infer<typeof registerUserSchema>;
