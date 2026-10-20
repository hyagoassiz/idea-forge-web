import { ApiErrorResponse } from "@/lib/api/types";
import { boardService } from "@/modules/board/services/boardService";
import { Board } from "@/modules/board/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseArchiveBoardMutationOptions = UseMutationOptions<
  Board,
  ApiErrorResponse,
  number
>;

export function useArchiveBoardMutation(
  options?: UseArchiveBoardMutationOptions,
) {
  return useMutation({
    mutationFn: boardService.archiveBoard,
    ...options,
  });
}
