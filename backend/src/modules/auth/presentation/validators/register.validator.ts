import { z } from "zod";

export const registerSchema = z.object({
  organizationName: z
    .string()
    .min(2, "Organization name is required"),

  name: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  industry: z.string().optional(),

  companySize: z.string().optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;