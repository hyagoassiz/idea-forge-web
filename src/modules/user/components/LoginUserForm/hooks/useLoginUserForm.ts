import {
  LoginUserForm,
  loginUserSchema,
} from "@/modules/user/components/LoginUserForm/schema/loginUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseLoginUserFormReturn {
  loginUserForm: UseFormReturn<LoginUserForm>;
}

export function useLoginUserForm(): UseLoginUserFormReturn {
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

  return { loginUserForm };
}
