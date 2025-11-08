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