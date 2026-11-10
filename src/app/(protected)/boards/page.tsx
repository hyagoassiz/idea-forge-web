import { APP_NAME } from "@/constants/app";
import { BoardsView } from "@/modules/board/components/BoardsView";

export const metadata = {
  title: `Quadros | ${APP_NAME}`,
};

export default function BoardsPage() {
  return <BoardsView />;
}
