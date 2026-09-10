"use client";

import { Alert } from "@/components/Alert";
import { AuthActions } from "@/components/AuthActions";
import { useVerifyEmailSent } from "@/modules/auth/components/VerifyEmailSent/hooks/useVerifyEmailSent";

export function VerifyEmailSent() {
  const { email, token, router } = useVerifyEmailSent();

  return (
    <>
      <Alert severity="info" icon={false}>
        Enviamos um e-mail de verificação para <strong>{email}</strong>.
        Verifique sua caixa de entrada para validar seu endereço de e-mail.
      </Alert>

      <AuthActions
        linkHref="/login"
        buttonLabel="Validar e-mail"
        linkLabel="Fazer login"
        onClick={() => router.push(`/verify-email?token=${token}`)}
      />
    </>
  );
}
