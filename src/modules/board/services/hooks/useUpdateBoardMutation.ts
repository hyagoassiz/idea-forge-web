import { ApiErrorResponse } from "@/lib/api/types";
import { boardService } from "@/modules/board/services/boardService";
import { Board, UpdateBoardRequest } from "@/modules/board/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type UseUpdateBoardMutationOptions = UseMutationOptions<
  Board,
  ApiErrorResponse,
  UpdateBoardRequest
>;

export function useUpdateBoardMutation(
  options?: UseUpdateBoardMutationOptions,
) {
  return useMutation({
    mutationFn: boardService.updateBoard,
    ...options,
  });
}
