import { IDriversRepository } from '@modules/drivers/repositories/IDriversRepository';
import { User } from '../infra/typeorm/entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../providers/HashProvider/models/ITokenProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IAuthenticateUserService {
  token: string;
  user: User;
  driver_id?: string;
}

export class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider,
    private driversRepository: IDriversRepository
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
    const driver = await this.driversRepository.findDriverId(user.id);

    if (user.isDriver) {
      return {
        token,
        user,
        driver_id: driver?.id,
      };
    }

    return {
      token,
      user,
    };
  }
}
