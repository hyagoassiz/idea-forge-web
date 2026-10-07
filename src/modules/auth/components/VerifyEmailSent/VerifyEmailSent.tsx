"use client";

import { AuthActions } from "@/components/AuthActions";
import { Alert } from "@/components/Notification/Alert";
import { useVerifyEmailSent } from "@/modules/auth/components/VerifyEmailSent/hooks/useVerifyEmailSent";
import { routes } from "@/routes";

export function VerifyEmailSent() {
  const { email, token, router } = useVerifyEmailSent();

  return (
    <>
      <Alert severity="info" icon={false}>
        Enviamos um e-mail de verificação para <strong>{email}</strong>.
        Verifique sua caixa de entrada para validar seu endereço de e-mail.
      </Alert>

      <AuthActions
        linkHref={routes.public.login}
        buttonLabel="Validar e-mail"
        linkLabel="Fazer login"
        onClick={() =>
          router.push(routes.public.verifyEmail.verify(token as string))
        }
      />
    </>
  );
}
