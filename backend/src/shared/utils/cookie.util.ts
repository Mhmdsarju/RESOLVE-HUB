import { Response } from "express";
import { config } from "@/config/env";

export const setRefereshTokenCookie = (res: Response, refreshToken: string): void => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: config.refreshCookieMaxAge,
    });
}

export const clearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie("refreshToken");
};