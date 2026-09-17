import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  BoardForm,
  boardSchema,
} from "@/modules/board/components/BoardForm/schema/boardSchema";
import { useCreateBoardMutation } from "@/modules/board/service/hooks";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseBoardFormReturn {
  isLoading: boolean;
  boardForm: UseFormReturn<BoardForm>;
  handleSave(): void;
}

export function useBoardForm(): UseBoardFormReturn {
  const router = useRouter();

  const boardForm = useForm<BoardForm>({
    resolver: zodResolver(boardSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useCreateBoardMutation({
    onSuccess: () => {
      router.push(routes.protected.boards.list);
    },
    onError: (error) => {
      applyFieldErrors(boardForm, error);
    },
  });

  const handleSave = boardForm.handleSubmit((data) => {
    mutate({
      name: data.name,
      description: data.description ?? "",
    });
  });

  return { isLoading: isPending, boardForm, handleSave };
}
