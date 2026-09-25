import { useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea } from "@/modules/idea/types";

export const GET_IDEA_KEY = "GET_IDEA_KEY";

type UseGetIdeaQueryOptions = QueryOptions<Idea, ApiErrorResponse>;

export function useGetIdeaQuery(id: number, options?: UseGetIdeaQueryOptions) {
  return useQuery({
    queryKey: [GET_IDEA_KEY],
    queryFn: () => ideaService.getIdea(id),
    retry: false,
    ...options,
  });
}
