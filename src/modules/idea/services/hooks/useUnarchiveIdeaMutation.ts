import { ApiErrorResponse } from "@/lib/api/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea } from "@/modules/idea/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseUnarchiveIdeaMutationOptions = UseMutationOptions<
  Idea,
  ApiErrorResponse,
  number
>;

export function useUnarchiveIdeaMutation(
  options?: UseUnarchiveIdeaMutationOptions,
) {
  return useMutation({
    mutationFn: ideaService.unarchiveIdea,
    ...options,
  });
}
