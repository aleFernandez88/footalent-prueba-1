import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schemas: { body?: ZodTypeAny; params?: ZodTypeAny; query?: ZodTypeAny }) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validar body
      if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success) {
            console.log("error", result)
          res.status(400).json({
            error: result.error.issues.map((i) => i.message),
          });
          return;
        }
        req.body = result.data;
      }

      // Validar params
      if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success) {
          res.status(400).json({
            error: result.error.issues.map((i) => i.message),
          });
          return;
        }
        req.params = result.data as any;
      }

      // Validar query
      if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success) {
          res.status(400).json({
            error: result.error.issues.map((i) => i.message),
          });
          return;
        }
        req.query = result.data as any;
      }

      next();
    } catch (e) {
      res.status(500).json({ error: "Error interno en validación" });
    }
  };
