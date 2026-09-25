import { ApiErrorResponse } from "@/lib/api/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea, UpdateIdeaRequest } from "@/modules/idea/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseUpdateIdeaMutationOptions = UseMutationOptions<
  Idea,
  ApiErrorResponse,
  UpdateIdeaRequest
>;

export function useUpdateIdeaMutation(options?: UseUpdateIdeaMutationOptions) {
  return useMutation({
    mutationFn: ideaService.updateIdea,
    ...options,
  });
}
