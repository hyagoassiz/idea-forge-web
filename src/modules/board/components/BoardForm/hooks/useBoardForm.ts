import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  BoardForm,
  boardSchema,
} from "@/modules/board/components/BoardForm/schema/boardSchema";
import {
  useCreateBoardMutation,
  useGetBoardQuery,
  useUpdateBoardMutation,
} from "@/modules/board/services/hooks";
import { Board } from "@/modules/board/types";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseBoardFormReturn {
  isLoading: boolean;
  boardForm: UseFormReturn<BoardForm>;
  handleSave(): void;
}

export function useBoardForm(): UseBoardFormReturn {
  const router = useRouter();

  const params = useParams<{ id: string }>();

  const boardId = params.id ? Number(params.id) : undefined;

  const boardForm = useForm<BoardForm>({
    resolver: zodResolver(boardSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const { data: board, isError } = useGetBoardQuery(boardId as number, {
    enabled: Boolean(boardId),
  });

  const createBoardMutation = useCreateBoardMutation({
    onSuccess: () => {
      goToBoards();
    },
    onError: (error) => {
      applyFieldErrors(boardForm, error);
    },
  });

  const updateBoardMutation = useUpdateBoardMutation({
    onSuccess: () => {
      goToBoards();
    },
    onError: (error) => {
      applyFieldErrors(boardForm, error);
    },
  });

  const handleSave = boardForm.handleSubmit((data): void => {
    if (boardId) {
      updateBoardMutation.mutate({
        id: boardId,
        name: data.name,
        description: data.description ?? "",
      });

      return;
    }

    createBoardMutation.mutate({
      name: data.name,
      description: data.description ?? "",
    });
  });

  const fillForm = useCallback(
    (board: Board): void => {
      boardForm.reset({
        name: board.name,
        description: board.description ?? "",
      });
    },
    [boardForm],
  );

  const goToBoards = useCallback((): void => {
    router.push(routes.protected.boards.list);
  }, [router]);

  useEffect(() => {
    if (!board) return;

    fillForm(board);
  }, [board, fillForm]);

  useEffect(() => {
    if (!isError) return;

    goToBoards();
  }, [isError, goToBoards]);

  return {
    isLoading: createBoardMutation.isPending || updateBoardMutation.isPending,
    boardForm,
    handleSave,
  };
}
