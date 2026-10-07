import { useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea } from "@/modules/idea/types";

export const GET_IDEAS_KEY = "GET_IDEAS_KEY";

type UseGetIdeasQueryOptions = QueryOptions<Idea[], ApiErrorResponse>;

export function useGetIdeasQuery(
  boardId: number,
  options?: UseGetIdeasQueryOptions,
) {
  return useQuery({
    queryKey: [GET_IDEAS_KEY, boardId],
    queryFn: () => ideaService.getIdeas(boardId),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
}
