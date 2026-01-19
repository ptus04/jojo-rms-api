import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/lib/validation-result";

// TODO: Improve error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
};

export const handleBadRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }

  next();
};
