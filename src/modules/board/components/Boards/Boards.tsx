"use client";

import { ContentCard } from "@/components/ContentCard";
import { Search } from "@/components/icon/Search";
import { BoardCard } from "@/modules/board/components/BoardCard";
import { useBoards } from "@/modules/board/components/Boards/hooks/useBoards";
import { routes } from "@/routes";

import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";

export function Boards() {
  const { boards, search } = useBoards();

  const router = useRouter();

  return (
    <ContentCard toolbar={<Search search={search} />}>
      <Grid container spacing={1}>
        {boards?.map((board) => (
          <Grid item xs={12} sm={6} key={board.id}>
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
