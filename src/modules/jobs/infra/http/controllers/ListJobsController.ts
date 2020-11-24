import { ListJobByIdService } from '@modules/jobs/services/ListJobByIdService';
import { ListJobsService } from '@modules/jobs/services/ListJobsService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class ListJobsController {
  public async index(_: Request, response: Response): Promise<Response> {
    const jobsRepository = new JobsRepository();

    try {
      const listJobs = new ListJobsService(jobsRepository);
      const jobs = await listJobs.execute();

      return response.json(jobs);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { job_id } = request.params;
    const jobsRepository = new JobsRepository();

    try {
      const listJobById = new ListJobByIdService(jobsRepository);
      const job = await listJobById.execute({
        job_id,
      });

      return response.json(job);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
