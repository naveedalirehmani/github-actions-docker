import { NextFunction, Request, Response } from 'express';
import { ResponseStatus } from '../helpers/responseEnums';

export function requireUser(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (!req.user) {
    return res.status(ResponseStatus.UnauthorizedCredentials).send('Invalid session');
  }

  return next();
}
 