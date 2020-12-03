import { Router } from 'express';
import { GetDriverJobsController } from '../controllers/GetDriverJobsController';
import { CreateDriverController } from '../controllers/CreateDriverController';
import { ListDriversController } from '../controllers/ListDriversController';

const driversRouter = Router();

const createDriverController = new CreateDriverController();
const listDriversController = new ListDriversController();
const getDriverJobsController = new GetDriverJobsController();

driversRouter.post('/', createDriverController.handle);
driversRouter.get('/', listDriversController.index);
driversRouter.get('/:driver_id', listDriversController.show);
driversRouter.get('/:user_id/user/jobs', getDriverJobsController.handle);

export { driversRouter };
