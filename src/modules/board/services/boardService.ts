import { api } from "@/lib/api/api";
import {
  Board,
  CreateBoardRequest,
  UpdateBoardRequest,
  BoardRequest,
} from "@/modules/board/types";

export const boardService = {
  createBoard: async (payload: CreateBoardRequest): Promise<Board> => {
    return api("/boards", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  archiveBoard: async (id: number): Promise<Board> => {
    return api(`/boards/${id}/archive`, {
      method: "PATCH",
    });
  },

  getBoard: async (id: number): Promise<Board> => {
    return api(`/boards/${id}`);
  },

  getBoards: async (payload: BoardRequest): Promise<Board[]> => {
    const params = new URLSearchParams();

    if (payload.archived !== undefined) {
      params.set("archived", String(payload.archived));
    }

    if (payload.search?.trim()) {
      params.set("search", payload.search.trim());
    }

    return api(`/boards?${params.toString()}`);
  },

  updateBoard: async (payload: UpdateBoardRequest): Promise<Board> => {
    const { id } = payload;
    return api(`/boards/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
};
