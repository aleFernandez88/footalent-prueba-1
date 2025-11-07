import { UserRepository } from "./users.repository";

export const UserService = {
  createUser: async (email: string, name?: string) => {
    // Validación de negocio
    if (!email) {
      throw new Error("El email es obligatorio");
    }

    // Verificar si el usuario existe
    const exists = await UserRepository.findByEmail(email);

    if (exists) {
      throw new Error("El usuario ya existe");
    }

    // Crear usuario
    return UserRepository.create(email, name);
  },
};
