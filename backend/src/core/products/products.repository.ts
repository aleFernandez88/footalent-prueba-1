import prisma from "@config/database";

export const ProductRepository = {
  create: async (data: {
    name: string;
    price: number;
    code: string;
    stock: number;
  }) => {
    return prisma.product.create({
      data,
    });
  },

  findAll: async () => {
    return prisma.product.findMany();
  },

  findById: async (id: number) => {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  findByCode: async (code: string) => {
    return prisma.product.findUnique({
      where: { code },
    });
  },

  update: async (id: number, data: any) => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};
