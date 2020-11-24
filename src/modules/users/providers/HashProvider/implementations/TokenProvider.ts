import authConfig from '@config/auth';
import jwt from 'jsonwebtoken';
import { ITokenProvider } from '../models/ITokenProvider';

export class TokenProvider implements ITokenProvider {
  public generateToken(subject: string): string {
    const token = jwt.sign({}, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
      subject,
    });

    return token;
  }
}
