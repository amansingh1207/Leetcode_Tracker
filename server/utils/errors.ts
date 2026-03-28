/**
 * Custom Error Classes and Error Handling
 * Provides typed error handling across the application
 */

export enum ErrorCode {
  LEETCODE_API_ERROR = 'LEETCODE_API_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
    return new AppError(ErrorCode.DATABASE_ERROR, error.message);
  }

  console.error('Unknown error:', error);
  return new AppError(ErrorCode.DATABASE_ERROR, 'An unexpected error occurred', 500);
}
