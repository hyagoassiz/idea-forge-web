import { useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea } from "@/modules/idea/types";

export const GET_IDEA_KEY = "GET_IDEA_KEY";

type UseGetIdeaQueryOptions = QueryOptions<Idea, ApiErrorResponse>;

export function useGetIdeaQuery(
  boardId: number,
  ideaId: number,
  options?: UseGetIdeaQueryOptions,
) {
  return useQuery({
    queryKey: [GET_IDEA_KEY, boardId, ideaId],
    queryFn: () => ideaService.getIdea(boardId, ideaId),
    retry: false,
    ...options,
  });
}
