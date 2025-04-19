import { Request, Response, NextFunction, RequestHandler } from 'express';

export const wrapMiddleware = (middleware: any): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(middleware(req, res, next)).catch(next);
  };
}; 