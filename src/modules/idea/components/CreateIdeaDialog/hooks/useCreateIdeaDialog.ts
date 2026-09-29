import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import { BoardForm } from "@/modules/board/components/BoardForm/schema/boardSchema";
import { ideaSchema } from "@/modules/idea/components/CreateIdeaDialog/schema/ideaSchema";
import { useCreateIdeaMutation } from "@/modules/idea/services/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseCreateIdeaDialogProps {
  boardId: number;
  onClose(): void;
}

interface UseCreateIdeaDialogReturn {
  isLoading: boolean;
  ideaForm: UseFormReturn<BoardForm>;
  handleSave(): void;
}

export function useCreateIdeaDialog({
  boardId,
  onClose,
}: UseCreateIdeaDialogProps): UseCreateIdeaDialogReturn {
  const ideaForm = useForm<BoardForm>({
    resolver: zodResolver(ideaSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const createIdeaMutation = useCreateIdeaMutation({
    onSuccess: () => {
      onClose();
    },
    onError: (error) => {
      applyFieldErrors(ideaForm, error);
    },
  });

  const handleSave = ideaForm.handleSubmit((data): void => {
    createIdeaMutation.mutate({
      boardId: boardId,
      payload: {
        name: data.name,
        description: data.description ?? "",
      },
    });
  });

  return {
    isLoading: createIdeaMutation.isPending,
    ideaForm,
    handleSave,
  };
}
