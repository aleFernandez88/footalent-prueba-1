import { NextFunction, Request, Response } from "express";
import jwt, {
  JwtPayload,
  JsonWebTokenError,
  TokenExpiredError,
} from "jsonwebtoken";
import { AppError } from "@utils/errors";

type DecodedToken = string | JwtPayload;

export interface AuthenticatedRequest<T extends DecodedToken = DecodedToken>
  extends Request {
  user?: T;
}

const getTokenFromHeader = (authorization?: string): string | null => {
  if (!authorization) {
    return null;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
};

export const authenticateToken = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  const token = getTokenFromHeader(req.headers.authorization);

  if (!token) {
    return next(new AppError("Token de autenticación requerido", 401));
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return next(
      new AppError("Configuración de autenticación no disponible", 500, [
        "JWT_SECRET no configurado",
      ])
    );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new AppError("El token ha expirado", 401));
    }

    if (error instanceof JsonWebTokenError) {
      return next(
        new AppError("Token inválido", 401, [error.message as string])
      );
    }

    return next(new AppError("Error al validar el token", 500));
  }
};
