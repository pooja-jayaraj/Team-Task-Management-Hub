import type { Request, Response, NextFunction } from 'express';
import { failure } from '../utils/response.ts';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor({
    message,
    statusCode,
    code,
    details
  }: {
    message: string;
    statusCode: number;
    code: string;
    details?: unknown;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    console.error('Unhandled Server Error:', err.message);
    res.status(err.statusCode).json(failure(err.code, err.message, err.details));
    return;
  }

  res.status(500).json(failure('INTERNAL_SERVER_ERROR', 'Unexpected server error'));
};

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json(failure('NOT_FOUND', 'Route not found'));
};