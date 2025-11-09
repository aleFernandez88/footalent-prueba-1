import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
    role: "USER" | "ADMIN";
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        // Guardamos la info del usuario en req.user
        (req as any).user = payload;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" });
    }
};
