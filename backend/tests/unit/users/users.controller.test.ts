import { createUserController } from "../../../src/users/users.controller";
import { UserService } from "../../../src/users/users.service";

jest.mock("../../../src/users/users.service");

describe("Users Controller", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("debe devolver 201 al crear un usuario correctamente", async () => {
    req.body = { email: "test@example.com", name: "Test" };

    (UserService.createUser as jest.Mock).mockResolvedValue({
      id: 1,
      email: "test@example.com",
      name: "Test",
    });

    await createUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      email: "test@example.com",
      name: "Test",
    });
  });

  it("debe devolver 400 si ocurre un error en el servicio", async () => {
    req.body = { email: "test@example.com" };

    (UserService.createUser as jest.Mock).mockRejectedValue(new Error("El usuario ya existe"));

    await createUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "El usuario ya existe" });
  });
});
