import { UserService } from "../../../src/users/users.service";
import { UserRepository } from "../../../src/users/users.repository";

// ✅ Mockear el repository
jest.mock("../../../src/users/users.repository");

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
    await expect(UserService.createUser("", "Test"))
      .rejects
      .toThrow("El email es obligatorio");
  });

  it("debe lanzar error si el usuario ya existe", async () => {
    (UserRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 1 });

    await expect(UserService.createUser("test@example.com", "Test"))
      .rejects
      .toThrow("El usuario ya existe");
  });
});
