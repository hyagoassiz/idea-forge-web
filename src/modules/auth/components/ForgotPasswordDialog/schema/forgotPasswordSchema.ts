import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido")
    .toLowerCase(),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
