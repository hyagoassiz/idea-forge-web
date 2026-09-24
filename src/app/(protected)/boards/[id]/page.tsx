import { APP_NAME } from "@/constants/app";
import { BoardView } from "@/modules/board/components/BoardView";

export const metadata = {
  title: `Quadro | ${APP_NAME}`,
};

export default function ViewBoardPage() {
  return (
    <>
      <BoardView />
    </>
  );
}
