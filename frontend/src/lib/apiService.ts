import { IRegisterData, IApiResponse } from "../types/auth";

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
                ...(options?.headers || {}),
            },
            ...options,
        });

        if (!response.ok) throw new Error(`API request failed with status: ${response.status}`);

        return (await response.json()) as T;

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`API request failed with error: ${error.message}`);
        } else {
            throw new Error(`API request failed with unknown error`);
        }
    }
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const registerUser = async (data: IRegisterData): Promise<IApiResponse> => {
    const result = await apiRequest<IApiResponse>(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    console.log("📦 Respuesta del backend (registerUser):", result);

    if (!result.success) {
        throw new Error(result.message || "Error al registrarse");
    }

    return result;
};