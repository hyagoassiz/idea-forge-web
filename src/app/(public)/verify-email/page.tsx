import { AuthCard } from "@/components/AuthCard";
import { APP_NAME } from "@/constants/app";
import { VerifyEmail } from "@/modules/auth/components/VerifyEmail";

export const metadata = {
  title: `Verificar e-mail | ${APP_NAME}`,
};

export default function VerifyEmailPage() {
  return (
    <AuthCard title="Verificação de e-mail">
      <VerifyEmail />
    </AuthCard>
  );
}
