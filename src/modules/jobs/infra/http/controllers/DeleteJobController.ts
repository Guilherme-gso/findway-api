import { DeleteJobService } from '@modules/jobs/services/DeleteJobService';
import { Request, Response } from 'express';
import { JobsRepository } from '../../typeorm/repositories/JobsRepository';

export class DeleteJobController {
  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { job_id } = request.params;
    const jobsRepository = new JobsRepository();
    const deleteJob = new DeleteJobService(jobsRepository);

    await deleteJob.execute(job_id);

    return response.send();
  }
}
