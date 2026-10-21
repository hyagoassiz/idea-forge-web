import { useNotification } from "@/components/Notification/NotificationSnackbar/hooks/useNotificationSnackbar";
import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  UpdateIdeaSchema,
  updateIdeaSchema,
} from "@/modules/idea/components/IdeaDetailsDialog/schema/updateIdeaSchema";
import {
  GET_IDEAS_KEY,
  useUpdateIdeaMutation,
} from "@/modules/idea/services/hooks";
import { Idea } from "@/modules/idea/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseIdeaDetailsDialogProps {
  idea: Idea;
}

interface UseIdeaDetailsDialogReturn {
  isLoading: boolean;
  ideaForm: UseFormReturn<UpdateIdeaSchema>;
  handleSave(): void;
}

export function useIdeaDetailsDialog({
  idea,
}: UseIdeaDetailsDialogProps): UseIdeaDetailsDialogReturn {
  const queryClient = useQueryClient();

  const notification = useNotification();

  const ideaForm = useForm<UpdateIdeaSchema>({
    resolver: zodResolver(updateIdeaSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: idea,
  });

  const createIdeaMutation = useUpdateIdeaMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_IDEAS_KEY] });
    },
    onError: (error) => {
      applyFieldErrors(ideaForm, error);
    },
  });

  const handleSave = ideaForm.handleSubmit((data): void => {
    createIdeaMutation.mutate({
      id: data.id,
      name: data.name,
      description: data.description ?? "",
    });
  });

  return {
    isLoading: createIdeaMutation.isPending,
    ideaForm,
    handleSave,
  };
}
