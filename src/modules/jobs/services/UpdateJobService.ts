import { IUpdateJobDTO } from '../dtos/IUpdateJobDTO';
import { Job } from '../infra/typeorm/entities/Job';
import { IJobsRepository } from '../repositories/IJobsRepository';

export class UpdateJobService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute(data: IUpdateJobDTO): Promise<Job> {
    const job = await this.jobsRepository.findById(data.id);

    if (!job) throw new Error('Job not found');

    job.title = data.title;
    job.description = data.description;
    job.latitude = data.latitude;
    job.longitude = data.longitude;
    job.uri = data.uri;
    job.categories = data.categories;
    job.vacancies = data.vacancies;

    const updatedJob = await this.jobsRepository.save(job);

    return updatedJob;
  }
}
