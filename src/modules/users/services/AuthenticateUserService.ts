import { User } from '../infra/typeorm/entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../providers/HashProvider/models/ITokenProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IAuthenticateUserService {
  token: string;
  user: User;
}

export class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider
  ) {}

  public async execute(
    email: string,
    password: string
  ): Promise<IAuthenticateUserService> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found or password is invalid.');
    }

    const passwordIsMatch = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordIsMatch) {
      throw new Error('User not found or password is invalid.');
    }

    const token = this.tokenProvider.generateToken(user.id);

    return {
      token,
      user,
    };
  }
}
