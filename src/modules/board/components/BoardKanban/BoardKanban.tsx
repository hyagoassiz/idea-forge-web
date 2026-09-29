"use client";

import { ContentCard } from "@/components/ContentCard";
import { MoreOptions } from "@/components/MoreOptions";
import { BoardColumn } from "@/modules/board/components/BoardColumn";
import { useBoardKanban } from "@/modules/board/components/BoardKanban/hooks/useBoardKanban";
import { Box } from "@mui/material";

interface BoardKanbanProps {
  boardId?: number;
}

export function BoardKanban({ boardId }: BoardKanbanProps) {
  const { ideas } = useBoardKanban({ boardId });

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
      toolbar={
        <MoreOptions
          options={[
            {
              label: "Sobre este quadro",
              disabled: true,
              onClick: () => console.log("clicou"),
            },
          ]}
        />
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(4, minmax(240px, 1fr))",
          },
          gap: 2,
          overflowX: "auto",
        }}
      >
        {columns.map((column) => {
          const columnIdeas = ideas?.filter(
            (idea) => idea.status === column.id,
          );

          return (
            <BoardColumn
              ideas={columnIdeas ?? []}
              key={column.id}
              title={column.title}
            />
          );
        })}
      </Box>
    </ContentCard>
  );
}
