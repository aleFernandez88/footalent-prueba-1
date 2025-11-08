import prisma from "@config/database";
import { UserRole } from "./users.types";

export const UserRepository = {
  create: async (email: string, name: string | undefined, role: UserRole) => {
    return prisma.user.create({
      data: { email, name, role },
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
