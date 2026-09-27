import { z } from "zod";

export const ideaSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  description: z.string().trim().optional(),
});

export type IdeaForm = z.infer<typeof ideaSchema>;
