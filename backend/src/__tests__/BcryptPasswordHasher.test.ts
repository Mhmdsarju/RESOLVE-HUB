import { BcryptPasswordHasher } from "../modules/auth/infrastructure/services/BcryptPasswordHasher"; 

describe("BcryptPasswordHasher", () => {
  let passwordHasher: BcryptPasswordHasher;

  beforeEach(() => {
    passwordHasher = new BcryptPasswordHasher();
  });

  it("should hash the password", async () => {
    const password = "Password@123";

    const hashedPassword = await passwordHasher.hash(password);

    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
  });

  it("should return true for a valid password", async () => {
    const password = "Password@123";

    const hashedPassword = await passwordHasher.hash(password);

    const result = await passwordHasher.compare(password, hashedPassword);

    expect(result).toBe(true);
  });

  it("should return false for an invalid password", async () => {
    const password = "Password@123";

    const hashedPassword = await passwordHasher.hash(password);

    const result = await passwordHasher.compare(
      "WrongPassword",
      hashedPassword,
    );

    expect(result).toBe(false);
  });
});