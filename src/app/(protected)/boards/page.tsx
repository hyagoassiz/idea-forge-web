import { APP_NAME } from "@/constants/app";
import { Boards } from "@/modules/board/components/Boards";

export const metadata = {
  title: `Quadros | ${APP_NAME}`,
};

export default function BoardsPage() {
  return <Boards />;
}
