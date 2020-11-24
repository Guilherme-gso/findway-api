import { Driver } from '../infra/typeorm/entities/Driver';
import { IDriversRepository } from '../repositories/IDriversRepository';

export class ListAllDriversService {
  constructor(private driversRepository: IDriversRepository) {}

  public async execute(except_user_id: string): Promise<Driver[]> {
    const drivers = await this.driversRepository.listDrivers({
      except_user_id,
    });

    if (!drivers.length) {
      throw new Error('No Drivers Found');
    }

    return drivers;
  }
}
