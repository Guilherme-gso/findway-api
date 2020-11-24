import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../providers/HashProvider/models/ITokenProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IResponse {
  token: string;
  user: User;
}

export class CreateUsersService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider
  ) {}

  public async execute(data: ICreateUserDTO): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = this.tokenProvider.generateToken(user.id);

    return {
      token,
      user,
    };
  }
}
