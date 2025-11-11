"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: string | number; email: string; name?: string; role?: string };
type AuthState = { token: string | null; user: User | null };

type AuthContextValue = {
    auth: AuthState;
    user: User | null; // 👈 agregado
    login: (token: string, user: User, remember?: boolean) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>({ token: null, user: null });

    useEffect(() => {
        try {
            const stored = localStorage.getItem("auth");
            if (stored) {
                const parsed = JSON.parse(stored);
                setAuth(parsed);
            }
        } catch {
            // ignoramos errores de parseo
        }
    }, []);

    const login = (token: string, user: User, remember = true) => {
        const newState = { token, user };
        setAuth(newState);
        if (remember) {
            localStorage.setItem("auth", JSON.stringify(newState));
        }
    };

    const logout = () => {
        setAuth({ token: null, user: null });
        localStorage.removeItem("auth");
    };

    const value: AuthContextValue = {
        auth,
        user: auth.user, // 👈 ahora el contexto expone el user directamente
        login,
        logout,
        isAuthenticated: !!auth.token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
