import { UpdateJobService } from '@modules/jobs/services/UpdateJobService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class UpdateJobController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      vacancies,
      latitude,
      longitude,
      uri,
      categories,
    } = request.body;

    const { job_id } = request.params;
    const jobsRepository = new JobsRepository();
    const updateJob = new UpdateJobService(jobsRepository);

    const jobs = await updateJob.execute({
      id: job_id,
      title,
      description,
      vacancies,
      latitude,
      longitude,
      uri,
      categories,
    });

    return response.json(jobs);
  }
}
