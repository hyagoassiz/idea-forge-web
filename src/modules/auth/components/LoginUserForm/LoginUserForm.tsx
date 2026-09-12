"use client";

import { Alert } from "@/components/Alert";
import { AuthActions } from "@/components/AuthActions";
import { ControlledEmailField } from "@/components/form/ControlledEmailField";
import { ControlledPasswordField } from "@/components/form/ControlledPasswordField";
import { ForgotPasswordDialog } from "@/modules/auth/components/LoginUserForm/components/ForgotPassword";
import { useLoginUserForm } from "@/modules/auth/components/LoginUserForm/hooks/useLoginUserForm";
import { routes } from "@/routes";
import { Box, Link } from "@mui/material";

export function LoginUserForm() {
  const {
    isForgotPasswordDialogOpen,
    isLoading,
    loginUserForm,
    showResendVerificationEmailLink,
    handleLogin,
    handleResendVerificationEmail,
    toggleForgotPasswordDialog,
  } = useLoginUserForm();

  return (
    <>
      <ControlledEmailField
        name="email"
        control={loginUserForm.control}
        label="E-mail"
        placeholder="seu-email@email.com"
        autoComplete="email"
        fullWidth
        required
      />

      <ControlledPasswordField
        name="password"
        control={loginUserForm.control}
        label="Senha"
        placeholder="Senha"
        autoComplete="password"
        fullWidth
        required
      />

      {showResendVerificationEmailLink && (
        <Alert severity="warning">
          E-mail ainda não foi validado.
          <br />
          <Link
            onClick={handleResendVerificationEmail}
            sx={{ cursor: "pointer" }}
          >
            Reenviar e-mail
          </Link>
        </Alert>
      )}

      <AuthActions
        linkHref={routes.public.register}
        isLoading={isLoading}
        buttonLabel="Entrar"
        linkLabel="Criar conta"
        linkDescription="Ainda não possui uma conta?"
        onClick={handleLogin}
      >
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Link
            onClick={toggleForgotPasswordDialog}
            sx={{ color: "text.secondary", cursor: "pointer" }}
          >
            Esqueceu a senha?
          </Link>
        </Box>
      </AuthActions>

      {isForgotPasswordDialogOpen && (
        <ForgotPasswordDialog onClose={toggleForgotPasswordDialog} />
      )}
    </>
  );
}
