import { Response } from "express";

type SuccessPayload<T> = {
  statusCode?: number;
  message: string;
  data?: T | null;
};

type ErrorPayload = {
  statusCode?: number;
  message: string;
  errors?: string[] | Record<string, unknown> | string | null;
};

export const sendSuccess = <T>(
  res: Response,
  { statusCode = 200, message, data = null }: SuccessPayload<T>
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  { statusCode = 400, message, errors = null }: ErrorPayload
) => {
  let normalizedErrors: string[] | Record<string, unknown> | null = null;

  if (Array.isArray(errors)) {
    normalizedErrors = errors;
  } else if (errors && typeof errors === "object") {
    normalizedErrors = errors;
  } else if (typeof errors === "string") {
    normalizedErrors = [errors];
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: normalizedErrors,
  });
};
