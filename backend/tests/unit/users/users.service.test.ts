import { UserService } from "@core/users/users.service";
import { UserRepository } from "@core/users/users.repository";
import { AppError } from "@utils/errors";

jest.mock("@config/database", () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

// ✅ Mockear el repository
jest.mock("@core/users/users.repository");

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
    const promise = UserService.createUser("", "Test");

    await expect(promise).rejects.toBeInstanceOf(AppError);
    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        message: "El email es obligatorio",
        statusCode: 400,
      })
    );
  });

  it("debe lanzar error si el usuario ya existe", async () => {
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1 });

    const promise = UserService.createUser("test@example.com", "Test");

    await expect(promise).rejects.toBeInstanceOf(AppError);
    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        message: "El usuario ya existe",
        statusCode: 409,
      })
    );
  });
});
