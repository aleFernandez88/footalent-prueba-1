import { Request, Response } from "express";
import { UserService } from "./users.service";
import { sendSuccess, sendError } from "@utils/httpResponses";
import { isAppError } from "@utils/errors";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, name, role, password } = req.body;

    const user = await UserService.createUser(email, name, role, password);

    return sendSuccess(res, {
      statusCode: 201,
      message: "Usuario creado exitosamente",
      data: user,
    });
  } catch (error: any) {
    console.error("Error en createUserController:", error);
    if (isAppError(error)) {
      return sendError(res, {
        statusCode: error.statusCode,
        message: error.message,
        errors: error.details,
      });
    }

    return sendError(res, {
      statusCode: 500,
      message: "Ha ocurrido un error inesperado",
    });
  }
};

/**
 * Obtiene todos los usuarios (solo admin)
 */
export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    console.error("Error en getAllUsersController:", error);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

/**
 * Obtiene un usuario por ID (solo el dueño o admin)
 */
export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    console.error("Error en getUserByIdController:", error);
    return res.status(500).json({ error: "Error al obtener usuario" });
  }


};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Login exitoso",
      data: result,
    });
  } catch (error: any) {
    console.error("Error en loginController:", error);
    if (isAppError(error)) {
      return sendError(res, {
        statusCode: error.statusCode,
        message: error.message,
        errors: error.details,
      });
    }

    return sendError(res, {
      statusCode: 500,
      message: "Error inesperado en el login",
    });
  }
};

