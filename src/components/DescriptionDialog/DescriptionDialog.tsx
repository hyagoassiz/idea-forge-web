import { Dialog } from "@/components/Dialog";
import { Alert } from "@/components/Notification/Alert";

interface DescriptionDialogProps {
  description?: string | null;
  title: string;
  open: boolean;
  onClose(): void;
}

export function DescriptionDialog({
  description,
  title,
  open,
  onClose,
}: DescriptionDialogProps) {
  return (
    <Dialog
      title={title}
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
