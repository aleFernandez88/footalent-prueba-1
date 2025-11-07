import { Request, Response } from "express";
import { UserService } from "./users.service";

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
