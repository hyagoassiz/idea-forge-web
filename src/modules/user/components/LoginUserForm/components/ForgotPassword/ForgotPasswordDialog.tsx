"use client";

import Dialog from "@/components/Dialog";
import { ControlledEmailField } from "@/components/form/ControlledEmailField";
import { useForgotPasswordDialog } from "@/modules/user/components/LoginUserForm/components/ForgotPassword/hooks/useForgotPasswordDialog";
import { Box } from "@mui/material";

interface ForgotPasswordDialogProps {
  onClose: () => void;
}

export function ForgotPasswordDialog({ onClose }: ForgotPasswordDialogProps) {
  const { forgotPasswordForm, handleConfirm } = useForgotPasswordDialog();

  return (
    <Dialog
      title="Esqueceu a senha?"
      open={true}
      onClose={onClose}
      actions={[
        {
          id: "cancelar",
          variant: "text",
          label: "Cancelar",
          onClick: onClose,
        },
        {
          id: "confirmar",
          label: "Confirmar",
          onClick: handleConfirm,
        },
      ]}
    >
      Digite o endereço de e-mail da sua conta e enviaremos um link para
      redefinir sua senha.
      <Box mt={1}>
        <ControlledEmailField
          name="email"
          control={forgotPasswordForm.control}
          label="E-mail"
          placeholder="seu-email@email.com"
          autoComplete="email"
          fullWidth
          required
        />
      </Box>
    </Dialog>
  );
}
