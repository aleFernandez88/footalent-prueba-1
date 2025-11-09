import { z } from "zod";

export const productSchema = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "El nombre es obligatorio"
        : "El nombre es inválido"
  }).min(1, { message: "El nombre es inválido" }),

  price: z.number({
    error: (issue) =>
      issue.input === undefined
        ? "El precio es obligatorio"
        : "El precio es inválido"
  }).positive("El precio es inválido"),

  code: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "El código es obligatorio"
        : "El código es invalido"
  }).min(1, { message: "El código es inválido" }),

  stock: z.number({
    error: (issue) =>
      issue.input === undefined
        ? "El stock es obligatorio"
        : "El stock es inválido"
  }).refine((n) => Number.isInteger(n), "El stock es inválido")
.nonnegative("El stock es inválido")
});
