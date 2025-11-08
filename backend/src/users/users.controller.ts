import { Request, Response } from "express";
import { UserService } from "./users.service";

/**
 * Crea un nuevo usuario
 */
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const user = await UserService.createUser(email, name);
    return res.status(201).json(user);
  } catch (error: any) {
    console.error("Error en createUserController:", error);
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Obtiene todos los usuarios (solo admin)
 */
export const getAllUsersController = async (req: Request, res: Response) => {
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
