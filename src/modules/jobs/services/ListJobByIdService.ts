import { Job } from '../infra/typeorm/entities/Job';
import { IJobsRepository } from '../repositories/IJobsRepository';

interface IRequest {
  job_id: string;
}

export class ListJobByIdService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute({ job_id }: IRequest): Promise<Job> {
    const job = await this.jobsRepository.findById(job_id);

    if (!job) {
      throw new Error('No Job found with this id');
    }

    return job;
  }
}
