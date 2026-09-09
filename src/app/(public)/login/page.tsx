import { AuthCard } from "@/components/AuthCard";
import { LoginUserForm } from "@/modules/auth/components/LoginUserForm";

export const metadata = {
  title: "Login| Idea Forge",
};

export default function LoginPage() {
  return (
    <AuthCard title="Login">
      <LoginUserForm />
    </AuthCard>
  );
}
