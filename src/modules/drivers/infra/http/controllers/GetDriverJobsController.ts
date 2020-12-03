import { GetDriverJobsControllerService } from '@modules/drivers/services/GetDriverJobsController';
import { Request, Response } from 'express';
import { DriversRepository } from '../../typeorm/repositories/DriversRepository';

export class GetDriverJobsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const getDriverJobs = new GetDriverJobsControllerService(
      new DriversRepository()
    );

    const jobs = await getDriverJobs.execute(user_id);

    return response.json(jobs?.jobs);
  }
}
