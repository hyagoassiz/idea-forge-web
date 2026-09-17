import { z } from "zod";

export const boardSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  description: z.string().trim().optional(),
});

export type BoardForm = z.infer<typeof boardSchema>;
