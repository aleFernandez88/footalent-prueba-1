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

  findAll: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },
};
