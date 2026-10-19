import { useNotification } from "@/components/Notification/NotificationSnackbar/hooks/useNotificationSnackbar";
import {
  GET_IDEAS_KEY,
  useGetIdeasQuery,
  useUpdateIdeaStatusMutation,
} from "@/modules/idea/services/hooks";
import { Idea, UpdateIdeaStatusRequest } from "@/modules/idea/types";
import { useQueryClient } from "@tanstack/react-query";

interface UseBoardKanbanProps {
  boardId?: number;
}

interface UseBoardKanbanReturn {
  ideas?: Idea[];
  isLoading: boolean;
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

  const { data: ideas, isFetching } = useGetIdeasQuery(boardId as number, {
    enabled: true,
  });

  function refreshIdeas(): void {
    queryClient.invalidateQueries({ queryKey: [GET_IDEAS_KEY] });
  }

  return { ideas, isLoading: isFetching, mutate, refreshIdeas };
}
