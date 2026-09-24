"use client";

import { ControlledTextField } from "@/components/form/ControlledTextField";
import { FormActions } from "@/components/FormActions";
import { useBoardForm } from "@/modules/board/components/BoardForm/hooks/useBoardForm";
import { routes } from "@/routes";
import { Stack } from "@mui/material";

export function BoardForm() {
  const { boardForm, isLoading, handleSave } = useBoardForm();

  return (
    <>
      <Stack gap={2}>
        <ControlledTextField
          label="Nome"
          name="name"
          control={boardForm.control}
          fullWidth
          InputProps={{ slotProps: { input: { maxLength: 60 } } }}
        />

        <ControlledTextField
          label="Descrição"
          name="description"
          control={boardForm.control}
          fullWidth
          InputProps={{ slotProps: { input: { maxLength: 255 } } }}
        />
      </Stack>

      <FormActions
        buttons={[
          {
            id: "cancelar",
            variant: "outlined",
            href: routes.protected.boards.list,
            label: "Cancelar",
          },
          {
            id: "salvar",
            label: "Salvar",
            loading: isLoading,
            onClick: handleSave,
          },
        ]}
      />
    </>
  );
}
