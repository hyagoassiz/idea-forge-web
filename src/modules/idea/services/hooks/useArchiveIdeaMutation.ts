import { ApiErrorResponse } from "@/lib/api/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { Idea } from "@/modules/idea/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseArchiveIdeaMutationOptions = UseMutationOptions<
  Idea,
  ApiErrorResponse,
  number
>;

export function useArchiveIdeaMutation(
  options?: UseArchiveIdeaMutationOptions,
) {
  return useMutation({
    mutationFn: ideaService.archiveIdea,
    ...options,
  });
}
