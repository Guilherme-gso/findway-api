import { User } from '../infra/typeorm/entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export class UpdateProfileService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new Error('Email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new Error('You need to provide the old password to set a new one');
    }

    if (password && old_password) {
      const checkPasswords = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!checkPasswords) {
        throw new Error('Old password does not mach');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.updateUser(user);
  }
}
