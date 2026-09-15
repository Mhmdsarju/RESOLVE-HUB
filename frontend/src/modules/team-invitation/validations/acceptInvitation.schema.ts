import { z } from "zod";

export const acceptInvitationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter",
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter",
      )
      .regex(
        /[0-9]/,
        "Password must contain at least one number",
      )
      .regex(
        /[^A-Za-z0-9\s]/,
        "Password must contain at least one special character",
      )
      .regex(
        /^\S+$/,
        "Password must not contain spaces",
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type AcceptInvitationFormValues = z.infer<
  typeof acceptInvitationSchema
>;