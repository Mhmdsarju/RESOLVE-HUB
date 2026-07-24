import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validate } from "../../../../app/middlewares/validate";
import { registerSchema } from "../validators/register.validator";
import { loginSchema } from "../validators/login.validator";
import { authMiddleware } from "../../../../app/middlewares/authMiddleware";

export function createAuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post("/register", validate(registerSchema), authController.register.bind(authController));

  router.post("/login", validate(loginSchema), authController.login.bind(authController));

  router.post("/refresh", authController.refresh.bind(authController));

  router.post("/logout", authController.logout.bind(authController));

  router.post("/forgot-password", authController.forgotPassword.bind(authController));

  router.post("/verify-otp", authController.verifyOtp.bind(authController));

  router.post("/reset-password", authController.resetPassword.bind(authController));

  router.post("/verify-signup-otp", authController.verifySignupOtp.bind(authController));

  router.post("/resend-signup-otp", authController.resendSignupOtp.bind(authController));

  router.post("/resend-forgot-password-otp", authController.resendForgotPasswordOtp.bind(authController));

  router.get("/me", authMiddleware, authController.me.bind(authController));

  router.post("/change-password", authMiddleware, authController.changePassword.bind(authController));

  return router;
}