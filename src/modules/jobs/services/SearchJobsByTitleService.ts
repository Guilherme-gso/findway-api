import { Job } from '../infra/typeorm/entities/Job';
import { IJobsRepository } from '../repositories/IJobsRepository';

export class SearchJobsByTitleService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute(filter: string): Promise<Job[]> {
    const jobs = await this.jobsRepository.findByTitle(filter);

    return jobs;
  }
}
