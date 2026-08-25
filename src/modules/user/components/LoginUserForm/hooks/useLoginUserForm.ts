import { ApiErrorResponse } from "@/lib/api/types";
import {
  LoginUserForm,
  loginUserSchema,
} from "@/modules/user/components/LoginUserForm/schema/loginUserSchema";
import { loginUser } from "@/modules/user/services/userService";
import {
  UserLoginRequestDTO,
  UserLoginResponseDTO,
} from "@/modules/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseLoginUserFormReturn {
  isLoading: boolean;
  loginUserForm: UseFormReturn<LoginUserForm>;
  handleLogin(): Promise<void>;
}

export function useLoginUserForm(): UseLoginUserFormReturn {
  const router = useRouter();

  const loginUserForm = useForm<LoginUserForm>({
    resolver: zodResolver(loginUserSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberEmail: false,
    },
  });

  const { mutate, isPending } = useMutation<
    UserLoginResponseDTO,
    ApiErrorResponse,
    UserLoginRequestDTO
  >({
    mutationFn: loginUser,
    onSuccess: () => {
      loginUserForm.reset();

      window.setTimeout(() => router.push("/dashboard"), 1000);
    },
    onError: (error) => {
      error?.errors?.forEach((item) => {
        loginUserForm.setError(item.field as keyof LoginUserForm, {
          message: item.message,
        });
      });
    },
  });

  const handleLogin = loginUserForm.handleSubmit(
    async (data): Promise<void> => {
      mutate(data);
    },
  );

  return { isLoading: isPending, loginUserForm, handleLogin };
}
