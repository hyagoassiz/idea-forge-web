"use client";

import { AuthActions } from "@/modules/user/components/AuthActions";
import { useVerifyEmailSent } from "@/modules/user/components/VerifyEmailSent/hooks/useVerifyEmailSent";
import { Typography } from "@mui/material";

export function VerifyEmailSent() {
  const { email, token, router } = useVerifyEmailSent();

  return (
    <>
      <Typography textAlign="center">
        Enviamos um e-mail de verificação para <strong>{email}</strong>.
        Verifique sua caixa de entrada para validar seu endereço de e-mail.
      </Typography>

      <AuthActions
        linkHref="/login"
        buttonLabel="Validar e-mail"
        linkLabel="Fazer login"
        onClick={() => router.push(`/verify-email?token=${token}`)}
      />
    </>
  );
}
