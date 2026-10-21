import { api } from "@/lib/api/api";
import {
  CreateIdeaRequest,
  Idea,
  UpdateIdeaRequest,
  UpdateIdeaStatusRequest,
} from "@/modules/idea/types";

export const ideaService = {
  createIdea: async (payload: CreateIdeaRequest): Promise<Idea> => {
    const { boardId, ...rest } = payload;
    return api(`/boards/${boardId}/ideas`, {
      method: "POST",
      body: JSON.stringify(rest),
    });
  },

  getIdea: async (boardId: number, ideaId: number): Promise<Idea> => {
    return api(`/boards/${boardId}/ideas/${ideaId}`);
  },

  getIdeas: async (boardId: number): Promise<Idea[]> => {
    return api(`/boards/${boardId}/ideas`);
  },

  updateIdea: async (payload: UpdateIdeaRequest): Promise<Idea> => {
    const { id, ...rest } = payload;
    return api(`/ideas/${id}`, {
      method: "PUT",
      body: JSON.stringify(rest),
    });
  },

  updateIdeaStatus: async (payload: UpdateIdeaStatusRequest): Promise<Idea> => {
    const { id, status } = payload;
    return api(`/ideas/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
