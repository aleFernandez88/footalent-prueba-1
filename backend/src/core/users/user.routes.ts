import { Router } from "express";
import { createUserController } from "./users.controller";
import { validateUserRegistration } from "./users.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de usuarios
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Crear un usuario
 *     tags: [Users]
 *     description: Crea un nuevo usuario en la base de datos utilizando el flujo Controller → Service → Repository
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Passw0rd123"
 *               name:
 *                 type: string
 *                 example: "Miguel"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: "test@example.com"
 *                 name:
 *                   type: string
 *                   example: "Miguel"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Datos inválidos o usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El usuario ya existe"
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register", validateUserRegistration, createUserController);

export default router;
