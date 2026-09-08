import { AuthCard } from "@/modules/user/components/AuthCard";
import { ResetPasswordForm } from "@/modules/user/components/ResetPasswordForm";

export const metadata = {
  title: "Redefinir senha | Idea Forge",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Redefinir senha">
      <ResetPasswordForm />
    </AuthCard>
  );
}
