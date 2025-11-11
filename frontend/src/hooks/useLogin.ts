// src/hooks/useLogin.ts
"use client";

import { useState } from "react";
import { loginUser } from "@/src/lib/apiService";
import { ILoginData, ILoginResponse } from "@/src/types/auth";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<ILoginResponse | null>(null);

    const handleLogin = async (data: ILoginData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await loginUser(data);
            setResponse(res);
            return res;
        } catch (err: any) {
            const msg = err?.message || "Error inesperado";
            setError(msg);
            return { success: false, message: msg, data: null } as any;
        } finally {
            setLoading(false);
        }
    };

    const resetResponse = () => setResponse(null);

    return { loading, error, response, handleLogin, resetResponse };
};
