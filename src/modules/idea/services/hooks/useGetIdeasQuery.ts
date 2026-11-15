import { useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea, IdeaFilter } from "@/modules/idea/types";

export const GET_IDEAS_KEY = "GET_IDEAS_KEY";

type UseGetIdeasQueryOptions = QueryOptions<Idea[], ApiErrorResponse>;

export function useGetIdeasQuery(
  boardId: number,
  filter?: IdeaFilter,
  options?: UseGetIdeasQueryOptions,
) {
  return useQuery({
    queryKey: [GET_IDEAS_KEY, boardId, filter],
    queryFn: () => ideaService.getIdeas(boardId, filter),
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
}
