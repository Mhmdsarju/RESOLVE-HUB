import { z } from "zod";

export const registerSchema = z
    .object({
        organizationName: z
            .string()
            .trim()
            .min(3, "Organization name must be at least 3 characters.")
            .max(100, "Organization name cannot exceed 100 characters."),

        companyDomain: z
            .string()
            .trim()
            .min(2, "Company domain is required.")
            .regex(
                /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                "Enter a valid company domain.",
            ),

        companySize: z
            .string()
            .min(1, "Please select your company size."),

        industry: z
            .string()
            .min(1, "Please select your industry."),

        name: z
            .string()
            .trim()
            .min(3, "Admin name must be at least 3 characters.")
            .max(50, "Admin name cannot exceed 50 characters."),

        email: z
            .string()
            .trim()
            .email("Enter a valid work email."),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
            .regex(/[0-9]/, "Password must contain at least one number.")
            .regex(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character.",
            ),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password."),

        acceptTerms: z.boolean().refine((value) => value === true, {
            message: "You must accept the Terms & Privacy Policy.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;