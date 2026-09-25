import { ApiErrorResponse } from "@/lib/api/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { CreateIdeaRequest, Idea } from "@/modules/idea/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseCreateIdeaMutationOptions = UseMutationOptions<
  Idea,
  ApiErrorResponse,
  CreateIdeaRequest
>;

export function useCreateIdeaMutation(options?: UseCreateIdeaMutationOptions) {
  return useMutation({
    mutationFn: ideaService.createIdea,
    ...options,
  });
}
