import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validate } from "../../../../app/middlewares/validate";
import { registerSchema } from "../validators/register.validator";
import { loginSchema } from "../validators/login.validator";

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post("/register", validate(registerSchema), authController.register.bind(authController));

  router.post("/login", validate(loginSchema), authController.login.bind(authController));

  router.post("/refresh", authController.refresh.bind(authController));

  router.post("/logout", authController.logout.bind(authController));

  router.post("/forgot-password", authController.forgotPassword.bind(authController));

  router.post("/verify-otp", authController.verifyOtp.bind(authController));

  router.post("/reset-password", authController.resetPassword.bind(authController));

  return router;
}