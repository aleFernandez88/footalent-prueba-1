import { Router } from "express";
// import {
//     createUserController,
//     getAllUsersController,
//     getUserByIdController
// } from "./users.controller";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  loginController,
} from "@core/users/users.controller";
import {
  authenticateToken,
  authorizeRolesOrSelf,
} from "@middleware/auth.middleware";
import { validateUserRegistration } from "@core/users/users.validation";

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
 *     description: Crea un nuevo usuario en la base de datos utilizando el flujo Controller → Service → Repository.
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
 *                 format: email
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Passw0rd123"
 *               name:
 *                 type: string
 *                 nullable: true
 *                 example: "Miguel"
 *               role:
 *                 type: string
 *                 description: Rol a asignar. Si se omite se asigna USER.
 *                 enum: [USER, ADMIN]
 *                 example: "USER"
 *           example:
 *             email: "test@example.com"
 *             password: "Passw0rd123"
 *             name: "Miguel"
 *             role: "ADMIN"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *                   required:
 *                     - data
 *             examples:
 *               success:
 *                 summary: Ejemplo de usuario creado
 *                 value:
 *                   success: true
 *                   statusCode: 201
 *                   message: "Usuario creado exitosamente"
 *                   data:
 *                     id: 12
 *                     email: "test@example.com"
 *                     name: "Miguel"
 *                     role: "ADMIN"
 *                     createdAt: "2025-11-10T03:00:00.000Z"
 *       400:
 *         description: Datos de registro inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validation:
 *                 summary: Validación fallida
 *                 value:
 *                   success: false
 *                   statusCode: 400
 *                   message: "Datos de registro inválidos"
 *                   errors:
 *                     - "El correo electrónico es obligatorio y debe tener un formato válido"
 *       409:
 *         description: El usuario ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               duplicated:
 *                 summary: Usuario duplicado
 *                 value:
 *                   success: false
 *                   statusCode: 409
 *                   message: "El usuario ya existe"
 *       500:
 *         description: Error inesperado en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               serverError:
 *                 summary: Error interno
 *                 value:
 *                   success: false
 *                   statusCode: 500
 *                   message: "Ha ocurrido un error inesperado"
 */
router.post("/register", validateUserRegistration, createUserController);
router.post("/login", loginController);

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
 *         description: Lista de usuarios filtrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 summary: Usuarios encontrados
 *                 value:
 *                   - id: 1
 *                     email: "user1@example.com"
 *                     name: "Laura"
 *                     role: "USER"
 *                     createdAt: "2025-11-10T03:00:00.000Z"
 *                   - id: 2
 *                     email: "admin@example.com"
 *                     name: "Admin"
 *                     role: "ADMIN"
 *                     createdAt: "2025-11-10T04:00:00.000Z"
 *       401:
 *         description: Token inválido o ausente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado para el rol autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error al obtener la información.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener usuarios"
 */
router.get(
  "/getAllUsers",
  authenticateToken,
  authorizeRolesOrSelf(["ADMIN"]),
  getAllUsersController
);

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
 *           type: integer
 *           minimum: 1
 *         description: ID numérico del usuario.
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 summary: Usuario válido
 *                 value:
 *                   id: 1
 *                   email: "user1@example.com"
 *                   name: "Laura"
 *                   role: "USER"
 *                   createdAt: "2025-11-10T03:00:00.000Z"
 *       400:
 *         description: El identificador enviado no es válido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Token inválido o ausente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado para usuarios sin permisos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error inesperado al consultar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener usuario"
 */
router.get(
  "/getUserById/:id",
  authenticateToken,
  authorizeRolesOrSelf(["ADMIN"], true),
  getUserByIdController
);

export default router;
