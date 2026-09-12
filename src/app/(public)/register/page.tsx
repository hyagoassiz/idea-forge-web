import { AuthCard } from "@/components/AuthCard";
import { APP_NAME } from "@/constants/app";
import { RegisterUserForm } from "@/modules/user/components/RegisterUserForm";

export const metadata = {
  title: `Criar conta | ${APP_NAME}`,
};

export default function RegisterPage() {
  return (
    <AuthCard title="Criar conta">
      <RegisterUserForm />
    </AuthCard>
  );
}
