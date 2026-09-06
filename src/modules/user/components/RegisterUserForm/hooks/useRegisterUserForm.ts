import { ApiErrorResponse } from "@/lib/api/types";
import {
  RegisterUserForm,
  registerUserSchema,
} from "@/modules/user/components/RegisterUserForm/schema/registerUserSchema";
import { createUser } from "@/modules/user/services/userService";
import {
  CreateUserRequest,
  CreateUserUserResponse,
} from "@/modules/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseRegisterUserFormReturn {
  isLoading: boolean;
  registerUserForm: UseFormReturn<RegisterUserForm>;
  handleRegister(): void;
}

export function useRegisterUserForm(): UseRegisterUserFormReturn {
  const router = useRouter();

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

  const { mutate, isPending } = useMutation<
    CreateUserUserResponse,
    ApiErrorResponse,
    CreateUserRequest
  >({
    mutationFn: createUser,
    onSuccess: () => {
      registerUserForm.reset();

      window.setTimeout(() => router.push("/login"), 1000);
    },
    onError: (error) => {
      error?.errors?.forEach((item) => {
        registerUserForm.setError(item.field as keyof RegisterUserForm, {
          message: item.message,
        });
      });
    },
  });

  const handleRegister = registerUserForm.handleSubmit((data) => {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  });

  return { isLoading: isPending, registerUserForm, handleRegister };
}
