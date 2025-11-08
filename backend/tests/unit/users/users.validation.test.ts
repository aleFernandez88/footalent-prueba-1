import { validateUserRegistration } from "@core/users/users.validation";

describe("validateUserRegistration", () => {
  const buildResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("permite continuar cuando los datos son válidos", () => {
    const req: any = {
      body: {
        email: "Usuario@Test.com ",
        password: "Passw0rd1",
        name: "  John Doe  ",
        role: "admin",
      },
    };
    const res = buildResponse();
    const next = jest.fn();

    validateUserRegistration(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body.email).toBe("usuario@test.com");
    expect(req.body.password).toBe("Passw0rd1");
    expect(req.body.name).toBe("John Doe");
    expect(req.body.role).toBe("ADMIN");
    expect(res.status).not.toHaveBeenCalled();
  });

  it("devuelve 400 cuando el email es inválido", () => {
    const req: any = {
      body: {
        email: "not-an-email",
        password: "Passw0rd",
        role: "USER",
      },
    };
    const res = buildResponse();
    const next = jest.fn();

    validateUserRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        errors: expect.arrayContaining([
          "El correo electrónico es obligatorio y debe tener un formato válido",
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("devuelve 400 cuando la contraseña no cumple los requisitos", () => {
    const req: any = {
      body: {
        email: "test@example.com",
        password: "1234567",
        role: "USER",
      },
    };
    const res = buildResponse();
    const next = jest.fn();

    validateUserRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        errors: expect.arrayContaining([
          "La contraseña es obligatoria, debe tener al menos 8 caracteres e incluir letras y números",
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("devuelve 400 cuando el nombre proporcionado está vacío", () => {
    const req: any = {
      body: {
        email: "test@example.com",
        password: "Passw0rd",
        name: "   ",
        role: "USER",
      },
    };
    const res = buildResponse();
    const next = jest.fn();

    validateUserRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        errors: expect.arrayContaining([
          "El nombre debe ser una cadena de texto no vacía cuando se proporciona",
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
  it("devuelve 400 cuando el rol es inválido", () => {
    const req: any = {
      body: {
        email: "test@example.com",
        password: "Passw0rd1",
        role: "manager",
      },
    };
    const res = buildResponse();
    const next = jest.fn();

    validateUserRegistration(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        errors: expect.arrayContaining([
          "El rol proporcionado no es válido. Valores permitidos: ADMIN, USER",
        ]),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
