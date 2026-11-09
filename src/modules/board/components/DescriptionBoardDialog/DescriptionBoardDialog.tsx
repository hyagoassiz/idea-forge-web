import { Dialog } from "@/components/Dialog";
import { Alert } from "@/components/Notification/Alert";

interface DescriptionBoardDialogProps {
  description?: string | null;
  open: boolean;
  onClose(): void;
}

export function DescriptionBoardDialog({
  description,
  open,
  onClose,
}: DescriptionBoardDialogProps) {
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
      {description ? (
        description
      ) : (
        <Alert severity="info">Nenhuma descrição encontrada.</Alert>
      )}
    </Dialog>
  );
}
