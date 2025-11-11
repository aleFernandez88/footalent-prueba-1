"use client";

import { useForm } from "react-hook-form";
import { useLogin } from "@/src/hooks/useLogin";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type FormValues = { email: string; password: string };

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const { handleLogin, loading, error, response } = useLogin();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    await handleLogin(data);
    if (response?.success) {
      const token = response.data.token;
      const user = response.data.user;
      login(token, user, true); // actualiza el contexto
      router.push("/"); // redirección inmediata
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} type="email" placeholder="Email" />
      <input {...register("password", { required: true })} type="password" placeholder="Password" />
      <button disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}


