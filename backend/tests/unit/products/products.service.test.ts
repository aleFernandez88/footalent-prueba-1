import { ProductService } from "@core/products/products.service";
import { ProductRepository } from "@core/products/products.repository";

jest.mock("@core/products/products.repository");

const mockRepo = ProductRepository as jest.Mocked<typeof ProductRepository>;

describe("ProductService", () => {
  beforeEach(() => jest.clearAllMocks());

  const validProduct = {
    name: "Producto A",
    code: "C1",
    price: 10,
    stock: 5,
  };

  const mockDbProduct = (overrides = {}) => ({
    id: 1,
    name: "Producto A",
    code: "C1",
    price: 10,
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  });

  // Crear
  describe("createProduct", () => {
    it("debería crear un producto", async () => {
      mockRepo.findByCode.mockResolvedValue(null);
      mockRepo.create.mockResolvedValue(mockDbProduct());

      const result = await ProductService.createProduct(validProduct);
      expect(result.id).toBe(1);
    });

    it("debería fallar si el código existe", async () => {
      mockRepo.findByCode.mockResolvedValue(mockDbProduct({ id: 99 }));

      await expect(ProductService.createProduct(validProduct))
        .rejects.toThrow("El código ya existe");
    });
  });

  // Traer todos
  describe("getProducts", () => {
    it("debería retornar los productos", async () => {
      mockRepo.findAll.mockResolvedValue([mockDbProduct()]);

      const result = await ProductService.getProducts();
      expect(result.length).toBe(1);
    });
  });

  // Traer por id
  describe("getProductById", () => {
    it("debería retornar un producto válido", async () => {
      mockRepo.findById.mockResolvedValue(mockDbProduct());

      const result = await ProductService.getProductById(1);
      expect(result.id).toBe(1);
    });

    it("debería fallar si el id no es número", async () => {
      await expect(ProductService.getProductById(NaN))
        .rejects.toThrow("ID inválido");
    });

    it("debería fallar si no existe producto", async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(ProductService.getProductById(99))
        .rejects.toThrow("Producto no encontrado");
    });
  });

  // Actualizar
  describe("updateProduct", () => {
    it("debería actualizar un producto", async () => {
    mockRepo.findById.mockResolvedValue(mockDbProduct());
    mockRepo.findByCode.mockResolvedValue(null);
    mockRepo.update.mockResolvedValue(mockDbProduct());

  const result = await ProductService.updateProduct(1, validProduct);
  expect(result.id).toBe(1);
});

    it("debería fallar si el id es inválido", async () => {
      await expect(ProductService.updateProduct(NaN, {}))
        .rejects.toThrow("ID inválido");
    });

    it("debería fallar si el producto no existe", async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(ProductService.updateProduct(99, {}))
        .rejects.toThrow("Producto no encontrado");
    });

    it("debería fallar si code duplicado", async () => {
      mockRepo.findById.mockResolvedValue(mockDbProduct({ id: 1 }));
      mockRepo.findByCode.mockResolvedValue(mockDbProduct({ id: 2 }));

      await expect(
        ProductService.updateProduct(1, { code: "X" })
      ).rejects.toThrow("El código ya está siendo utilizado");
    });
  });

  // Borrar
  describe("deleteProduct", () => {
    it("debería eliminar producto", async () => {
      mockRepo.findById.mockResolvedValue(mockDbProduct());
      mockRepo.delete.mockResolvedValue(mockDbProduct());

      const result = await ProductService.deleteProduct(1);

      expect(result.id).toBe(1);
    });

    it("debería fallar si el id es inválido", async () => {
      await expect(ProductService.deleteProduct(NaN))
        .rejects.toThrow("ID inválido");
    });

    it("debería fallar si el producto no existe", async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(ProductService.deleteProduct(99))
        .rejects.toThrow("Producto no encontrado");
    });
  });
});
