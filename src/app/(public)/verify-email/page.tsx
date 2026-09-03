import { AuthCard } from "@/modules/user/components/AuthCard";
import { VerifyEmail } from "@/modules/user/components/VerifyEmail";

export const metadata = {
  title: "Verificar e-mail | Idea Forge",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard title="Verificação de e-mail">
      <VerifyEmail />
    </AuthCard>
  );
}
