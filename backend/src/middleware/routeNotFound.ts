import { Request, Response, NextFunction } from 'express';

/**
 * Route not found middleware
 * Handles requests to routes that don't exist
 */
export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    status: 'fail',
    message: `Cannot find ${req.method} ${req.originalUrl} on this server`,
  });
}; 