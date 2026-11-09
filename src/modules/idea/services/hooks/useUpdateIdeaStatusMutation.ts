import { ApiErrorResponse } from "@/lib/api/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea, UpdateIdeaStatusRequest } from "@/modules/idea/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseUpdateIdeaStatusMutationOptions = UseMutationOptions<
  Idea,
  ApiErrorResponse,
  UpdateIdeaStatusRequest
>;

export function useUpdateIdeaStatusMutation(
  options?: UseUpdateIdeaStatusMutationOptions,
) {
  return useMutation({
    mutationFn: (payload) => ideaService.updateIdeaStatus(payload),
    ...options,
  });
}
