import { api } from "@/lib/api/api";
import {
  Board,
  CreateBoardRequest,
  UpdateBoardRequest,
} from "@/modules/board/types";

export const boardService = {
  createBoard: async (payload: CreateBoardRequest): Promise<Board> => {
    return api("/boards", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getBoards: async (): Promise<Board[]> => {
    return api("/boards");
  },

  updateBoard: async (payload: UpdateBoardRequest): Promise<Board> => {
    const { id } = payload;
    return api(`/boards/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
};
