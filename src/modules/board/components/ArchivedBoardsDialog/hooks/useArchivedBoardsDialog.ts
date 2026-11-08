import { DataGridColumn } from "@/components/DataGrid/types/dataGrid";
import { useNotification } from "@/components/Notification/NotificationSnackbar/hooks/useNotificationSnackbar";
import { BoardTableRow } from "@/modules/board/components/ArchivedBoardsDialog/types";
import {
  GET_BOARDS_KEY,
  useGetBoardsQuery,
  useUnarchiveBoardMutation,
} from "@/modules/board/services/hooks";
import { Board } from "@/modules/board/types";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseArchivedBoardsDialogReturn {
  boards: Board[];
  columns: DataGridColumn<BoardTableRow>[];
  unarchiveBoard(id: number): void;
}

export function useArchivedBoardsDialog(): UseArchivedBoardsDialogReturn {
  const { data } = useGetBoardsQuery({ archived: true });

  const notification = useNotification();

  const queryClient = useQueryClient();

  const unarchiveBoardMutation = useUnarchiveBoardMutation({
    onSuccess: () => {
      notification.notify("Quadro desarquivado com sucesso!", "success");

      refreshBoards();
    },
    onError: (error) => {
      notification.notify(
        error.message || "Não foi possível desarquivar o quadro.",
        "error",
      );
    },
  });

  const columns: DataGridColumn<BoardTableRow>[] = [
    { key: "name", label: "Nome", style: { width: "70%" } },
    {
      key: "option",
      label: "Desarquivar",
      align: "center",
      style: { width: "30%" },
    },
  ];

  const boards: Board[] = useMemo(() => {
    return data ?? [];
  }, [data]);

  function refreshBoards(): void {
    queryClient.invalidateQueries({ queryKey: [GET_BOARDS_KEY] });
  }

  function unarchiveBoard(id: number): void {
    unarchiveBoardMutation.mutate(id);
  }

  return {
    boards,
    columns,
    unarchiveBoard,
  };
}
