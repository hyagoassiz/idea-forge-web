import { useSearch } from "@/hooks";
import {
  GET_BOARDS_KEY,
  useGetBoardsQuery,
} from "@/modules/board/services/hooks";
import { Board } from "@/modules/board/types";
import { SearchProps } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

interface UseBoardsReturn {
  boards: Board[];
  isLoading: boolean;
  search: SearchProps;
  refreshBoards(): void;
}

export function useBoards(): UseBoardsReturn {
  const queryClient = useQueryClient();

  const { search, searchValue } = useSearch({});

  const { data, isFetching } = useGetBoardsQuery();

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

  return { boards, isLoading: isFetching, search, refreshBoards };
}
