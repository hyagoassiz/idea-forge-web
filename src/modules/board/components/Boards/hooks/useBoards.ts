import { useSearch } from "@/hooks";
import {
  GET_BOARDS_KEY,
  useArchiveBoardMutation,
  useGetBoardsQuery,
} from "@/modules/board/services/hooks";
import { Board } from "@/modules/board/types";
import { SearchProps } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useNotification } from "@/components/Notification/NotificationSnackbar/hooks/useNotificationSnackbar";

interface UseBoardsReturn {
  boards: Board[];
  isLoading: boolean;
  search: SearchProps;
  refreshBoards(): void;
  archiveBoard(id: number): void;
  isArchiving: boolean;
}

export function useBoards(): UseBoardsReturn {
  const queryClient = useQueryClient();
  const notification = useNotification();

  const { search, searchValue } = useSearch({});
  const { data, isFetching } = useGetBoardsQuery({ archived: false });

  const archiveBoardMutation = useArchiveBoardMutation({
    onSuccess: () => {
      notification.notify("Quadro arquivado com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: [GET_BOARDS_KEY] });
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
  }, [data, filterBoards, searchValue]);

  function refreshBoards(): void {
    queryClient.invalidateQueries({ queryKey: [GET_BOARDS_KEY] });
  }

  function archiveBoard(id: number): void {
    archiveBoardMutation.mutate(id);
  }

  return {
    boards,
    isLoading: isFetching,
    search,
    refreshBoards,
    archiveBoard,
    isArchiving: archiveBoardMutation.isPending,
  };
}
