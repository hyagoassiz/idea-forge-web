export interface Idea {
  id: number;
  name: string;
  description: string;
  status: IdeaStatus;
  isEvaluated: boolean;
  evaluationScore: number | null;
}

export enum IdeaStatus {
  DRAFT = "DRAFT",
  VALIDATION = "VALIDATION",
  DEVELOPMENT = "DEVELOPMENT",
  LAUNCHED = "LAUNCHED",
}

export type CreateIdeaRequest = Pick<Idea, "name" | "description"> & {
  boardId: number;
};

export type UpdateIdeaRequest = Pick<Idea, "id" | "name" | "description">;

export type UpdateIdeaStatusRequest = Pick<Idea, "status" | "id">;
