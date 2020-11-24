import { Job } from '../infra/typeorm/entities/Job';
import { IJobsRepository } from '../repositories/IJobsRepository';

export class ListJobsService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute(): Promise<Job[]> {
    const jobs = await this.jobsRepository.findAllJobs();

    return jobs;
  }
}
