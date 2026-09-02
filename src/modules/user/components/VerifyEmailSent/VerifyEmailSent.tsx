"use client";

import { AuthActions } from "@/modules/user/components/AuthActions";
import { Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function VerifyEmailSent() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const token = searchParams.get("token");

  useEffect(() => {
    if (!email || !token) {
      router.replace("/login");
    }
  }, [email, token, router]);

  if (!email || !token) {
    return null;
  }

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
