"use client";

import { ContentCard } from "@/components/ContentCard";
import { BoardCard } from "@/modules/board/components/BoardCard";
import { useGetBoardsQuery } from "@/modules/board/services/hooks";

export function Boards() {
  const { data } = useGetBoardsQuery();

  return (
    <ContentCard>
      {data?.map((board) => (
        <BoardCard
          key={board.id}
          name={board.name}
          onEdit={() => console.log("")}
          onOpen={() => console.log("")}
        />
      ))}
    </ContentCard>
  );
}
