"use client";

import Dialog from "@/components/Dialog";
import { ControlledEmailField } from "@/components/form/ControlledEmailField";
import { Alert } from "@/components/Alert";
import { useForgotPasswordDialog } from "@/modules/user/components/LoginUserForm/components/ForgotPassword/hooks/useForgotPasswordDialog";
import { Box } from "@mui/material";

interface ForgotPasswordDialogProps {
  onClose: () => void;
}

export function ForgotPasswordDialog({ onClose }: ForgotPasswordDialogProps) {
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
      open={true}
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
        </>
      )}
    </Dialog>
  );
}
