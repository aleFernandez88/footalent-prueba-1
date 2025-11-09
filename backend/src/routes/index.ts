import { Router, Request, Response } from "express";
import testRoutes from "./test.routes";
import userRoutes from "@core/users/user.routes";
import productRoutes from "@core/products/products.routes";
import { sendSuccess } from "@utils/httpResponses";

const router: Router = Router();

// Health check endpoint
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Server is running
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get("/health", (_req: Request, res: Response) => {
  sendSuccess(res, {
    message: "Servidor operativo",
    data: {
      status: "OK",
      timestamp: new Date().toISOString(),
    },
  });
});

// Test routes
router.use("/test", testRoutes);

// User routes
router.use("/users", userRoutes);

// Product routes
router.use("/products", productRoutes);

export default router;
