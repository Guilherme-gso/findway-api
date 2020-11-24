import { User } from '@modules/users/infra/typeorm/entities/User';
import { ITokenProvider } from '@modules/users/providers/HashProvider/models/ITokenProvider';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICreateDriverDTO } from '../dtos/ICreateDriverDTO';
import { Driver } from '../infra/typeorm/entities/Driver';
import { IDriversRepository } from '../repositories/IDriversRepository';

interface IResponse {
  user: User;
  driver: Driver;
  token: string;
}

export class CreateDriverService {
  constructor(
    private driversRepository: IDriversRepository,
    private usersRepository: IUsersRepository,
    private tokenProvider: ITokenProvider
  ) {}

  public async execute(data: ICreateDriverDTO): Promise<IResponse> {
    const driverAlreadyExists = await this.driversRepository.findDriverWithTheSameUserId(
      {
        user_id: data.user_id,
      }
    );

    if (driverAlreadyExists) {
      throw new Error('A driver is already associated with this user id');
    }

    let user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new Error('User not exists');
    }

    const driver = await this.driversRepository.create(data);
    user = await this.usersRepository.updateUser({
      ...user,
      isDriver: true,
    });

    const token = this.tokenProvider.generateToken(user.id);

    return {
      driver,
      user,
      token,
    };
  }
}
