import { IconAction } from "@/components/icon/IconAction";
import { BoardTableRow } from "@/modules/board/components/ArchivedBoardsDialog/types";
import { Board } from "@/modules/board/types";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

interface MountDataProps {
  boards: Board[];
  unarchiveBoard(id: number): void;
}

export function mountData({
  boards,
  unarchiveBoard,
}: MountDataProps): BoardTableRow[] {
  if (boards?.length) {
    return boards.map((board) => {
      return {
        ...board,
        option: (
          <IconAction
            icon={<UnarchiveIcon />}
            tooltip="Desarquivar"
            onClick={() => unarchiveBoard(board.id)}
          />
        ),
      };
    });
  }

  return [];
}
