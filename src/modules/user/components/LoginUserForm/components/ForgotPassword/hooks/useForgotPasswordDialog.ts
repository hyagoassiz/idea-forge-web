import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "@/modules/user/components/LoginUserForm/components/ForgotPassword/schema/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

interface UseForgotPasswordDialogReturn {
  forgotPasswordForm: UseFormReturn<ForgotPasswordForm>;
  handleConfirm(): void;
}

export function useForgotPasswordDialog(): UseForgotPasswordDialogReturn {
  const router = useRouter();

  const forgotPasswordForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const handleConfirm = forgotPasswordForm.handleSubmit((data) => {
    console.log(data);
    router.push(`/reset-password?email=${data.email}&token=123456`);
  });

  return { forgotPasswordForm, handleConfirm };
}
