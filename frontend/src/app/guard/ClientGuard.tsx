"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = { children: React.ReactNode };

/**
 * Client-side guard that checks for a valid token in localStorage.
 * If there's no token it redirects to /login. While checking, renders nothing.
 *
 * Assumption: the token is stored in localStorage under the key 'token'.
 */
export default function ClientGuard({ children }: Props) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      } else {
        setChecked(true);
      }
    } catch (err) {
      router.replace("/login");
    }
  }, [router]);

  if (!checked) return null;

  return <>{children}</>;
}
