import { Job } from '../infra/typeorm/entities/Job';
import { IFilterJob, IJobsRepository } from '../repositories/IJobsRepository';

export class FiltersJobsService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute({
    categories,
    min_vacancies,
    max_vacancies,
  }: IFilterJob): Promise<Job[]> {
    const jobs = await this.jobsRepository.filterJobs({
      categories,
      max_vacancies,
      min_vacancies,
    });

    return jobs;
  }
}
