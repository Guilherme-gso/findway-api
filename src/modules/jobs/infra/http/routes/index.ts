import { Router } from 'express';
import { CreateJobController } from '../controllers/CreateJobController';
import { ListJobsController } from '../controllers/ListJobsController';
import { ListJobsByCategoriesController } from '../controllers/ListJobsByCategoriesController';

const jobsRouter = Router();

const createJobController = new CreateJobController();
const listJobsController = new ListJobsController();
const listJobsByCategoryController = new ListJobsByCategoriesController();

jobsRouter.post('/', createJobController.handle);
jobsRouter.get('/', listJobsController.index);
jobsRouter.get('/:job_id', listJobsController.show);
jobsRouter.get('/', listJobsByCategoryController.index);

export { jobsRouter };
