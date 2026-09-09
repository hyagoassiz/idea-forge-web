"use client";

import { Alert } from "@/components/Alert";
import { AuthActions } from "@/components/AuthActions";
import { ControlledPasswordField } from "@/components/form/ControlledPasswordField";
import { useResetPasswordForm } from "@/modules/auth/components/ResetPasswordForm/hooks/useResetPasswordForm";

export function ResetPasswordForm() {
  const {
    apiMessage,
    alertSeverity,
    isLoading,
    resetPasswordForm,
    handleConfirm,
  } = useResetPasswordForm();

  return (
    <>
      {apiMessage ? (
        <Alert severity={alertSeverity}>{apiMessage}</Alert>
      ) : (
        <>
          <ControlledPasswordField
            name="password"
            control={resetPasswordForm.control}
            label="Senha"
            placeholder="Senha"
            autoComplete="new-password"
            fullWidth
            required
          />

          <ControlledPasswordField
            name="confirmPassword"
            control={resetPasswordForm.control}
            label="Confirmar senha"
            placeholder="Confirmar senha"
            autoComplete="new-password"
            fullWidth
            required
          />
        </>
      )}

      <AuthActions
        linkHref="/auth/login"
        isLoading={isLoading}
        buttonLabel={apiMessage ? undefined : `Redefinir senha`}
        linkLabel="Fazer login"
        onClick={handleConfirm}
      />
    </>
  );
}
