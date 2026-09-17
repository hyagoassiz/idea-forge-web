import { api } from "@/lib/api/api";
import { Board, CreateBoardRequest } from "@/modules/board/types";

export const boardService = {
  createBoard: async (payload: CreateBoardRequest): Promise<Board> => {
    return api("/boards", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
