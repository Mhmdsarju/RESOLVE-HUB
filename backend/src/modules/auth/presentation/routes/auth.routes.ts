import { Router } from "express";
import { validate } from "../../../../app/middlewares/validate";
import { authMiddleware } from "../../../../app/middlewares/authMiddleware";
import { registerSchema } from "../validators/register.validator";
import { loginSchema } from "../validators/login.validator";
import { AuthController } from "../controllers/AuthController";
import { OtpController } from "../controllers/OtpController";
import { PasswordController } from "../controllers/PasswordController";

export function createAuthRoutes(
    authController: AuthController,
    otpController: OtpController,
    passwordController: PasswordController,
) {
    const router = Router();

    router.post("/register", validate(registerSchema), authController.register.bind(authController));
    router.post("/login", validate(loginSchema), authController.login.bind(authController));
    router.post("/refresh", authController.refresh.bind(authController));
    router.post("/logout", authController.logout.bind(authController));

    router.post("/forgot-password", passwordController.forgotPassword.bind(passwordController));
    router.post("/reset-password", passwordController.resetPassword.bind(passwordController));
    router.post("/change-password", authMiddleware, passwordController.changePassword.bind(passwordController));

    router.post("/verify-otp", otpController.verifyOtp.bind(otpController));
    router.post("/verify-signup-otp", otpController.verifySignupOtp.bind(otpController));
    router.post("/resend-signup-otp", otpController.resendSignupOtp.bind(otpController));
    router.post("/resend-forgot-password-otp", otpController.resendForgotPasswordOtp.bind(otpController));

    return router;
}