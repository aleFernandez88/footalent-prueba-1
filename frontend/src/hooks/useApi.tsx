import { useState, useEffect } from "react";
import { apiRequest } from "../lib/apiService";

export function useFetch<T>(endpoint: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!endpoint) return;
    const fetchData = async () => {
      try {
        const response = await apiRequest<T>(endpoint, options);
        setData(response);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options]);

  return { data, loading, error };
}