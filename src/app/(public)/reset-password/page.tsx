import { AuthCard } from "@/components/AuthCard";
import { APP_NAME } from "@/constants/app";
import { ResetPasswordForm } from "@/modules/auth/components/ResetPasswordForm";

export const metadata = {
  title: `Redefinir senha | ${APP_NAME}`,
};

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Redefinir senha">
      <ResetPasswordForm />
    </AuthCard>
  );
}
