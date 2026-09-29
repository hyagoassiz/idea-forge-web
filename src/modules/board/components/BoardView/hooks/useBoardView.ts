import { useGetBoardQuery } from "@/modules/board/services/hooks";
import { routes } from "@/routes";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface UseBoardViewReturn {
  boardId?: number;
  isCreateIdeaDialogOpen: boolean;
  isLoading: boolean;
  name?: string;
  toggleCreateIdeiaDialog(): void;
}

export function useBoardView(): UseBoardViewReturn {
  const router = useRouter();

  const params = useParams<{ id: string }>();

  const boardId = params.id ? Number(params.id) : undefined;

  const [isCreateIdeaDialogOpen, setIsCreateIdeaDialogOpen] =
    useState<boolean>(false);

  const { isError, isFetching, data } = useGetBoardQuery(boardId as number, {
    enabled: Boolean(boardId),
  });

  const goToBoards = useCallback((): void => {
    router.push(routes.protected.boards.list);
  }, [router]);

  function toggleCreateIdeiaDialog(): void {
    setIsCreateIdeaDialogOpen((prevState) => !prevState);
  }

  useEffect(() => {
    if (!isError) return;

    goToBoards();
  }, [isError, goToBoards]);

  return {
    boardId,
    isCreateIdeaDialogOpen,
    isLoading: isFetching,
    name: data?.name,
    toggleCreateIdeiaDialog,
  };
}
