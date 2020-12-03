import { Router } from 'express';
import { CreateJobController } from '../controllers/CreateJobController';
import { ListJobsController } from '../controllers/ListJobsController';
import { ListJobsByCategoriesController } from '../controllers/ListJobsByCategoriesController';
import { GetDriverJobsController } from '../controllers/GetDriverJobsController';
import { UpdateJobController } from '../controllers/UpdateJobController';
import { DeleteJobController } from '../controllers/DeleteJobController';

const jobsRouter = Router();

const createJobController = new CreateJobController();
const listJobsController = new ListJobsController();
const listJobsByCategoryController = new ListJobsByCategoriesController();
const getDriverJobsController = new GetDriverJobsController();
const updateJobController = new UpdateJobController();
const deleteJobController = new DeleteJobController();

jobsRouter.post('/', createJobController.handle);
jobsRouter.get('/', listJobsController.index);
jobsRouter.get('/:job_id', listJobsController.show);
jobsRouter.get('/', listJobsByCategoryController.index);
jobsRouter.get('/:driver_id/driver', getDriverJobsController.index);
jobsRouter.put('/:job_id/update', updateJobController.update);
jobsRouter.delete('/:job_id/delete', deleteJobController.destroy);

export { jobsRouter };
