"use client";

import { Alert } from "@/components/Alert";
import { Dialog } from "@/components/Dialog";
import { ControlledEmailField } from "@/components/form/ControlledEmailField";
import { useForgotPasswordDialog } from "@/modules/auth/components/ForgotPasswordDialog/hooks/useForgotPasswordDialog";
import { Box } from "@mui/material";

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ForgotPasswordDialog({
  open,
  onClose,
}: ForgotPasswordDialogProps) {
  const {
    apiMessage,
    alertSeverity,
    forgotPasswordForm,
    isLoading,
    handleConfirm,
  } = useForgotPasswordDialog();

  return (
    <Dialog
      title="Esqueceu a senha?"
      open={open}
      onClose={onClose}
      actions={[
        {
          id: "fechar",
          variant: "text",
          label: "Fechar",
          onClick: onClose,
        },
        {
          id: "confirmar",
          label: "Confirmar",
          loading: isLoading,
          disabled: Boolean(apiMessage),
          onClick: handleConfirm,
        },
      ]}
    >
      {apiMessage ? (
        <Alert severity={alertSeverity}>{apiMessage}</Alert>
      ) : (
        <>
          Digite o endereço de e-mail da sua conta e enviaremos um link para
          redefinir sua senha.
          <Box>
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
        </>
      )}
    </Dialog>
  );
}
