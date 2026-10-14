import { routes } from "@/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface UseVerifyEmailSent {
  email: string | null;
}

export function useVerifyEmailSent(): UseVerifyEmailSent {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.replace(routes.public.login);
    }
  }, [email, router]);

  return { email };
}
