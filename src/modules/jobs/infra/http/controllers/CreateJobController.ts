import { DriversRepository } from '@modules/drivers/infra/typeorm/repositories/DriversRepository';
import { CreateJobService } from '@modules/jobs/services/CreateJobService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class CreateJobController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const driversRepository = new DriversRepository();
    const jobsRepository = new JobsRepository();

    const {
      title,
      description,
      vacancies,
      latitude,
      longitude,
      driver_id,
      uri,
      categories,
    } = request.body;

    try {
      const createJob = new CreateJobService(jobsRepository, driversRepository);

      const job = await createJob.execute({
        title,
        description,
        vacancies,
        latitude,
        longitude,
        driver_id,
        uri,
        categories,
      });

      return response.json(job);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
