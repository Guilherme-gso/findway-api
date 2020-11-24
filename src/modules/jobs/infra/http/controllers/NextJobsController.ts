import { ICoordinatesDTO } from '@modules/jobs/dtos/ICoordinatesDTO';
import { NextJobsService } from '@modules/jobs/services/NextJobsService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class NextJobsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { latitude, longitude } = request.query;
    const jobsRepository = new JobsRepository();

    const nextJobs = new NextJobsService(jobsRepository);

    const coords: ICoordinatesDTO = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    const jobs = await nextJobs.execute(coords);

    return response.json(jobs);
  }
}
