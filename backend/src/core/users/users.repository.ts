import prisma from "@config/database";
import bcrypt from "bcrypt";
import { UserRole } from "./users.types";

export const UserRepository = {
  create: async (email: string, name: string | undefined, role: UserRole, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { email, name, role, password: hashedPassword },
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
