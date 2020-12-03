import { GetDriverJobsService } from '@modules/jobs/services/GetDriverJobsService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class GetDriverJobsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { driver_id } = request.params;

    const jobsRepository = new JobsRepository();
    const getDriverJobs = new GetDriverJobsService(jobsRepository);

    const jobs = await getDriverJobs.execute(driver_id);

    return response.json(jobs);
  }
}
