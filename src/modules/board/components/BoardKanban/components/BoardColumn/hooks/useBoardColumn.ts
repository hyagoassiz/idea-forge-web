import { Idea } from "@/modules/idea/types";
import { useState } from "react";

interface UseBoardColumnReturn {
  ideaDetailsDialogState: Idea | null;
  handleCloseIdeaDetailsDialog(): void;
  handleOpenIdeaDetailsDialog(idea: Idea): void;
}

export function useBoardColumn(): UseBoardColumnReturn {
  const [ideaDetailsDialogState, setIdeaDetailsDialogState] =
    useState<Idea | null>(null);

  function handleOpenIdeaDetailsDialog(idea: Idea): void {
    setIdeaDetailsDialogState(idea);
  }

  function handleCloseIdeaDetailsDialog(): void {
    setIdeaDetailsDialogState(null);
  }

  return {
    ideaDetailsDialogState,
    handleCloseIdeaDetailsDialog,
    handleOpenIdeaDetailsDialog,
  };
}
