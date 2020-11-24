import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  constructor(private ormRepository = getRepository(User)) {}

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async updateUser(user: User): Promise<User> {
    const updateUser = await this.ormRepository.save(user);

    return updateUser;
  }
}
