import { Request, Response } from "express";
import { UserService } from "./users.service";
import { sendSuccess, sendError } from "@utils/httpResponses";
import { isAppError } from "@utils/errors";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { email, name, role } = req.body;

    const user = await UserService.createUser(email, name, role);

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
