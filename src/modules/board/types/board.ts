export interface Board {
  id: number;
  name: string;
  description: string | null;
}

export type CreateBoardRequest = Pick<Board, "name" | "description">;

export type EditBoardRequest = Pick<Board, "id" | "name" | "description">;
