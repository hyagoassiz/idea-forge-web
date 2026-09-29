"use client";

import { Dialog } from "@/components/Dialog";
import { ControlledTextField } from "@/components/form/ControlledTextField";
import { useCreateIdeaDialog } from "@/modules/idea/components/CreateIdeaDialog/hooks/useCreateIdeaDialog";
import { Stack } from "@mui/material";

interface CreateIdeaDialogProps {
  boardId: number;
  open: boolean;
  onClose(): void;
}

export function CreateIdeaDialog({
  boardId,
  open,
  onClose,
}: CreateIdeaDialogProps) {
  const { ideaForm, isLoading, handleSave } = useCreateIdeaDialog({
    boardId,
    onClose,
  });

  return (
    <Dialog
      title="Nova Ideia"
      open={open}
      onClose={onClose}
      actions={[
        {
          id: "cancelar",
          variant: "outlined",
          label: "Cancelar",
          onClick: onClose,
        },
        {
          id: "salvar",
          label: "Salvar",
          loading: isLoading,
          onClick: handleSave,
        },
      ]}
    >
      <Stack gap={2}>
        <ControlledTextField
          label="Nome"
          name="name"
          control={ideaForm.control}
          fullWidth
          InputProps={{ slotProps: { input: { maxLength: 60 } } }}
        />

        <ControlledTextField
          label="Descrição"
          name="description"
          control={ideaForm.control}
          fullWidth
          minRows={2}
          maxRows={10}
          multiline
          InputProps={{ slotProps: { input: { maxLength: 255 } } }}
        />
      </Stack>
    </Dialog>
  );
}
