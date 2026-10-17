export interface Board {
  id: number;
  name: string;
  description: string | null;
}
export interface BoardFilter {
  archived?: boolean;
  search?: string;
}

export type CreateBoardRequest = Pick<Board, "name" | "description">;

export type UpdateBoardRequest = Pick<Board, "id" | "name" | "description">;
