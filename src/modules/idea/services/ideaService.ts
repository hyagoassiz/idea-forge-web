import { api } from "@/lib/api/api";
import {
  CreateIdeaRequest,
  Idea,
  UpdateIdeaRequest,
} from "@/modules/idea/types";

export const ideaService = {
  createIdea: async (payload: CreateIdeaRequest): Promise<Idea> => {
    return api("/ideas", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getIdea: async (id: number): Promise<Idea> => {
    return api(`/ideas/${id}`);
  },

  getIdeas: async (): Promise<Idea[]> => {
    return api("/ideas");
  },

  updateIdea: async (payload: UpdateIdeaRequest): Promise<Idea> => {
    const { id } = payload;
    return api(`/ideas/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
};
