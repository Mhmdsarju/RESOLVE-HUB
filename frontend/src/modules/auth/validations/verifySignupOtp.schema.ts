import { z } from "zod";

export const verifySignupOtpSchema = z.object({
  email: z.string().email(),

  otp: z
    .string()
    .length(6, "OTP must contain exactly 6 digits.")
    .regex(/^\d+$/, "OTP must contain only numbers."),
});

export type VerifySignupOtpFormData = z.infer<
  typeof verifySignupOtpSchema
>;