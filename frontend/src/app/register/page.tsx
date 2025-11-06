"use client";

import FormRow from "@/src/components/FormRow";
import SubmitButton from "@/src/components/SubmitButton";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterFormInputs {
  name: string;
  dni: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const inputStyle =
  "w-[100%] placeholder:text-sm placeholder-[#78a8aa] bg-[#00697110] px-2 py-2 font-medium rounded-xl border-none  transition duration-200  focus:outline-none  hover:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true);

    try {
      console.log("¡Cuenta creada con éxito! 🎉");
      console.log("Data: ", data);
    } catch (error) {
      console.log("¡Algo salió mal!");
      console.log(error);
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <section className="   min-h-screen flex flex-col items-center justify-center">
      <div>
        <div className="mb-7">
          <p className="mb-3 font-medium text-[14px] hover:text-[var(--color-secondary)]">
            &#8592; <Link href="/">Regresar</Link>
          </p>

          <h1 className=" text-4xl font-bold text-[var(--color-primary)]">
            Regístrate
          </h1>
        </div>

        <form
          className=" grid grid-cols-2 gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormRow label="Nombre" error={errors?.name?.message}>
            <input
              className={inputStyle}
              type="text"
              id="name"
              placeholder="Escribe tu nombre"
              disabled={isLoading}
              {...register("name", {
                required: "Este campo es obligatorio",
              })}
            />
          </FormRow>

          <FormRow label="DNI" error={errors?.dni?.message}>
            <input
              className={inputStyle}
              type="text"
              id="dni"
              placeholder="Ingrese su DNI"
              {...register("dni", {
                required: "El DNI es obligatorio",
                pattern: {
                  value: /^[0-9]{7,8}$/, // 7 u 8 dígitos
                  message: "DNI inválido. Debe tener 7 u 8 números",
                },
              })}
            />
          </FormRow>

          <FormRow label="Teléfono" error={errors?.phone?.message}>
            <input
              className={inputStyle}
              type="tel"
              id="phone"
              placeholder="Ingrese su número de teléfono"
              {...register("phone", {
                required: "El teléfono es obligatorio",
              })}
            />
          </FormRow>

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

          <FormRow
            label="Contraseña (mínimo 8 caracteres)"
            error={errors?.password?.message}
          >
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
                  message:
                    "La contraseña debe tener un mínimo de 8 caracteres.",
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Repita la contraseña"
            error={errors?.passwordConfirm?.message}
          >
            <input
              className={inputStyle}
              type="password"
              id="passwordConfirm"
              placeholder="Confirma tu contraseña"
              disabled={isLoading}
              {...register("passwordConfirm", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === getValues("password") ||
                  "Las contraseñas deben coincidir",
              })}
            />
          </FormRow>

          <SubmitButton extraClass="mr-auto mb-7" disabled={isLoading}>
            {isLoading ? "Procesando..." : "Crear cuenta"}
          </SubmitButton>
        </form>

        <p className=" text-[14px]">
          ¿Ya tienes una cuenta?
          <Link
            href="/login"
            className="hover:text-[var(--color-secondary)] pl-1"
          >
            Accede a tu cuenta
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
