import type { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/api-error/index.js";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
