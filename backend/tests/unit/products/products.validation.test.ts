import { productSchema } from "@core/products/products.validation";

describe("Product Validation", () => {
  const validData = {
    name: "Producto A",
    price: 100,
    code: "ABC123",
    stock: 10,
  };

  it("debería validar datos correctos", () => {
    expect(() => productSchema.parse(validData)).not.toThrow();
  });

  // NAME
  it("debería fallar si falta name", () => {
    expect(() =>
      productSchema.parse({ ...validData, name: undefined })
    ).toThrow("El nombre es obligatorio");
  });

  it("debería fallar si name está vacío", () => {
    expect(() =>
      productSchema.parse({ ...validData, name: "" })
    ).toThrow("El nombre es inválido");
  });

  it("debería fallar si name no es string", () => {
    expect(() =>
      productSchema.parse({ ...validData, name: 123 as any })
    ).toThrow("El nombre es inválido");
  });

  // PRICE
  it("debería fallar si falta price", () => {
    expect(() =>
      productSchema.parse({ ...validData, price: undefined })
    ).toThrow("El precio es obligatorio");
  });

  it("debería fallar si price no es número", () => {
    expect(() =>
      productSchema.parse({ ...validData, price: "abc" as any })
    ).toThrow("El precio es inválido");
  });

  it("debería fallar si price <= 0", () => {
    expect(() =>
      productSchema.parse({ ...validData, price: 0 })
    ).toThrow("El precio es inválido");
  });

  // CODE
  it("debería fallar si falta code", () => {
    expect(() =>
      productSchema.parse({ ...validData, code: undefined })
    ).toThrow("El código es obligatorio");
  });

  it("debería fallar si code está vacío", () => {
    expect(() =>
      productSchema.parse({ ...validData, code: "" })
    ).toThrow("El código es inválido");
  });

  it("debería fallar si code no es string", () => {
    expect(() =>
      productSchema.parse({ ...validData, code: 111 as any })
    ).toThrow("El código es invalido");
  });

  // STOCK
  it("debería fallar si falta stock", () => {
    expect(() =>
      productSchema.parse({ ...validData, stock: undefined })
    ).toThrow("El stock es obligatorio");
  });

  it("debería fallar si stock no es número", () => {
    expect(() =>
      productSchema.parse({ ...validData, stock: "zzz" as any })
    ).toThrow("El stock es inválido");
  });

  it("debería fallar si stock negativo", () => {
    expect(() =>
      productSchema.parse({ ...validData, stock: -1 })
    ).toThrow("El stock es inválido");
  });

  it("debería fallar si stock no es entero", () => {
    expect(() =>
      productSchema.parse({ ...validData, stock: 3.5 })
    ).toThrow("El stock es inválido");
  });
});
