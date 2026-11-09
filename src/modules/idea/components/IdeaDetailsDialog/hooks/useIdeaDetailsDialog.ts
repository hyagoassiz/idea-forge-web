import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  UpdateIdeaSchema,
  updateIdeaSchema,
} from "@/modules/idea/components/IdeaDetailsDialog/schema/updateIdeaSchema";
import { useUpdateIdeaMutation } from "@/modules/idea/services/hooks";
import { Idea } from "@/modules/idea/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseIdeaDetailsDialogProps {
  idea: Idea;
}

interface UseIdeaDetailsDialogReturn {
  isLoading: boolean;
  updateIdeaForm: UseFormReturn<UpdateIdeaSchema>;
  handleSave(): void;
}

export function useIdeaDetailsDialog({
  idea,
}: UseIdeaDetailsDialogProps): UseIdeaDetailsDialogReturn {
  const updateIdeaForm = useForm<UpdateIdeaSchema>({
    resolver: zodResolver(updateIdeaSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: idea,
  });

  const createIdeaMutation = useUpdateIdeaMutation({
    onError: (error) => {
      applyFieldErrors(updateIdeaForm, error);
    },
  });

  const handleSave = updateIdeaForm.handleSubmit((data): void => {
    createIdeaMutation.mutate({
      id: data.id,
      name: data.name,
      description: data.description ?? "",
    });
  });

  return {
    isLoading: createIdeaMutation.isPending,
    updateIdeaForm,
    handleSave,
  };
}
