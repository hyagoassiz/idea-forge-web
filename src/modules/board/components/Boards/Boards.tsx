"use client";

import { ContentCard } from "@/components/ContentCard";
import { IconAction } from "@/components/icon/IconAction";
import { Search } from "@/components/icon/Search";
import { BoardCard } from "@/modules/board/components/BoardCard";
import { useBoards } from "@/modules/board/components/Boards/hooks/useBoards";
import { routes } from "@/routes";
import ArchiveIcon from "@mui/icons-material/Archive";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export function Boards() {
  const { boards, isLoading, search, refreshBoards } = useBoards();

  const router = useRouter();

  return (
    <ContentCard
      toolbarLeft={
        <Typography>{`Registros (${boards?.length ?? 0})`}</Typography>
      }
      toolbarRight={
        <Box display="flex" alignItems="center" gap={1}>
          <IconAction
            icon={<RefreshIcon />}
            tooltip="Atualizar"
            disabled={isLoading}
            onClick={refreshBoards}
          />

          <IconAction icon={<ArchiveIcon />} tooltip="Arquivados" disabled />

          <Search width={200} search={search} />
        </Box>
      }
    >
      <Grid container spacing={1}>
        {boards?.map((board) => (
          <Grid item xs={12} sm={4} key={board.id}>
            <BoardCard
              name={board.name}
              onEdit={() => router.push(routes.protected.boards.edit(board.id))}
              onOpen={() => router.push(routes.protected.boards.view(board.id))}
            />
          </Grid>
        ))}
      </Grid>
    </ContentCard>
  );
}
