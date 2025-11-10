import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

import { sendError } from "@utils/httpResponses";
import { sanitizeString } from "@utils/validators";

const normalizeIssues = (issues: { message: string }[]): string[] => {
  return issues
    .map(({ message }) => sanitizeString(message) ?? "Dato inválido")
    .filter(Boolean) as string[];
};

export const validate =
  (schemas: { body?: ZodTypeAny; params?: ZodTypeAny; query?: ZodTypeAny }) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validar body
      if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success) {
          sendError(res, {
            statusCode: 400,
            message: "Datos del cuerpo inválidos",
            errors: normalizeIssues(result.error.issues),
          });
          return;
        }
        req.body = result.data;
      }

      // Validar params
      if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success) {
          sendError(res, {
            statusCode: 400,
            message: "Parámetros inválidos",
            errors: normalizeIssues(result.error.issues),
          });
          return;
        }
        req.params = result.data as any;
      }

      // Validar query
      if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success) {
          sendError(res, {
            statusCode: 400,
            message: "Query inválida",
            errors: normalizeIssues(result.error.issues),
          });
          return;
        }
        req.query = result.data as any;
      }

      next();
    } catch (e) {
      sendError(res, {
        statusCode: 500,
        message: "Error interno en validación",
      });
    }
  };
