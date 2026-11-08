import { Board } from "@/modules/board/types";
import { ReactNode } from "react";

export interface BoardTableRow extends Board {
  option: ReactNode;
}
