import prisma from "../../config/database";

export const UserRepository = {
  create: async (email: string, name?: string) => {
    return prisma.user.create({
      data: { email, name },
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
