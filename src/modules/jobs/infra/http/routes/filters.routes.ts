import { Router } from 'express';
import { FilterJobsController } from '../controllers/FilterJobsController';

const filterRouter = Router();

const filterJobsController = new FilterJobsController();

filterRouter.get('/', filterJobsController.index);

export { filterRouter };
