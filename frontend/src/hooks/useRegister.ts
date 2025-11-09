"use client";

import { useState } from "react";
import { registerUser } from "../lib/apiService";
import { IRegisterData, IApiResponse } from "../types/auth";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<IApiResponse | null>(null);

    const handleRegister = async (data: IRegisterData) => {
        setLoading(true);
        try {
            const result = await registerUser(data);
            setResponse(result);
            return result;
        } catch (error: any) {
            setResponse({
                success: false,
                message: error.message || "Error desconocido",
            });
        } finally {
            setLoading(false);
        }
    };

    return { loading, response, handleRegister };
};
