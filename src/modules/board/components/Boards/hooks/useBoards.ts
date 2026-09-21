import { useSearch } from "@/hooks";
import { useGetBoardsQuery } from "@/modules/board/services/hooks";
import { Board } from "@/modules/board/types";
import { SearchProps } from "@/types";
import { useCallback, useMemo } from "react";

interface UseBoardsReturn {
  boards: Board[];
  search: SearchProps;
}

export function useBoards(): UseBoardsReturn {
  const { search, searchValue } = useSearch({});

  const { data } = useGetBoardsQuery();

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

  return { boards, search };
}
