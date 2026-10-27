import { IconAction } from "@/components/icon/IconAction";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";

interface InlineEditActionsProps {
  onSave(): void;
  onCancel(): void;
  isLoading: boolean;
}

export function InlineEditActions({
  onSave,
  onCancel,
  isLoading,
}: InlineEditActionsProps) {
  return (
    <Stack direction="row" justifyContent="flex-end" spacing={0.5} mt={0.5}>
      <IconAction
        tooltip="Salvar alterações"
        icon={<CheckIcon fontSize="small" />}
        size="small"
        onClick={onSave}
        disabled={isLoading}
      />

      <IconAction
        tooltip="Cancelar alterações"
        icon={<CloseIcon fontSize="small" />}
        size="small"
        onClick={onCancel}
        disabled={isLoading}
      />
    </Stack>
  );
}
