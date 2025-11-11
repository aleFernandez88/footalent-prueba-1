"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect } from "react";

export default function DashboardPage() {
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    // Redirigir al login si no está autenticado
    useEffect(() => {
        if (!isAuthenticated) router.push("/login");
    }, [isAuthenticated, router]);

    if (!user) return <p className="p-4 text-gray-500">Cargando usuario...</p>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name || "Usuario"}</h1>
                <p className="mb-2">📧 <strong>Email:</strong> {user.email}</p>
                <p className="mb-6">🧩 <strong>Rol:</strong> {user.role}</p>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}
