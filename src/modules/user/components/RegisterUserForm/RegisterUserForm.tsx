"use client";

import { ControlledEmailField } from "@/components/form/ControlledEmailField";
import { ControlledPasswordField } from "@/components/form/ControlledPasswordField";
import { ControlledTextField } from "@/components/form/ControlledTextField";
import { AuthActions } from "@/modules/user/components/AuthActions";
import { useRegisterUserForm } from "@/modules/user/components/RegisterUserForm/hooks/useRegisterUserForm";

export function RegisterUserForm() {
  const { isLoading, registerUserForm, handleRegister } = useRegisterUserForm();

  return (
    <>
      <ControlledTextField
        name="name"
        control={registerUserForm.control}
        label="Nome"
        placeholder="Seu nome"
        autoComplete="name"
        fullWidth
        required
      />

      <ControlledEmailField
        name="email"
        control={registerUserForm.control}
        label="E-mail"
        placeholder="seu-email@email.com"
        autoComplete="email"
        fullWidth
        required
      />

      <ControlledPasswordField
        name="password"
        control={registerUserForm.control}
        label="Senha"
        placeholder="Senha"
        autoComplete="new-password"
        fullWidth
        required
      />

      <ControlledPasswordField
        name="confirmPassword"
        control={registerUserForm.control}
        label="Confirmar senha"
        placeholder="Confirmar senha"
        autoComplete="new-password"
        fullWidth
        required
      />

      <AuthActions
        linkHref="/login"
        isLoading={isLoading}
        buttonLabel="Criar conta"
        linkLabel="Entrar"
        linkDescription="Já possui uma conta?"
        onClick={handleRegister}
      />
    </>
  );
}
