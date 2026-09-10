import { AuthCard } from "@/components/AuthCard";
import { VerifyEmailSent } from "@/modules/auth/components/VerifyEmailSent";

export const metadata = {
  title: "E-mail enviado | Idea Forge",
};

export default function SendPage() {
  return (
    <AuthCard title="E-mail enviado">
      <VerifyEmailSent />
    </AuthCard>
  );
}
