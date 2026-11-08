import { z } from "zod";

export const updateIdeaSchema = z.object({
  id: z.number(),
  name: z.string().trim().min(1, "Nome é obrigatório"),
  description: z.string().trim().optional(),
});

export type UpdateIdeaSchema = z.infer<typeof updateIdeaSchema>;
