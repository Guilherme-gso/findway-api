import { FiltersJobsService } from '@modules/jobs/services/FilterJobsService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class FilterJobsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { categories, min_vacancies, max_vacancies } = request.body;

    const jobsRepository = new JobsRepository();

    const filterJobs = new FiltersJobsService(jobsRepository);

    try {
      const jobs = await filterJobs.execute({
        categories: categories as string[],
        min_vacancies: Number(min_vacancies),
        max_vacancies: Number(max_vacancies),
      });

      return response.json(jobs);
    } catch (err) {
      return response.status(400).json({ err });
    }
  }
}
