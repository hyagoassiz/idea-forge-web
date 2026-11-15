import { DataGridColumn } from "@/components/DataGrid/types/dataGrid";
import { useNotification } from "@/components/Notification/NotificationSnackbar/hooks/useNotificationSnackbar";
import { IdeaTableRow } from "@/modules/board/components/ArchivedIdeasDialog/types/ideaTableRow";
import {
  GET_IDEAS_KEY,
  useGetIdeasQuery,
  useUnarchiveIdeaMutation,
} from "@/modules/idea/services/hooks";
import { Idea } from "@/modules/idea/types";
import { useQueryClient } from "@tanstack/react-query";

interface UseArchivedIdeasDialogReturn {
  ideas: Idea[];
  columns: DataGridColumn<IdeaTableRow>[];
  unarchiveIdea(id: number): void;
}

interface UseArchivedIdeasDialogProps {
  boardId: number;
}

export function useArchivedIdeasDialog({
  boardId,
}: UseArchivedIdeasDialogProps): UseArchivedIdeasDialogReturn {
  const { data } = useGetIdeasQuery(boardId, { archived: true });
  const notification = useNotification();
  const queryClient = useQueryClient();

  const unarchiveIdeaMutation = useUnarchiveIdeaMutation({
    onSuccess: (_idea, ideaId) => {
      notification.notify("Ideia desarquivada com sucesso!", "success");

      queryClient.setQueryData<Idea[]>(
        [GET_IDEAS_KEY, boardId, { archived: true }],
        (cachedIdeas) => cachedIdeas?.filter((idea) => idea.id !== ideaId),
      );

      queryClient.invalidateQueries({
        queryKey: [GET_IDEAS_KEY, boardId],
      });
    },
    onError: (error) => {
      notification.notify(
        error.message || "Não foi possível desarquivar a ideia.",
        "error",
      );
    },
  });

  const columns: DataGridColumn<IdeaTableRow>[] = [
    { key: "name", label: "Nome", style: { width: "40%" } },
    {
      key: "previousStatusLabel",
      label: "Etapa anterior",
      style: { width: "35%" },
    },
    {
      key: "option",
      label: "Desarquivar",
      align: "center",
      style: { width: "25%" },
    },
  ];

  function unarchiveIdea(id: number): void {
    unarchiveIdeaMutation.mutate(id);
  }

  return {
    ideas: (data ?? []).filter((idea) => idea.archived),
    columns,
    unarchiveIdea,
  };
}
