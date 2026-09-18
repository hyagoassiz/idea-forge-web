"use client";

import { ContentCard } from "@/components/ContentCard";
import { BoardCard } from "@/modules/board/components/BoardCard";
import { useGetBoardsQuery } from "@/modules/board/services/hooks";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";

export function Boards() {
  const { data } = useGetBoardsQuery();

  const router = useRouter();

  return (
    <ContentCard>
      {data?.map((board) => (
        <BoardCard
          key={board.id}
          name={board.name}
          onEdit={() =>
            router.push(`${routes.protected.boards.edit(board.id)}`)
          }
          onOpen={() => console.log("")}
        />
      ))}
    </ContentCard>
  );
}
