import { ICreateDriverDTO } from '@modules/drivers/dtos/ICreateDriverDTO';
import {
  IDriversRepository,
  IDriverRequest,
  IDriverExceptRequest,
} from '@modules/drivers/repositories/IDriversRepository';
import { getRepository, Not } from 'typeorm';
import { Driver } from '../entities/Driver';

export class DriversRepository implements IDriversRepository {
  constructor(private driversRepository = getRepository(Driver)) {}

  public async create(data: ICreateDriverDTO): Promise<Driver> {
    const driver = this.driversRepository.create(data);

    await this.driversRepository.save(driver);

    return driver;
  }

  public async findDriverWithTheSameUserId({
    user_id,
  }: IDriverRequest): Promise<Driver | undefined> {
    const driver = await this.driversRepository.findOne({
      where: {
        user_id,
      },
    });

    return driver;
  }

  public async listDrivers({
    except_user_id,
  }: IDriverExceptRequest): Promise<Driver[]> {
    const driver = await this.driversRepository.find({
      where: {
        user_id: Not(except_user_id),
      },
    });

    return driver;
  }

  public async findById(id: string): Promise<Driver | undefined> {
    const driver = await this.driversRepository.findOne({
      where: {
        id,
      },
    });

    return driver;
  }
}
