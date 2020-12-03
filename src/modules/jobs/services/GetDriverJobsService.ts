import { Job } from '../infra/typeorm/entities/Job';
import { IJobsRepository } from '../repositories/IJobsRepository';

export class GetDriverJobsService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute(driver_id: string): Promise<Job[]> {
    const jobs = await this.jobsRepository.findDriverJobs(driver_id);

    return jobs;
  }
}
