"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = { children: React.ReactNode };

/**
 * Client-side guard that checks for a valid auth object in localStorage.
 * If there's no valid token inside 'auth', redirects to /login.
 */
export default function ClientGuard({ children }: Props) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (!stored) {
        router.replace("/login");
        return;
      }

      const parsed = JSON.parse(stored);
      if (!parsed?.token) {
        router.replace("/login");
        return;
      }

      // ✅ Si todo está OK
      setChecked(true);
    } catch (err) {
      router.replace("/login");
    }
  }, [router]);

  if (!checked) return null;

  return <>{children}</>;
}
