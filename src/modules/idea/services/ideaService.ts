import { api } from "@/lib/api/api";
import {
  CreateIdeaRequest,
  Idea,
  UpdateIdeaRequest,
} from "@/modules/idea/types";

export const ideaService = {
  createIdea: async (
    boardId: number,
    payload: CreateIdeaRequest,
  ): Promise<Idea> => {
    return api(`/boards/${boardId}/ideas`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getIdea: async (boardId: number, ideaId: number): Promise<Idea> => {
    return api(`boards/${boardId}/ideas/${ideaId}`);
  },

  getIdeas: async (boardId: number): Promise<Idea[]> => {
    return api(`boards/${boardId}/ideas`);
  },

  updateIdea: async (
    boardId: number,
    payload: UpdateIdeaRequest,
  ): Promise<Idea> => {
    const { id } = payload;
    return api(`boards/${boardId}/ideas/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
};
