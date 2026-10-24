"use client";

import { ContentCard } from "@/components/ContentCard";
import { IconAction } from "@/components/icon/IconAction";
import { Search } from "@/components/icon/Search";
import { Alert } from "@/components/Notification/Alert";
import { BoardCard } from "@/modules/board/components/BoardCard";
import { useBoards } from "@/modules/board/components/Boards/hooks/useBoards";
import { routes } from "@/routes";
import ArchiveIcon from "@mui/icons-material/Archive";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

export function Boards() {
  const {
    boards,
    isArchiving,
    isLoading,
    search,
    archiveBoard,
    refreshBoards,
  } = useBoards();

  const router = useRouter();

  return (
    <ContentCard
      toolbarRight={
        <Box display="flex" alignItems="center" gap={1}>
          <IconAction
            icon={<RefreshIcon />}
            tooltip="Atualizar"
            disabled={isLoading}
            onClick={refreshBoards}
          />

          <IconAction icon={<ArchiveIcon />} tooltip="Arquivados" disabled />

          <Search width={300} search={search} />
        </Box>
      }
    >
      {boards?.length === 0 && !isLoading && (
        <Alert severity="info">Nenhum quadro encontrado.</Alert>
      )}

      <Grid container spacing={1}>
        {boards?.map((board) => (
          <Grid item xs={12} sm={4} key={board.id}>
            <BoardCard
              name={board.name}
              onEdit={() => router.push(routes.protected.boards.edit(board.id))}
              onOpen={() => router.push(routes.protected.boards.view(board.id))}
              onArchive={() => archiveBoard(board.id)}
              isArchiving={isArchiving}
            />
          </Grid>
        ))}
      </Grid>
    </ContentCard>
  );
}
