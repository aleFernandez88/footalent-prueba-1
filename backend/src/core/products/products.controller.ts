import { controllerHandler } from "@utils/controllerHandler";
import { ProductService } from "./products.service";

export const createProductController = controllerHandler(
  async (req) => {
    const { name, price, code, stock } = req.body;
    return ProductService.createProduct({ name, price, code, stock });
  },
  "Producto creado exitosamente",
  201
);

export const getProductsController = controllerHandler(
  async () => ProductService.getProducts(),
  "Productos obtenidos exitosamente",
  200
);

export const getProductByIdController = controllerHandler(
  async (req) => {
    const id = Number(req.params.id);
    return ProductService.getProductById(id);
  },
  "Producto obtenido exitosamente",
  200
);

export const updateProductController = controllerHandler(
  async (req) => {
    const id = Number(req.params.id);
    return ProductService.updateProduct(id, req.body);
  },
  "Producto actualizado exitosamente",
  200
);

export const deleteProductController = controllerHandler(
  async (req) => {
    const id = Number(req.params.id);
    return ProductService.deleteProduct(id);
  },
  "Producto eliminado exitosamente",
  200
);
