import { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error: HttpError = err instanceof createError.HttpError
    ? err
    : createError(500, err.message || 'Internal Server Error');

  const statusCode = error.status || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
  next();
}
