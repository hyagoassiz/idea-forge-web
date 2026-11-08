"use client";

import { DataGrid } from "@/components/DataGrid";
import { Dialog } from "@/components/Dialog";
import { useArchivedBoardsDialog } from "@/modules/board/components/ArchivedBoardsDialog/hooks/useArchivedBoardsDialog";
import { BoardTableRow } from "@/modules/board/components/ArchivedBoardsDialog/types";
import { mountData } from "@/modules/board/components/ArchivedBoardsDialog/utils/mountData";

interface ArchivedBoardsDialogProps {
  open: boolean;
  onClose(): void;
}

export function ArchivedBoardsDialog({
  open,
  onClose,
}: ArchivedBoardsDialogProps) {
  const { boards, columns, unarchiveBoard } = useArchivedBoardsDialog();

  return (
    <Dialog
      title={`Quadros arquivados (${boards.length ?? 0})`}
      open={open}
      onClose={onClose}
      width={800}
      height="100%"
      actions={[
        {
          id: "fechar",
          variant: "contained",
          label: "Fechar",
          onClick: onClose,
        },
      ]}
    >
      <DataGrid<BoardTableRow>
        columns={columns}
        data={mountData({ boards, unarchiveBoard })}
        rowKey="id"
        textForEmptyData="Nenhum quadro encontrado."
        tableHeight={"100%"}
      />
    </Dialog>
  );
}
