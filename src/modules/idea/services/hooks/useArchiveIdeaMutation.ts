import { ApiErrorResponse } from "@/lib/api/types";
import { ideaService } from "@/modules/idea/services/ideaService";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseArchiveIdeaMutationOptions = UseMutationOptions<
  Awaited<ReturnType<typeof ideaService.archiveIdea>>,
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
