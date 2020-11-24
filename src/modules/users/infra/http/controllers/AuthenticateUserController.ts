import { BcryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';
import { TokenProvider } from '@modules/users/providers/HashProvider/implementations/TokenProvider';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const hashProvider = new BcryptHashProvider();
    const tokenProvider = new TokenProvider();

    const { email, password } = request.body;

    try {
      const authenticateUser = new AuthenticateUserService(
        usersRepository,
        hashProvider,
        tokenProvider
      );

      const { token, user } = await authenticateUser.execute(email, password);

      delete user.password;

      return response.json({
        token,
        user,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
