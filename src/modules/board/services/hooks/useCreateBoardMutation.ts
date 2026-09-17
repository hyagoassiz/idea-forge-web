import { ApiErrorResponse } from "@/lib/api/types";
import { boardService } from "@/modules/board/services/boardService";
import { Board, CreateBoardRequest } from "@/modules/board/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type ForgotPasswordMutationOptions = UseMutationOptions<
  Board,
  ApiErrorResponse,
  CreateBoardRequest
>;

export function useCreateBoardMutation(
  options?: ForgotPasswordMutationOptions,
) {
  return useMutation({
    mutationFn: boardService.createBoard,
    ...options,
  });
}
