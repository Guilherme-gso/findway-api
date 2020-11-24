import { User } from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  avatar_url: string;
  user_id: string;
}

export class UpdateAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatar_url }: IRequest): Promise<User> {
    let user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('Not found user');
    }

    user = await this.usersRepository.updateUser({
      ...user,
      avatar_url,
    });

    return user;
  }
}
