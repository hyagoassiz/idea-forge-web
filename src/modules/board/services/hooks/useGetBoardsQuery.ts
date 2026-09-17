import { useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { boardService } from "@/modules/board/services/boardService";
import { Board } from "@/modules/board/types";

export const GET_BOARDS_KEY = "GET_BOARDS_KEY";

type UseGetBoardsQueryOptions = QueryOptions<Board[], ApiErrorResponse>;

export function useGetBoardsQuery(options?: UseGetBoardsQueryOptions) {
  return useQuery({
    queryKey: [GET_BOARDS_KEY],
    queryFn: () => boardService.getBoards(),
    ...options,
  });
}
