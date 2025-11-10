"use client"
import { useFetch } from "../hooks/useApi"

interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
}


export default function Header() {
    const userId = 1
    const { data: user, loading, error } = useFetch<IUser>(`/api/users/${userId}`);

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b border-gray-100">
            <h1 className="text-lg font-semibold text-blue-500 tracking-tight sm:text-xl">Header</h1>

            <nav className="hidden md:flex items-center gap-6 text-gray-600 text-sm">
                {loading ? (
                    <span className="text-gray-400 italic">Cargando usuario...</span>
                ) : error ? (
                    <span className="text-red-500">Error al cargar usuario</span>
                ) : (
                    <span className="font-medium text-blue-600">Hola, {user?.name ?? "Invitado"}</span>
                )}
            </nav>

            <button
                aria-label="Abrir menú"
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                ≡
            </button>
        </header>
    )
}
