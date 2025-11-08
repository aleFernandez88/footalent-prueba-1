"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
      return;
    }
    router.replace("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded-lg bg-blue-600 text-white font-medium"
      aria-label="logout"
    >
      Cerrar sesión
    </button>
  );
}
