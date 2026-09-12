import { AuthCard } from "@/components/AuthCard";
import { APP_NAME } from "@/constants/app";
import { VerifyEmailSent } from "@/modules/auth/components/VerifyEmailSent";

export const metadata = {
  title: `E-mail enviado | ${APP_NAME}`,
};

export default function SendPage() {
  return (
    <AuthCard title="E-mail enviado">
      <VerifyEmailSent />
    </AuthCard>
  );
}
