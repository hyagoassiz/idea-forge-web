import { useQuery } from "@tanstack/react-query";

import { ApiErrorResponse } from "@/lib/api/types";
import { QueryOptions } from "@/lib/react-query/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea } from "@/modules/idea/types";

export const GET_IDEAS_KEY = "GET_IDEAS_KEY";

type UseGetIdeasQueryOptions = QueryOptions<Idea[], ApiErrorResponse>;

export function useGetIdeasQuery(options?: UseGetIdeasQueryOptions) {
  return useQuery({
    queryKey: [GET_IDEAS_KEY],
    queryFn: () => ideaService.getIdeas(),
    retry: false,
    ...options,
  });
}
