"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
//import toast from "react-hot-toast";

import FormRow from "@/src/components/FormRow";
import SubmitButton from "@/src/components/SubmitButton";
import Link from "next/link";

interface LoginFormInputs {
  email: string;
  password: string;
}

// placeholder-[#78a8aa]  bg-[#9acbd06b]
const inputStyle =
  "w-[100%] placeholder:text-sm placeholder-[#78a8aa] bg-[#00697110] px-2 py-2 font-medium rounded-xl border-none  transition duration-200  focus:outline-none  hover:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);

    try {
      console.log("¡Has iniciado sesión correctamente! 🎉");
      console.log("Data: ", data);
    } catch (error) {
      console.log(
        "El correo electrónico o la contraseña proporcionados son incorrectos."
      );
      console.log(error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <section className="  min-h-screen flex flex-col items-center justify-center">
      <div className="">
        <div className="mb-7">
          <p className="mb-3 font-medium text-[14px] hover:text-[var(--color-secondary)]">
            &#8592; <Link href="/">Regresar</Link>
          </p>

          <h1 className=" text-4xl font-bold text-[var(--color-primary)]">
            Acceder a tu cuenta.
          </h1>
        </div>

        <form
          className=" flex flex-col gap-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormRow label="Email" error={errors?.email?.message}>
            <input
              className={inputStyle}
              type="email"
              id="email"
              placeholder="Introduce tu correo electrónico"
              disabled={isLoading}
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message:
                    "Por favor, proporcione una dirección de correo electrónico válida.",
                },
              })}
            />
          </FormRow>

          <FormRow label="Contraseña" error={errors?.password?.message}>
            <input
              className={inputStyle}
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Introduce tu contraseña"
              disabled={isLoading}
              {...register("password", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener un mínimo de 8 caracteres",
                },
              })}
            />
          </FormRow>

          <SubmitButton extraClass="mr-auto mb-7" disabled={isLoading}>
            {isLoading ? "Procesando..." : "Acceder a la cuenta"}
          </SubmitButton>
        </form>

        <p className=" text-[14px]">
          ¿Aún no tienes una cuenta?
          <Link
            href="/register"
            className="hover:text-[var(--color-secondary)] pl-1"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
