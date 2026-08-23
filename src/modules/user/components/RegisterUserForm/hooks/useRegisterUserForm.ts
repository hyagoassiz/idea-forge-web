"use client";

import { ApiErrorResponse } from "@/lib/api/types/ApiErrorResponse";
import {
  RegisterUserForm,
  registerUserSchema,
} from "@/modules/user/components/RegisterUserForm/schema/registerUserSchema";
import { createUser } from "@/modules/user/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseRegisterUserFormReturn {
  registerUserForm: UseFormReturn<RegisterUserForm>;
  isSubmitting: boolean;
  createUserAccount: (values: RegisterUserForm) => Promise<boolean>;
}

function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error
  );
}

export function useRegisterUserForm(): UseRegisterUserFormReturn {
  const registerUserForm = useForm<RegisterUserForm>({
    resolver: zodResolver(registerUserSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (values: RegisterUserForm) => {
      const { confirmPassword: _confirmPassword, ...userData } = values;

      return createUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
    },
  });

  async function createUserAccount(values: RegisterUserForm): Promise<boolean> {
    try {
      await createUserMutation.mutateAsync(values);
      registerUserForm.reset();
      return true;
    } catch (error) {
      if (isApiErrorResponse(error)) {
        const message = error.message.toLowerCase();

        if (
          message.includes("e-mail já cadastrado") ||
          message.includes("email already registered") ||
          error.code === "EMAIL_ALREADY_REGISTERED"
        ) {
          registerUserForm.setError("email", {
            type: "server",
            message: "Este e-mail já está cadastrado",
          });
          return false;
        }

        const fieldError = error.errors?.[0];

        if (fieldError) {
          registerUserForm.setError(
            fieldError.field as keyof RegisterUserForm,
            {
              type: "server",
              message: fieldError.message,
            },
          );
          return false;
        }

        registerUserForm.setError("root", {
          type: "server",
          message: error.message,
        });
        return false;
      }

      registerUserForm.setError("root", {
        type: "server",
        message: "Não foi possível realizar o cadastro. Tente novamente.",
      });
      return false;
    }
  }

  return {
    registerUserForm,
    isSubmitting: createUserMutation.isPending,
    createUserAccount,
  };
}
