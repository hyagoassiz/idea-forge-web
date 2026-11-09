import { ApiErrorResponse } from "@/lib/api/types";
import { boardService } from "@/modules/board/services/boardService";
import { Board } from "@/modules/board/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseUnarchiveBoardMutationOptions = UseMutationOptions<
  Board,
  ApiErrorResponse,
  number
>;

export function useUnarchiveBoardMutation(
  options?: UseUnarchiveBoardMutationOptions,
) {
  return useMutation({
    mutationFn: boardService.unarchiveBoard,
    ...options,
  });
}
