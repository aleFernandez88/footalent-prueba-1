import { UserRepository } from "./users.repository";
import { AppError } from "../../utils/errors";

export const UserService = {
  createUser: async (email: string, name?: string) => {
    // Validación de negocio
    if (!email) {
      throw new AppError("El email es obligatorio", 400);
    }

    // Verificar si el usuario existe
    const exists = await UserRepository.findByEmail(email);

    if (exists) {
      throw new AppError("El usuario ya existe", 409);
    }

    // Crear usuario
    return UserRepository.create(email, name);
  },
};
