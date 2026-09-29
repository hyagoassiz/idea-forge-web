import { ApiErrorResponse } from "@/lib/api/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea, UpdateIdeaRequest } from "@/modules/idea/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UpdateIdeaMutationRequest = {
  boardId: number;
  payload: UpdateIdeaRequest;
};

type UseUpdateIdeaMutationOptions = UseMutationOptions<
  Idea,
  ApiErrorResponse,
  UpdateIdeaMutationRequest
>;

export function useUpdateIdeaMutation(options?: UseUpdateIdeaMutationOptions) {
  return useMutation({
    mutationFn: ({ boardId, payload }) =>
      ideaService.updateIdea(boardId, payload),
    ...options,
  });
}
