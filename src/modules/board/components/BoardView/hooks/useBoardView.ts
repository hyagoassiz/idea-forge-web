import { useGetBoardQuery } from "@/modules/board/services/hooks";
import { Board } from "@/modules/board/types";
import { routes } from "@/routes";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface UseBoardViewReturn {
  board: Board | undefined;
  isCreateIdeaDialogOpen: boolean;
  isDescriptionDialogOpen: boolean;
  isLoading: boolean;
  toggleCreateIdeiaDialog(): void;
  toggleDescriptionDialog(): void;
}

export function useBoardView(): UseBoardViewReturn {
  const router = useRouter();

  const params = useParams<{ id: string }>();

  const boardId = params.id ? Number(params.id) : undefined;

  const [isCreateIdeaDialogOpen, setIsCreateIdeaDialogOpen] =
    useState<boolean>(false);

  const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] =
    useState<boolean>(false);

  const {
    isError,
    isFetching,
    data: board,
  } = useGetBoardQuery(boardId as number, {
    enabled: Boolean(boardId),
  });

  const goToBoards = useCallback((): void => {
    router.push(routes.protected.boards.list);
  }, [router]);

  function toggleCreateIdeiaDialog(): void {
    setIsCreateIdeaDialogOpen((prevState) => !prevState);
  }

  function toggleDescriptionDialog(): void {
    setIsDescriptionDialogOpen((prevState) => !prevState);
  }

  useEffect(() => {
    if (!isError) return;

    goToBoards();
  }, [isError, goToBoards]);

  return {
    board,
    isCreateIdeaDialogOpen,
    isDescriptionDialogOpen,
    isLoading: isFetching,
    toggleCreateIdeiaDialog,
    toggleDescriptionDialog,
  };
}
