import { Router } from "express";
import {
    createUserController,
    getAllUsersController,
    getUserByIdController
} from "../users/users.controller";
import { authenticateToken } from "../middlewares/authenticateToken";
import { authorizeRolesOrSelf } from "../middlewares/authorizeRolesOrSelf";



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
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
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
router.post("/register", createUserController);

/**
 * @swagger
 * /api/users/getAllUsers:
 *   get:
 *     summary: Obtener todos los usuarios (solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *       401:
 *         description: Token inválido o ausente
 *       403:
 *         description: Acceso denegado
 */
router.get("/getAllUsers", authenticateToken, authorizeRolesOrSelf(["ADMIN"]), getAllUsersController);

/**
 * @swagger
 * /api/users/getUserById/{id}:
 *   get:
 *     summary: Obtener un usuario por ID (solo dueño o admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       401:
 *         description: Token inválido o ausente
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/getUserById/:id", authenticateToken, authorizeRolesOrSelf(["ADMIN"], true), getUserByIdController);

export default router;