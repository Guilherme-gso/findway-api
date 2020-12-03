import { SearchJobsByTitleService } from '@modules/jobs/services/SearchJobsByTitleService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class SearchJobsByTitleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query;

    const jobsRepository = new JobsRepository();
    const searchJobsByTitle = new SearchJobsByTitleService(jobsRepository);

    const jobs = await searchJobsByTitle.execute(String(filter));

    return response.json(jobs);
  }
}
