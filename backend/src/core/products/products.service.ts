import { AppError } from "@utils/errors";
import { ProductRepository } from "./products.repository";

export const ProductService = {
  createProduct: async (data: {
    name: string;
    price: number;
    code: string;
    stock: number;
  }) => {
    const { code } = data;

    const exists = await ProductRepository.findByCode(code);
    if (exists) {
      throw new AppError("El código ya existe", 409);
    }

    return ProductRepository.create(data);
  },

  getProducts: async () => {
    return ProductRepository.findAll();
  },

  getProductById: async (id: number) => {
    if (isNaN(id)) {
      throw new AppError("ID inválido", 400);
    }

    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new AppError("Producto no encontrado", 404);
    }

    return product;
  },

  updateProduct: async (id: number, data: any) => {
    if (isNaN(id)) {
      throw new AppError("ID inválido", 400);
    }

    const existing = await ProductRepository.findById(id);
    if (!existing) {
      throw new AppError("Producto no encontrado", 404);
    }

    if (data.code) {
      const duplicate = await ProductRepository.findByCode(data.code);
      if (duplicate && duplicate.id !== id) {
        throw new AppError("El código ya está siendo utilizado", 409);
      }
    }

    return ProductRepository.update(id, data);
  },

  deleteProduct: async (id: number) => {
    if (isNaN(id)) {
      throw new AppError("ID inválido", 400);
    }

    const existing = await ProductRepository.findById(id);
    if (!existing) {
      throw new AppError("Producto no encontrado", 404);
    }

    return ProductRepository.delete(id);
  },
};
