import { Router, Request, Response } from "express";

const router: Router = Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test endpoint
 *     tags: [Test]
 *     description: A simple test endpoint to verify the API is working
 *     responses:
 *       200:
 *         description: Successful response
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
 *                   example: Test endpoint is working!
 *                 data:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Test endpoint trabajando!",
    data: {
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
