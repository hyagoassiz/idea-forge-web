import { ApiErrorResponse } from "@/lib/api/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { CreateIdeaRequest, Idea } from "@/modules/idea/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type CreateIdeaMutationRequest = {
  boardId: number;
  payload: CreateIdeaRequest;
};

type UseCreateIdeaMutationOptions = UseMutationOptions<
  Idea,
  ApiErrorResponse,
  CreateIdeaMutationRequest
>;

export function useCreateIdeaMutation(options?: UseCreateIdeaMutationOptions) {
  return useMutation({
    mutationFn: ({ boardId, payload }) =>
      ideaService.createIdea(boardId, payload),
    ...options,
  });
}
