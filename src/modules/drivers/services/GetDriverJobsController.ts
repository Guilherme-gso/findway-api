import { Driver } from '../infra/typeorm/entities/Driver';
import { IDriversRepository } from '../repositories/IDriversRepository';

export class GetDriverJobsControllerService {
  constructor(private driversRepository: IDriversRepository) {}

  public async execute(user_id: string): Promise<Driver | undefined> {
    const driver = await this.driversRepository.findDriverJobs(user_id);

    return driver;
  }
}
