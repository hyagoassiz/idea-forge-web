import { useNotification } from "@/components/Notification/NotificationSnackbar/hooks/useNotificationSnackbar";
import { useSearch } from "@/hooks";
import {
  GET_BOARDS_KEY,
  useArchiveBoardMutation,
  useGetBoardsQuery,
} from "@/modules/board/services/hooks";
import { Board } from "@/modules/board/types";
import { SearchProps } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

interface UseBoardsReturn {
  boards: Board[];
  isArchiving: boolean;
  isArchivedBoardsDialogOpen: boolean;
  isLoading: boolean;
  search: SearchProps;
  archiveBoard(id: number): void;
  refreshBoards(): void;
  toggleArchivedBoardsDialog(): void;
}

export function useBoards(): UseBoardsReturn {
  const queryClient = useQueryClient();

  const notification = useNotification();

  const { search, searchValue } = useSearch({});

  const [isArchivedBoardsDialogOpen, setIsArchivedBoardsDialogOpen] =
    useState<boolean>(false);

  const { data, isFetching } = useGetBoardsQuery({ archived: false });

  const archiveBoardMutation = useArchiveBoardMutation({
    onSuccess: () => {
      notification.notify("Quadro arquivado com sucesso!", "success");

      refreshBoards();
    },
    onError: (error) => {
      notification.notify(
        error.message || "Não foi possível arquivar o quadro.",
        "error",
      );
    },
  });

  const filterBoards = useCallback(
    (boards: Board[], value?: string): Board[] => {
      const normalizedValue = value?.trim().toLowerCase();

      if (!normalizedValue) return boards;

      return boards.filter((board) => {
        const name = board.name.toLowerCase();
        const description = board.description?.toLowerCase();

        return (
          name.includes(normalizedValue) ||
          description?.includes(normalizedValue)
        );
      });
    },
    [],
  );

  const boards: Board[] = useMemo(() => {
    return filterBoards(data ?? [], searchValue);
  }, [data, searchValue]);

  function archiveBoard(id: number): void {
    archiveBoardMutation.mutate(id);
  }

  function refreshBoards(): void {
    queryClient.invalidateQueries({ queryKey: [GET_BOARDS_KEY] });
  }

  function toggleArchivedBoardsDialog(): void {
    setIsArchivedBoardsDialogOpen((prevState) => !prevState);
  }

  return {
    boards,
    isArchiving: archiveBoardMutation.isPending,
    isArchivedBoardsDialogOpen,
    isLoading: isFetching,
    search,
    archiveBoard,
    refreshBoards,
    toggleArchivedBoardsDialog,
  };
}
