import { Idea } from "@/modules/idea/types";
import { ReactNode } from "react";

export interface IdeaTableRow extends Idea {
  previousStatusLabel: string;
  option: ReactNode;
}
