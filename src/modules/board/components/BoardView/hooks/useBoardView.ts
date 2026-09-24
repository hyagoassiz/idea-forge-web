import { useGetBoardQuery } from "@/modules/board/services/hooks";
import { routes } from "@/routes";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

interface UseBoardViewReturn {
  isLoading: boolean;
  name?: string;
}

export function useBoardView(): UseBoardViewReturn {
  const router = useRouter();

  const params = useParams<{ id: string }>();

  const boardId = params.id ? Number(params.id) : undefined;

  const { isError, isFetching, data } = useGetBoardQuery(boardId as number, {
    enabled: Boolean(boardId),
  });

  const goToBoards = useCallback((): void => {
    router.push(routes.protected.boards.list);
  }, [router]);

  useEffect(() => {
    if (!isError) return;

    goToBoards();
  }, [isError, goToBoards]);

  return { isLoading: isFetching, name: data?.name };
}
