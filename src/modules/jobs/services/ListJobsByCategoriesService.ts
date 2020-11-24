import { Job } from '../infra/typeorm/entities/Job';
import { IJobsRepository } from '../repositories/IJobsRepository';

interface IRequest {
  categories: string[];
}

export class ListJobsByCategoriesService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute({ categories }: IRequest): Promise<Job[]> {
    const jobs = await this.jobsRepository.findByCategories(categories);

    return jobs;
  }
}
