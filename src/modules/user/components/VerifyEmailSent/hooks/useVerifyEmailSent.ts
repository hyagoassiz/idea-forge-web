import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
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
      router.replace("/login");
    }
  }, [email, token, router]);

  return { email, token, router };
}
