import { api } from "@/lib/api/api";
import {
  CreateIdeaRequest,
  Idea,
  IdeaFilter,
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

  archiveIdea: async (ideaId: number): Promise<Idea> => {
    return api(`/ideas/${ideaId}/archive`, {
      method: "PATCH",
    });
  },

  unarchiveIdea: async (ideaId: number): Promise<Idea> => {
    return api(`/ideas/${ideaId}/unarchive`, {
      method: "PATCH",
    });
  },

  getIdea: async (boardId: number, ideaId: number): Promise<Idea> => {
    return api(`/boards/${boardId}/ideas/${ideaId}`);
  },

  getIdeas: async (boardId: number, filter?: IdeaFilter): Promise<Idea[]> => {
    const params = new URLSearchParams();

    if (filter?.archived !== undefined) {
      params.set("archived", String(filter.archived));
    }

    if (filter?.search?.trim()) {
      params.set("search", filter.search.trim());
    }

    const query = params.toString();
    const path = `/boards/${boardId}/ideas${query ? `?${query}` : ""}`;

    return api(path);
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
