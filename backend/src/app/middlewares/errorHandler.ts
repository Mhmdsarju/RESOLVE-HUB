import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/errors/AppError";

export function errorHandler(  error: Error,  req: Request,  res: Response,  next: NextFunction): void {
  // If response already sent, pass the error to Express
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}