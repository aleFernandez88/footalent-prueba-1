import { Router, Response } from "express";
import { sendSuccess } from "@utils/httpResponses";
import {
  authenticateToken,
  AuthenticatedRequest,
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

export default router;
