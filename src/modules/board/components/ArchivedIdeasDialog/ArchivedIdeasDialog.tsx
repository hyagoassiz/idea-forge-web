"use client";

import { DataGrid } from "@/components/DataGrid";
import { Dialog } from "@/components/Dialog";
import { IdeaTableRow } from "@/modules/board/components/ArchivedIdeasDialog/types/ideaTableRow";
import { useArchivedIdeasDialog } from "@/modules/board/components/ArchivedIdeasDialog/hooks/useArchivedIdeasDialog";
import { mountData } from "@/modules/board/components/ArchivedIdeasDialog/utils/mountData";

interface ArchivedIdeasDialogProps {
  boardId: number;
  open: boolean;
  onClose(): void;
}

export function ArchivedIdeasDialog({
  boardId,
  open,
  onClose,
}: ArchivedIdeasDialogProps) {
  const { ideas, columns, unarchiveIdea } = useArchivedIdeasDialog({ boardId });

  return (
    <Dialog
      title={`Ideias arquivadas (${ideas.length})`}
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
      <DataGrid<IdeaTableRow>
        columns={columns}
        data={mountData({ ideas, unarchiveIdea })}
        rowKey="id"
        textForEmptyData="Nenhuma ideia arquivada encontrada."
        tableHeight="100%"
      />
    </Dialog>
  );
}
