"use client";

import {
  RegisterUserForm,
  registerUserSchema,
} from "@/modules/user/components/RegisterUserForm/schema/registerUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseRegisterUserFormReturn {
  registerUserForm: UseFormReturn<RegisterUserForm>;
}

export function useRegisterUserForm(): UseRegisterUserFormReturn {
  const registerUserForm = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return {
    registerUserForm,
  };
}
