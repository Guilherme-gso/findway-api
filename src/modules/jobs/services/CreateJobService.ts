import { IDriversRepository } from '@modules/drivers/repositories/IDriversRepository';
import { ICreateJobDTO } from '../dtos/ICreateJobDTO';
import { Job } from '../infra/typeorm/entities/Job';
import { IJobsRepository } from '../repositories/IJobsRepository';

export class CreateJobService {
  constructor(
    private jobsRepository: IJobsRepository,
    private driversRepository: IDriversRepository
  ) {}

  public async execute(data: ICreateJobDTO): Promise<Job> {
    const driverExists = await this.driversRepository.findById(data.driver_id);

    if (!driverExists) {
      throw new Error('No Drivers Found by this id');
    }

    const jobAlreadyExists = await this.jobsRepository.findByTitle(data.title);

    if (jobAlreadyExists) {
      throw new Error('This job is already created.');
    }

    const job = await this.jobsRepository.create(data);

    return job;
  }
}
