import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  BoardForm,
  boardSchema,
} from "@/modules/board/components/BoardForm/schema/boardSchema";
import {
  useCreateBoardMutation,
  useUpdateBoardMutation,
} from "@/modules/board/services/hooks";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
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

  const createBoardMutation = useCreateBoardMutation({
    onSuccess: () => {
      router.push(routes.protected.boards.list);
    },
    onError: (error) => {
      applyFieldErrors(boardForm, error);
    },
  });

  const updateBoardMutation = useUpdateBoardMutation({
    onSuccess: () => {
      router.push(routes.protected.boards.list);
    },
    onError: (error) => {
      applyFieldErrors(boardForm, error);
    },
  });

  const handleSave = boardForm.handleSubmit((data) => {
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

  return {
    isLoading: createBoardMutation.isPending || updateBoardMutation.isPending,
    boardForm,
    handleSave,
  };
}
