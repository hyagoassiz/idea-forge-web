import { AuthCard } from "@/components/AuthCard";
import { RegisterUserForm } from "@/modules/user/components/RegisterUserForm";

export const metadata = {
  title: "Criar conta| Idea Forge",
};

export default function RegisterPage() {
  return (
    <AuthCard title="Criar conta">
      <RegisterUserForm />
    </AuthCard>
  );
}
