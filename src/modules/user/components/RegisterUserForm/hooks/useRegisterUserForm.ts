import { applyFieldErrors } from "@/lib/strings/applyFieldErrors";
import {
  RegisterUserForm,
  registerUserSchema,
} from "@/modules/user/components/RegisterUserForm/schema/registerUserSchema";
import { useCreateUserMutation } from "@/modules/user/services/hooks";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const { mutate, isPending } = useCreateUserMutation({
    onSuccess: (response) => {
      router.push(
        routes.public.verifyEmail.sent(response.email, response.token),
      );
    },
    onError: (error) => {
      applyFieldErrors(registerUserForm, error);
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
