import authConfig from '@config/auth';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface ITokenPayload {
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}

export { ensureAuthenticated };
