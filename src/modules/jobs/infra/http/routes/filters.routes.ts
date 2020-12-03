import { Router } from 'express';
import { FilterJobsController } from '../controllers/FilterJobsController';
import { SearchJobsByTitleController } from '../controllers/SearchJobsByTitleController';

const filterRouter = Router();

const filterJobsController = new FilterJobsController();
const searchJobsByTitleController = new SearchJobsByTitleController();

filterRouter.post('/', filterJobsController.index);
filterRouter.get('/suggestions', searchJobsByTitleController.index);

export { filterRouter };
