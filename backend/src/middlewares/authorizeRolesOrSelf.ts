import { Request, Response, NextFunction } from "express";

type Role = "USER" | "ADMIN";

/**
 * Middleware para autorizar roles o al usuario dueño del recurso
 * @param roles Array de roles permitidos (ej: ["ADMIN"])
 * @param allowSelf Booleano: si true permite que el dueño del ID acceda
 */
export const authorizeRolesOrSelf = (roles: Role[], allowSelf = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user; // set por authenticateToken
        const paramId = req.params.id;

        if (!user) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        // Si el rol está permitido
        if (roles.includes(user.role)) {
            return next();
        }

        // Si allowSelf y el ID del token coincide con el ID de params
        if (allowSelf && paramId && user.id === paramId) {
            return next();
        }

        return res.status(403).json({ message: "Acceso denegado" });
    };
};
