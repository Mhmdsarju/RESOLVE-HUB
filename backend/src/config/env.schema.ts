import { z } from "zod";

export const envSchema = z.object({
    ACCESS_TOKEN_EXPIRES_IN: z.string().min(1),
    REFRESH_TOKEN_EXPIRES_IN: z.string().min(1),
    RESET_TOKEN_EXPIRES_IN: z.string().min(1),

    REFRESH_COOKIE_MAX_AGE: z.coerce.number(),
    OTP_EXPIRES_IN: z.coerce.number(),
    SIGNUP_EXPIRES_IN: z.coerce.number(),
    REFRESH_TOKEN_TTL: z.coerce.number(),
    RESET_TOKEN_TTL: z.coerce.number(),
    JWT_ACCESS_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
    JWT_RESET_SECRET: z.string().min(1),
});