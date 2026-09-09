import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface UseVerifyEmailSent {
  email: string | null;
  token: string | null;
  router: ReturnType<typeof useRouter>;
}

export function useVerifyEmailSent(): UseVerifyEmailSent {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const token = searchParams.get("token");

  useEffect(() => {
    if (!email || !token) {
      router.replace("/auth/login");
    }
  }, [email, token, router]);

  return { email, token, router };
}
