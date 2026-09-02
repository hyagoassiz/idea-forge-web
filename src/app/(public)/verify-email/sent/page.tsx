import { AuthCard } from "@/modules/user/components/AuthCard";
import { VerifyEmailSent } from "@/modules/user/components/VerifyEmailSent";

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
