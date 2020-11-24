import { Router } from 'express';
import { NextJobsController } from '../controllers/NextJobsController';

const nextRouter = Router();

const nextJobsController = new NextJobsController();

nextRouter.get('/', nextJobsController.index);

export { nextRouter };
