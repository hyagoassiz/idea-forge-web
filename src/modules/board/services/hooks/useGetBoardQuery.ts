import { useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { boardService } from "@/modules/board/services/boardService";
import { Board } from "@/modules/board/types";

export const GET_BOARD_KEY = "GET_BOARD_KEY";

type UseGetBoardQueryOptions = QueryOptions<Board, ApiErrorResponse>;

export function useGetBoardQuery(
  id: number,
  options?: UseGetBoardQueryOptions,
) {
  return useQuery({
    queryKey: [GET_BOARD_KEY],
    queryFn: () => boardService.getBoard(id),
    retry: false,
    ...options,
  });
}
