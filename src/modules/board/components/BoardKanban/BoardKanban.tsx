"use client";

import { ContentCard } from "@/components/ContentCard";
import { IconAction } from "@/components/icon/IconAction";
import { MoreOptions } from "@/components/MoreOptions";
import { BoardColumn } from "@/modules/board/components/BoardColumn";
import { useBoardKanban } from "@/modules/board/components/BoardKanban/hooks/useBoardKanban";
import { DescriptionBoardDialog } from "@/modules/board/components/DescriptionBoardDialog";
import ArchiveIcon from "@mui/icons-material/Archive";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box } from "@mui/material";
import { useState } from "react";

interface BoardKanbanProps {
  boardId?: number;
  description?: string | null;
}

export function BoardKanban({ boardId, description }: BoardKanbanProps) {
  const { ideas, isLoading, isArchiving, archiveIdea, refreshIdeas, mutate } =
    useBoardKanban({
      boardId,
    });

  const [isDescriptionDialogOpen, setIsDescriptionDialogOpen] = useState(false);

  const columns = [
    {
      id: "DRAFT",
      title: "Rascunho",
    },
    {
      id: "VALIDATION",
      title: "Validação",
    },
    {
      id: "DEVELOPMENT",
      title: "Desenvolvimento",
    },
    {
      id: "LAUNCHED",
      title: "Lançadas",
    },
  ] as const;

  return (
    <ContentCard
      toolbarRight={
        <Box display="flex" alignItems="center" gap={1}>
          <IconAction
            icon={<RefreshIcon />}
            tooltip="Atualizar"
            disabled={isLoading}
            onClick={refreshIdeas}
          />

          <IconAction icon={<ArchiveIcon />} tooltip="Arquivados" disabled />

          <MoreOptions
            options={[
              {
                label: "Descrição do quadro",
                onClick: () => setIsDescriptionDialogOpen(true),
              },
            ]}
          />
        </Box>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(4, minmax(120px, 1fr))",
          },
          gap: 2,
          overflowX: "auto",
          alignItems: "start",
        }}
      >
        {columns.map((column) => {
          const columnIdeas = ideas?.filter(
            (idea) => !idea.archived && idea.status === column.id,
          );

          return (
            <BoardColumn
              ideas={columnIdeas ?? []}
              key={column.id}
              title={column.title}
              mutate={mutate}
              archiveIdea={archiveIdea}
              isArchiving={isArchiving}
            />
          );
        })}
      </Box>

      {isDescriptionDialogOpen && (
        <DescriptionBoardDialog
          description={description}
          open={isDescriptionDialogOpen}
          onClose={() => setIsDescriptionDialogOpen(false)}
        />
      )}
    </ContentCard>
  );
}
