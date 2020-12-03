import { BcryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';
import { TokenProvider } from '@modules/users/providers/HashProvider/implementations/TokenProvider';
import { CreateUsersService } from '@modules/users/services/CreateUsersService';
import { UpdateAvatarService } from '@modules/users/services/UpdateAvatarService';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const usersRepository = new UsersRepository();
      const hashProvider = new BcryptHashProvider();
      const tokenProvider = new TokenProvider();

      const { name, email, password } = request.body;

      const createUser = new CreateUsersService(
        usersRepository,
        hashProvider,
        tokenProvider
      );

      const { token, user } = await createUser.execute({
        name,
        email,
        password,
      });

      return response.json({
        token,
        user: {
          ...user,
          password: null,
        },
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { avatar_url } = request.body;

    const usersRepository = new UsersRepository();

    const updateUserAvatar = new UpdateAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id,
      avatar_url,
    });

    return response.json({
      ...user,
      password: null,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    return response.json({
      ...user,
      password: null,
    });
  }
}
