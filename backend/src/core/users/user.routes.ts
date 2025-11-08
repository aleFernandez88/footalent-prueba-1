import { Router } from "express";
// import {
//     createUserController,
//     getAllUsersController,
//     getUserByIdController
// } from "./users.controller";
import { createUserController, getAllUsersController, getUserByIdController } from "./users.controller";
import { authenticateToken } from "@/middleware/auth.middleware";
import { authorizeRolesOrSelf } from "@/middlewares/authorizeRolesOrSelf";
import { validateUserRegistration } from "../users/users.validation";

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
 *       400:
 *         description: Datos inválidos o usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register", validateUserRegistration, createUserController);

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
