import { Router } from 'express';
import { CreateDriverController } from '../controllers/CreateDriverController';
import { ListDriversController } from '../controllers/ListDriversController';

const driversRouter = Router();

const createDriverController = new CreateDriverController();
const listDriversController = new ListDriversController();

driversRouter.post('/', createDriverController.handle);
driversRouter.get('/', listDriversController.index);
driversRouter.get('/:driver_id', listDriversController.show);

export { driversRouter };
