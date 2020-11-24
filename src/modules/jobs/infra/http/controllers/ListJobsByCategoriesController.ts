import { ListJobsByCategoriesService } from '@modules/jobs/services/ListJobsByCategoriesService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class ListJobsByCategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { categories } = request.query;

    const jobsRepository = new JobsRepository();

    const listJobsByCategories = new ListJobsByCategoriesService(
      jobsRepository
    );

    try {
      const jobs = await listJobsByCategories.execute({
        categories: categories as [string],
      });

      return response.json(jobs);
    } catch (err) {
      return response.status(400).json({ err });
    }
  }
}
