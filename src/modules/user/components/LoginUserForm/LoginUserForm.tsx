"use client";

import { ControlledEmailField } from "@/components/form/ControlledEmailField";
import { ControlledPasswordField } from "@/components/form/ControlledPasswordField";
import { Alert } from "@/modules/user/components/Alert";
import { AuthActions } from "@/modules/user/components/AuthActions";
import { useLoginUserForm } from "@/modules/user/components/LoginUserForm/hooks/useLoginUserForm";
import { Link } from "@mui/material";

export function LoginUserForm() {
  const {
    isLoading,
    loginUserForm,
    showResendVerificationEmailLink,
    handleLogin,
    handleResendVerificationEmail,
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
        linkHref="/register"
        isLoading={isLoading}
        buttonLabel="Entrar"
        linkLabel="Criar conta"
        linkDescription="Ainda não possui uma conta?"
        onClick={handleLogin}
      />
    </>
  );
}
