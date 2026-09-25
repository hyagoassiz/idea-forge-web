export interface Idea {
  id: string;
  name: string;
  description: string;
}

export type CreateIdeaRequest = Pick<Idea, "name" | "description">;

export type UpdateIdeaRequest = Pick<Idea, "id" | "name" | "description">;
