import { Driver } from '../infra/typeorm/entities/Driver';
import { IDriversRepository } from '../repositories/IDriversRepository';

interface IRequest {
  driver_id: string;
}

export class ListDriverByIdService {
  constructor(private driversRepository: IDriversRepository) {}

  public async execute({ driver_id }: IRequest): Promise<Driver> {
    const driver = await this.driversRepository.findById(driver_id);

    if (!driver) {
      throw new Error('No Driver found with this id');
    }

    return driver;
  }
}
