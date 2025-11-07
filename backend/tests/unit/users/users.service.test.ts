import { UserService } from "../../../src/core/users/users.service";
import { UserRepository } from "../../../src/core/users/users.repository";

jest.mock("../../../src/config/database", () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

// ✅ Mockear el repository
jest.mock("../../../src/core/users/users.repository");

describe("UserService - createUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe crear un usuario correctamente", async () => {
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (UserRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
      name: "Test",
    });

    const user = await UserService.createUser("test@example.com", "Test");

    expect(user).toEqual({
      id: 1,
      email: "test@example.com",
      name: "Test",
    });
    expect(UserRepository.create).toHaveBeenCalledTimes(1);
  });

  it("debe lanzar error si el email no está presente", async () => {
    await expect(UserService.createUser("", "Test")).rejects.toThrow(
      "El email es obligatorio"
    );
  });

  it("debe lanzar error si el usuario ya existe", async () => {
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1 });

    await expect(
      UserService.createUser("test@example.com", "Test")
    ).rejects.toThrow("El usuario ya existe");
  });
});
