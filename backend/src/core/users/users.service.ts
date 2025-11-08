import { UserRepository } from "./users.repository";
import { AppError } from "@utils/errors";
import { USER_ROLES, UserRole } from "./users.types";

export const UserService = {
  createUser: async (
    email: string,
    name: string | undefined,
    role: UserRole
  ) => {
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
    if (!USER_ROLES.includes(role)) {
      throw new AppError("Rol de usuario inválido", 400);
    }

    // Crear usuario
    return UserRepository.create(email, name, role);
  },
};
