import { Router, Response } from "express";
import { sendSuccess } from "@utils/httpResponses";
import {
  authenticateToken,
  AuthenticatedRequest,
  authorizeRoles,
} from "@middleware/auth.middleware";

const router: Router = Router();

/**
 * @swagger
 * /api/test/protected:
 *   get:
 *     summary: Test protegido con autenticación JWT
 *     tags: [Test]
 *     description: Verifica que el middleware de autenticación JWT funcione correctamente.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa con datos del token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Acceso concedido
 *                 data:
 *                   type: object
 *                   properties:
 *                     tokenPayload:
 *                       type: object
 *                       additionalProperties: true
 *       401:
 *         description: Token no proporcionado o inválido.
 */
router.get(
  "/protected",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    sendSuccess(res, {
      message: "Acceso concedido",
      data: {
        tokenPayload: req.user ?? null,
      },
    });
  }
);

/**
 * @swagger
 * /api/test/admin:
 *   get:
 *     summary: Endpoint solo para administradores
 *     tags: [Test]
 *     description: Verifica que el middleware de autorización por rol funcione correctamente.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa únicamente para usuarios con rol ADMIN.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Acceso administrador concedido
 *                 data:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       example: ADMIN
 *       403:
 *         description: Acceso denegado por falta de permisos.
 */
router.get(
  "/admin",
  authenticateToken,
  authorizeRoles("ADMIN"),
  (req: AuthenticatedRequest, res: Response) => {
    sendSuccess(res, {
      message: "Acceso administrador concedido",
      data: {
        role: typeof req.user === "string" ? null : req.user?.role ?? null,
      },
    });
  }
);

export default router;
