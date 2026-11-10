import { Dialog } from "@/components/Dialog";
import { Alert } from "@/components/Notification/Alert";
import { Board } from "@/modules/board/types";

interface BoardDescriptionDialogProps {
  board: Board;
  open: boolean;
  onClose(): void;
}

export function BoardDescriptionDialog({
  board,
  open,
  onClose,
}: BoardDescriptionDialogProps) {
  return (
    <Dialog
      title="Sobre este quadro"
      open={open}
      onClose={onClose}
      actions={[
        {
          id: "fechar",
          label: "Fechar",
          variant: "contained",
          onClick: onClose,
        },
      ]}
    >
      {board.description ? (
        board.description
      ) : (
        <Alert severity="info">Nenhuma descrição encontrada.</Alert>
      )}
    </Dialog>
  );
}
