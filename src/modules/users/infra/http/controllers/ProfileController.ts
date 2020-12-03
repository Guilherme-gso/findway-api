import { BcryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';
import { UpdateProfileService } from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

export class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { name, email, password, old_password } = request.body;

    const usersRepository = new UsersRepository();
    const hashProvider = new BcryptHashProvider();

    const updateProfile = new UpdateProfileService(
      usersRepository,
      hashProvider
    );

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json({
      ...user,
      password: null,
    });
  }
}
