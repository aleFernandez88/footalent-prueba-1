import { Request, Response, NextFunction } from "express";
import {
  isValidEmail,
  isValidPassword,
  sanitizeString,
} from "../../utils/validators";
import { sendError } from "../../utils/httpResponses";

export const validateUserRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body ?? {};
  const errors: string[] = [];

  // Email validation
  if (!isValidEmail(email)) {
    errors.push(
      "El correo electrónico es obligatorio y debe tener un formato válido"
    );
  }

  // Password validation
  if (!isValidPassword(password)) {
    errors.push(
      "La contraseña es obligatoria, debe tener al menos 8 caracteres e incluir letras y números"
    );
  }

  // Name validation (optional but must be a non-empty string when provided)
  if (name !== undefined) {
    const sanitizedName = sanitizeString(name);
    if (!sanitizedName) {
      errors.push(
        "El nombre debe ser una cadena de texto no vacía cuando se proporciona"
      );
    } else {
      req.body.name = sanitizedName;
    }
  }

  if (errors.length > 0) {
    return sendError(res, {
      statusCode: 400,
      message: "Datos de registro inválidos",
      errors,
    });
  }

  // Sanitize email and password before passing to controller
  req.body.email = (email as string).trim().toLowerCase();
  req.body.password = (password as string).trim();

  return next();
};
