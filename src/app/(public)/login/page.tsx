import { AuthCard } from "@/components/AuthCard";
import { APP_NAME } from "@/constants/app";
import { LoginUserForm } from "@/modules/auth/components/LoginUserForm";

export const metadata = {
  title: `Login | ${APP_NAME}`,
};

export default function LoginPage() {
  return (
    <AuthCard title="Login">
      <LoginUserForm />
    </AuthCard>
  );
}
