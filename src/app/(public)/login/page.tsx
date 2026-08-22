import { AuthCard } from "@/modules/user/components/AuthCard";
import { LoginUserForm } from "@/modules/user/components/LoginUserForm";

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
