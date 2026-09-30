import { GET_IDEAS_KEY, useGetIdeasQuery } from "@/modules/idea/services/hooks";
import { Idea } from "@/modules/idea/types";
import { useQueryClient } from "@tanstack/react-query";

interface UseBoardKanbanProps {
  boardId?: number;
}

interface UseBoardKanbanReturn {
  ideas?: Idea[];
  isLoading: boolean;
  refreshIdeas(): void;
}

export function useBoardKanban({
  boardId,
}: UseBoardKanbanProps): UseBoardKanbanReturn {
  const queryClient = useQueryClient();

  const { data: ideas, isFetching } = useGetIdeasQuery(boardId as number, {
    enabled: true,
  });

  function refreshIdeas(): void {
    queryClient.invalidateQueries({ queryKey: [GET_IDEAS_KEY] });
  }

  return { ideas, isLoading: isFetching, refreshIdeas };
}
