import { ICoordinatesDTO } from '../dtos/ICoordinatesDTO';
import { Job } from '../infra/typeorm/entities/Job';
import { IJobsRepository } from '../repositories/IJobsRepository';

export class NextJobsService {
  constructor(private jobsRepository: IJobsRepository) {}

  public async execute(coords: ICoordinatesDTO): Promise<Job[]> {
    const jobs = await this.jobsRepository.findByDistance(coords);

    return jobs;
  }
}
