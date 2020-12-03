import { IJobsRepository } from '../repositories/IJobsRepository';

export class DeleteJobService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute(job_id: string): Promise<void> {
    const job = await this.jobsRepository.findById(job_id);

    if (!job) throw new Error('Job not found');

    await this.jobsRepository.delete(job);
  }
}
