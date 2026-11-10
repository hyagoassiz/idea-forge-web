import { useNotification } from "@/components/Notification/NotificationSnackbar/hooks/useNotificationSnackbar";
import {
  GET_IDEAS_KEY,
  useArchiveIdeaMutation,
  useGetIdeasQuery,
  useUpdateIdeaStatusMutation,
} from "@/modules/idea/services/hooks";
import { Idea, UpdateIdeaStatusRequest } from "@/modules/idea/types";
import { useQueryClient } from "@tanstack/react-query";

interface UseBoardKanbanProps {
  boardId: number;
}

interface UseBoardKanbanReturn {
  ideas: Idea[] | undefined;
  isLoading: boolean;
  isArchiving: boolean;
  archiveIdea(ideaId: number): void;
  refreshIdeas(): void;
  mutate(payload: UpdateIdeaStatusRequest): void;
}

export function useBoardKanban({
  boardId,
}: UseBoardKanbanProps): UseBoardKanbanReturn {
  const queryClient = useQueryClient();

  const notification = useNotification();

  const { mutate } = useUpdateIdeaStatusMutation({
    onSuccess: () => {
      notification.notify("Ideia movida com sucesso!", "success");

      refreshIdeas();
    },
  });

  const archiveIdeaMutation = useArchiveIdeaMutation({
    onSuccess: () => {
      notification.notify("Ideia arquivada com sucesso!", "success");
      refreshIdeas();
    },
    onError: (error) => {
      notification.notify(
        error.message || "Não foi possível arquivar a ideia.",
        "error",
      );
    },
  });

  const { data: ideas, isFetching } = useGetIdeasQuery(boardId as number, {
    enabled: true,
  });

  function archiveIdea(ideaId: number): void {
    archiveIdeaMutation.mutate(ideaId);
  }

  function refreshIdeas(): void {
    queryClient.invalidateQueries({ queryKey: [GET_IDEAS_KEY] });
  }

  return {
    ideas,
    isLoading: isFetching,
    isArchiving: archiveIdeaMutation.isPending,
    archiveIdea,
    refreshIdeas,
    mutate,
  };
}
