import { z } from "zod";

export const registerSchema = z
    .object({
        organizationName: z
            .string()
            .trim()
            .min(3, "Organization name must be at least 3 characters.")
            .max(100, "Organization name cannot exceed 100 characters.")
            .regex(
                /^(?!.*\s{2,})(?!.*[-&']{2})[A-Za-z0-9]+(?:[ '&-][A-Za-z0-9]+)*$/,
                "Organization name can contain only letters, numbers, single spaces, '&', and '-'. It cannot start or end with spaces or special characters."
            ),

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
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .regex(
                /^(?!.*[_-]{2})[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/,
                "Username can contain only letters, numbers, single '-' or '_'. Spaces and special characters are not allowed."
            ),

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