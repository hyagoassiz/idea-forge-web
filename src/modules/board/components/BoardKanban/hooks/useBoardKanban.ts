import { useGetIdeasQuery } from "@/modules/idea/services/hooks";
import { Idea } from "@/modules/idea/types";

interface UseBoardKanbanProps {
  boardId?: number;
}

interface UseBoardKanbanReturn {
  ideas?: Idea[];
}

export function useBoardKanban({
  boardId,
}: UseBoardKanbanProps): UseBoardKanbanReturn {
  const { data: ideas } = useGetIdeasQuery(boardId as number, {
    enabled: true,
  });

  return { ideas };
}
