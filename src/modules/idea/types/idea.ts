export interface Idea {
  id: number;
  name: string;
  description: string;
  status: IdeaStatus;
}

export enum IdeaStatus {
  DRAFT = "DRAFT",
}

export type CreateIdeaRequest = Pick<Idea, "name" | "description">;

export type UpdateIdeaRequest = Pick<Idea, "id" | "name" | "description">;
